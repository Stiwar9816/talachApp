import apolloClient from '@/plugins/apollo'
// Gql
import { ALL_GEOFENCE, ALL_GEOFENCE_WORKER, ALL_LOCATION, ALL_LOCATION_WORKER } from '@/gql/maps'
// Interface
import type { LatLgn, Marker, PolygonProperties, Polygons } from '@/interface'

const propertiesPolygon = {
  strokeOpacity: 0.9,
  strokeWeight: 0.9,
  fillOpacity: 0.3
} as PolygonProperties

const colorHexRandom = (): string => {
  const lettersHex = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += lettersHex[Math.floor(Math.random() * 16)]
  }
  return color
}

const roles = ['Trabajador']

const createMarker = (position: LatLgn, label: string, title: string): Marker => ({
  position,
  label,
  title
})

export const createPolygon = (paths: LatLgn[], properties: PolygonProperties): Polygons => ({
  paths,
  strokeColor: colorHexRandom(),
  fillColor: colorHexRandom(),
  ...properties
})

export const fetchLocations = async () => {
  try {
    const { data: companiesData } = await apolloClient.query({
      query: ALL_LOCATION
    })

    const { data: workersData } = await apolloClient.query({
      query: ALL_LOCATION_WORKER,
      variables: {
        roles
      }
    })

    const companyMarkers = companiesData.companies.map(({ lat, lng, name_company }: any) =>
      createMarker({ lat: +lat, lng: +lng }, 'CT', name_company)
    )

    const workerMarkers = workersData.users.map(({ lat, lng, fullName }: any) =>
      createMarker({ lat: +lat, lng: +lng }, 'T', fullName)
    )

    return [...companyMarkers, ...workerMarkers]
  } catch (error: any) {
    console.error('Error fetching locations:', error.message)
    return []
  }
}

export const fetchGeofences = async () => {
  try {
    const { data: companiesGeofenceData } = await apolloClient.query({
      query: ALL_GEOFENCE
    })

    const { data: workersGeofenceData } = await apolloClient.query({
      query: ALL_GEOFENCE_WORKER,
      variables: {
        roles
      }
    })

    const createGeofencesFromData = (geofenceData: any) =>
      geofenceData.map((item: any) => {
        const paths: LatLgn[] = []
        item.split(',').forEach((coordinate: string, index: number) => {
          const value = +coordinate.trim()
          const isLatitude = index % 2 === 0
          if (isLatitude) {
            paths.push({ lat: value, lng: 0 })
          } else {
            const [lastPath] = paths.slice(-1)
            lastPath.lng = value
          }
        })
        return createPolygon(paths, propertiesPolygon)
      })

    const companyGeofences = createGeofencesFromData(companiesGeofenceData.companies)

    let workerGeofences = []

    if (workersGeofenceData && workersGeofenceData.users) {
      workerGeofences = createGeofencesFromData(workersGeofenceData.users)
    }

    return [...companyGeofences, ...workerGeofences]
  } catch (error: any) {
    console.error('Error fetching geofences:', error.message)
    return []
  }
}
