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
    stock?: number,
    description?: string,
    responsible?: string,
    quality?: string,
    rating?: number,
    role?: string,
    email?: string,
    phone?: number,
    bussiness_name?: string,
    departament?: string,
    city?: string,
    postal_code?: number,
    address?: string
}

export interface UserItem {
    name: string
    email: string
    role: string
    state: string
}

export interface PriceItem {
    name: string
    price: number
}

export interface InventoryItem {
    name: string
    stock: number
    description: string
    responsible: string
}

export interface CompanyItem {
    name: string
    phone: number
    bussiness_name: string
    address: string
    departament: string
    city: string
    postal_code: number
    state: string
}