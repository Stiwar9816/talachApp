export interface Marker {
    position: {
        lat: number
        lng: number
    }
}

export interface LatLgn {
    lat: number
    lng: number
}

export interface Polygons {
    paths: {
        lat: number
        lng: number
    }[]
    strokeColor: string
    strokeOpacity: number
    strokeWeight: number
    fillColor: string
    fillOpacity: number
}