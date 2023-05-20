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
    id?: string | number
    fullName: string
    phone: number
    email: string
    roles?: string
    isActive?: string
    password?: string
}

export interface PriceItem {
    id?: string | number
    name: string
    price: number
}

export interface InventoryItem {
    id?: string | number
    name: string
    stock: number
    description: string
    responsible: string
}

export interface CompanyItem {
    id?: string | number
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
}

export interface Company {
    fields: Field[]
    items: CompanyItem[]
}