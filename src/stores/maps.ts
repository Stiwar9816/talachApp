import { ref } from 'vue'
import { defineStore } from 'pinia'
// Inferface
import type { Marker, LatLgn, Polygons } from '@/interface'

export const useMapsStore = defineStore('maps', () => {
    const center = ref<LatLgn>({ lat: 28.7749, lng: -90.4194 })
    const key = ref<string>('AIzaSyD3nUt9Zkv2BZ2iXsKUcVFVBdc5MnaUXRk')
    const zoom = ref<number>(4)
    const markers: Marker[] = [
        { position: { lat: 24.712776, lng: -70.005974 } },
        { position: { lat: 35.712776, lng: -80.005974 } },
        { position: { lat: 36.712776, lng: -84.005974 } }
        // Agrega más marcadores aquí...
    ]

    const myPolygons: Array<Polygons> = [
        {
            paths: [
                { lat: 25.774, lng: -80.19 },
                { lat: 18.466, lng: -66.118 },
                { lat: 32.321, lng: -64.757 }
            ],
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        },
        {
            paths: [
                { lat: 35.774, lng: -90.19 },
                { lat: 28.466, lng: -76.118 },
                { lat: 42.321, lng: -74.757 }
            ],
            strokeColor: '#00FF00',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#00FF00',
            fillOpacity: 0.35
        }
    ]

    return { center, zoom, key, markers, myPolygons }
})