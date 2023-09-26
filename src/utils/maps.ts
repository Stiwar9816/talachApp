import { supabase } from './supabase'
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
  let { data: companiesData, error: errorCompanies } = await supabase.rpc('all_location_companies')

  let { data: workersData, error: errorWorkers } = await supabase.rpc('all_location_workers')

  if (errorCompanies) throw new Error(`${errorCompanies.message}`)

  if (errorWorkers) throw new Error(`${errorWorkers.message}`)

  const companyMarkers = companiesData.map(({ lat, lng, name_company }: any) =>
    createMarker({ lat: +lat, lng: +lng }, 'CT', name_company)
  )

  const workerMarkers = workersData.map(({ lat, lng, fullName }: any) =>
    createMarker({ lat: +lat, lng: +lng }, 'T', fullName)
  )

  return [...companyMarkers, ...workerMarkers]
}

export const fetchGeofences = async () => {
  let { data: companiesGeofenceData, error: errorCompanies } = await supabase.rpc(
    'all_geofence_companies'
  )

  let { data: workersGeofenceData, error: errorWorkers } = await supabase.rpc(
    'all_geofence_workers'
  )

  if (errorCompanies) throw new Error(`${errorCompanies.message}`)

  if (errorWorkers) throw new Error(`${errorWorkers.message}`)

  const createGeofencesFromData = (geofenceData: any) =>
    geofenceData.map(({ geofence }: any) => {
      const coordinates = geofence.map((coordinate: string) => +coordinate.trim())
      const paths: LatLgn[] = []

      for (let i = 0; i < coordinates.length; i += 2) {
        const lat = coordinates[i]
        const lng = coordinates[i + 1]
        paths.push({ lat, lng })
      }

      return createPolygon(paths, propertiesPolygon)
    })

  const companyGeofences = createGeofencesFromData(companiesGeofenceData)

  const workerGeofences = createGeofencesFromData(workersGeofenceData)

  return [...companyGeofences, ...workerGeofences]
}
