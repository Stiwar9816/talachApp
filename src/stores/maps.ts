import { ref } from 'vue'
import { defineStore } from 'pinia'
// Inferface
import type { Marker, LatLgn, Polygons, PolygonProperties } from '@/interface'

export const useMapsStore = defineStore('maps', () => {
    const center = ref<LatLgn>({ lat: 28.7749, lng: -90.4194 })
    const key = ref<string>(import.meta.env.VITE_MAPS_API_KEY);
    const zoom = ref<number>(4)
    // Exact point of each talachero center
    const markers: Marker[] = [
        { position: { lat: 24.712776, lng: -70.005974 }, label: "CT", title: "Centro Talachero" },
        { position: { lat: 35.712776, lng: -80.005974 }, label: "CT", title: "Centro Talachero" },
        { position: { lat: 36.712776, lng: -84.005974 }, label: "CT", title: "Centro Talachero" },
        { position: { lat: 31.712776, lng: -92.005974 }, label: "CT", title: "Centro Talachero" }
        // Add more bookmarks here...
    ]

    // Random Color Hexadecimal
    const colorHexRandom = (): string => {
        const lettersHex = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += lettersHex[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    // Common properties of polygons
    const propertiesPolygon: PolygonProperties = {
        strokeOpacity: 0.9,
        strokeWeight: 0.9,
        fillOpacity: 0.30
    }

    // Create new polygon by passing parameters
    const createPolygon = (paths: LatLgn[], properties: PolygonProperties): Polygons => ({
        paths,
        strokeColor: colorHexRandom(),
        fillColor: colorHexRandom(),
        ...properties
    });

    // Using the createPolygon function
    const myPolygons: Polygons[] = [
        createPolygon(
            [
                { lat: 25.774, lng: -80.19 },
                { lat: 18.466, lng: -66.118 },
                { lat: 32.321, lng: -64.757 }
            ],
            propertiesPolygon
        ),
        createPolygon(
            [
                { lat: 35.774, lng: -90.19 },
                { lat: 28.466, lng: -76.118 },
                { lat: 42.321, lng: -74.757 }
            ],
            propertiesPolygon
        ),
        createPolygon(
            [
                { lat: 38.774, lng: -95.190 },
                { lat: 20.466, lng: -96.118 },
                { lat: 26.321, lng: -84.757 }
            ],
            propertiesPolygon
        )
    ];

    return { center, zoom, key, markers, myPolygons, colorHexRandom }
})