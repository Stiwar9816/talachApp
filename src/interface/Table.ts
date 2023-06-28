export interface Field {
    title: string
    sortable?: boolean
    align?: string
    key: string
}

export interface RatingItem {
    id?: string | number
    quality: string
    rank: number
    fullName: string
    createdAt: string
}
export interface OrdersItem {
    id?: string | number
    fullName: string
    createdAt: string
    name_company: string
    total: number
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

export interface Count {
    count: number
    cacheCount: number
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
    fields: Record<string, any>
    items: CompanyItem[]
    cache: Record<string, CompanyItem[]>
}
export interface PricesFields {
    fields: Record<string, any>
    items: PriceItem[]
    cache: Record<string, PriceItem[]>
}
export interface InventoryFields extends Count {
    fields: Record<string, any>
    items: InventoryItem[]
    cache: Record<string, InventoryItem[]>
}
export interface UsersFields {
    fields: Record<string, any>
    items: UserItem[]
    cache: Record<string, UserItem[]>
}
export interface RatingFields {
    fields: Record<string, any>
    items: RatingItem[]
    cache: Record<string, RatingItem[]>
}
export interface OrdersFields extends Count {
    fields: Record<string, any>
    items: OrdersItem[]
    cache: Record<string, OrdersItem[]>
}