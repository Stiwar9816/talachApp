import { ref } from 'vue'
import { defineStore } from 'pinia'
import apolloClient from '@/plugins/apollo';
// Inferface
import type { Marker, LatLgn, Polygons, PolygonProperties } from '@/interface'
import { ALL_GEOFENCE, ALL_LOCATION } from '@/gql/maps';

const colorHexRandom = (): string => {
    const lettersHex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += lettersHex[Math.floor(Math.random() * 16)];
    }
    return color;
};

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
            fillOpacity: 0.30
        } as PolygonProperties,
        createPolygon: (paths: LatLgn[], properties: PolygonProperties): Polygons => ({
            paths,
            strokeColor: colorHexRandom(),
            fillColor: colorHexRandom(),
            ...properties
        }),
    }),
    actions: {
        async allLocations() {
            try {
                const { data } = await apolloClient.query({
                    query: ALL_LOCATION,
                });
                const [...markers] = data.companies.map(({ lat, lng }: any) => ({
                    position: { lat: +lat, lng: +lng },
                    label: 'CT',
                    title: 'Centro Talachero',
                }));
                this.markers = [...markers];
                return markers;
            } catch (error) {
                console.error('Error fetching locations:', error);
                return [];
            }
        },
        async allGeofences() {
            try {
                const { data } = await apolloClient.query({
                    query: ALL_GEOFENCE
                });
                const [...geofences] = data.companies.map((company: any) => {
                    const paths: LatLgn[] = [];
                    company.geofence[0].split(', ').forEach((coordinate: string, index: number) => {
                        const value = +coordinate.trim();
                        const isLatitude = index % 2 === 0;
                        if (isLatitude) {
                            paths.push({ lat: value, lng: 0 });
                        } else {
                            const [lastPath] = paths.slice(-1);
                            lastPath.lng = value;
                        }
                    });
                    return this.createPolygon(paths, this.propertiesPolygon);
                });
                this.myPolygons = [...geofences];
                return geofences;
            } catch (error) {
                console.error('Error fetching geofences:', error);
                return [];
            }
        }
    },
})