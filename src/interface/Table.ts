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
    type?: string
}

export interface UserItem {
    id?: string | number
    fullName: string
    phone: number
    email: string
    roles?: string
    isActive?: string
    password?: string
}
export interface ItemPrice {
    id?: string | number
    name: string
    type?: string
}

export interface PriceItem extends ItemPrice {
    price: number
    stock?: number
}

export interface InventoryItem extends ItemPrice {
    stock: number
    price?: number
    description: string
}
export interface CompanyItem {
    id?: number
    name_company: string
    rfc: string
    cfdi: string
    phone: number
    bussiness_name: string
    address: string
    department: string
    city: string
    postal_code: number
    isActive?: string
    geofence: string | number
    lat: number
    lng: number
}

export interface CompanyFields {
    fields: Field[]
    items: CompanyItem[]
    cache: Record<string, CompanyItem[]>
}
export interface PricesFields {
    fields: Field[]
    items: PriceItem[]
    cache: Record<string, PriceItem[]>
}
export interface InventoryFields {
    fields: Field[]
    items: InventoryItem[]
    cache: Record<string, InventoryItem[]>
}
export interface UsersFields {
    fields: Field[]
    items: UserItem[]
    cache: Record<string, UserItem[]>
}