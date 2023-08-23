import { ref } from 'vue'
import { defineStore } from 'pinia'
// Utils
import { createPolygon, fetchGeofences, fetchLocations } from '@/utils'
// Inferface
import type { LatLgn, Marker, Polygons } from '@/interface'

export const useMapsStore = defineStore({
  id: 'maps',
  state: () => ({
    center: ref<LatLgn>({ lat: 6.24742, lng: -75.56659 }),
    key: ref<string>(import.meta.env.VITE_MAPS_API_KEY),
    zoom: ref<number>(12),
    markers: [] as Marker[],
    myPolygons: [] as Polygons[],
    createPolygon
  }),
  actions: {
    async allLocations() {
      this.markers = await fetchLocations()
      return this.markers
    },
    async allGeofences() {
      this.myPolygons = await fetchGeofences()
      return this.myPolygons
    }
  }
})
