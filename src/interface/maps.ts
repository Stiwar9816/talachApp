export interface LatLgn {
    lat: number
    lng: number
}
export interface Marker {
    position: LatLgn
    label: string
    title: string
}
export interface PolygonProperties {
    strokeOpacity: number;
    strokeWeight: number;
    fillOpacity: number;
}

export interface Polygons extends PolygonProperties {
    paths: LatLgn[];
    strokeColor: string
    fillColor: string
};

