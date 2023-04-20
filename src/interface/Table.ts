export interface Field {
    title: string,
    sortable?: boolean,
    align?: string
    key: string
}

export interface Item {
    id?: string | number,
    name?: string,
    user?: string,
    date?: string,
    talachero?: string,
    payment?: string,
    total?: number,
    state?: string,
    price?: number,
    tireS?: number,
    tireM?: number,
    tireN?: number,
    quality?: string,
    rating?: number,
    role?:string,
    email?:string,
    access?: string
}