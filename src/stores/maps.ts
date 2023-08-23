import { ref } from 'vue'
import { defineStore } from 'pinia'
import apolloClient from '@/plugins/apollo'
// Inferface
import type { Marker, LatLgn, Polygons, PolygonProperties } from '@/interface'
import { ALL_GEOFENCE, ALL_GEOFENCE_WORKER, ALL_LOCATION, ALL_LOCATION_WORKER } from '@/gql/maps'

const colorHexRandom = (): string => {
  const lettersHex = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += lettersHex[Math.floor(Math.random() * 16)]
  }
  return color
}

<<<<<<< HEAD
const roles = ['Trabajador']
=======
const roles = ['Trabajador', 'Talachero']
>>>>>>> 756306690694bd08fce81c40374ea5042d8e09fe

export const useMapsStore = defineStore({
  id: 'maps',
  state: () => ({
    center: ref<LatLgn>({ lat: 6.24742, lng: -75.56659 }),
    key: ref<string>(import.meta.env.VITE_MAPS_API_KEY),
    zoom: ref<number>(12),
    markers: [] as Marker[],
    myPolygons: [] as Polygons[],
    propertiesPolygon: {
      strokeOpacity: 0.9,
      strokeWeight: 0.9,
      fillOpacity: 0.3
    } as PolygonProperties,
    createPolygon: (paths: LatLgn[], properties: PolygonProperties): Polygons => ({
      paths,
      strokeColor: colorHexRandom(),
      fillColor: colorHexRandom(),
      ...properties
    })
  }),
  actions: {
    async allLocations() {
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

        const companyMarkers = companiesData.companies.map(({ lat, lng, name_company }: any) => ({
          position: { lat: +lat, lng: +lng },
          label: 'CT',
          title: name_company
        }))

        const workerMarkers = workersData.users.map(({ lat, lng, fullName }: any) => ({
          position: { lat: +lat, lng: +lng },
          label: 'T',
          title: fullName
        }))

        this.markers = [...companyMarkers, ...workerMarkers]
        return this.markers
      } catch (error: any) {
        console.error('Error fetching locations:', error.message)
        return []
      }
    },
    async allGeofences() {
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
        const companyGeofences = companiesGeofenceData.companies.map((company: any) => {
          const paths: LatLgn[] = []
          company.geofence[0].split(',').forEach((coordinate: string, index: number) => {
            const value = +coordinate.trim()
            const isLatitude = index % 2 === 0
            if (isLatitude) {
              paths.push({ lat: value, lng: 0 })
            } else {
              const [lastPath] = paths.slice(-1)
              lastPath.lng = value
            }
          })
          return this.createPolygon(paths, this.propertiesPolygon)
        })

        let workerGeofences = []

        if (workersGeofenceData && workersGeofenceData.users) {
          // Check if workersGeofenceData and workers array exist
          workerGeofences = workersGeofenceData.users.map((worker: any) => {
            const paths: LatLgn[] = []
            worker.geofence?.[0].split(',').forEach((coordinate: string, index: number) => {
              const value = +coordinate.trim()
              const isLatitude = index % 2 === 0
              if (isLatitude) {
                paths.push({ lat: value, lng: 0 })
              } else {
                const [lastPath] = paths.slice(-1)
                lastPath.lng = value
              }
            })
            return this.createPolygon(paths, this.propertiesPolygon)
          })
        }

        const allGeofences = [...companyGeofences, ...workerGeofences]
        this.myPolygons = allGeofences
        return allGeofences
      } catch (error: any) {
        console.error('Error fetching geofences:', error.message)
        return []
      }
    }
  }
})
