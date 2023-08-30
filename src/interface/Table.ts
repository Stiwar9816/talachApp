export interface Field {
  title: string
  sortable?: boolean
  align?: string
  key: string
}

export interface RatingItem {
  id?: string
  quality: string
  rank: number
  fullName: string
  createdAt: string
}
export interface OrdersItem {
  id?: string
  fullName: string
  createdAt: string
  name_company: string
  total: number
}
export interface UserItem {
  id?: string
  fullName: string
  phone: number
  email: string
  roles?: string
  isActive?: string
  rfc?: string
  idCompany?: string | null
}
export interface ItemPrice {
  id?: string
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
  companies?: string
  file?: File | null
}

export interface InventoryItem extends ItemPrice {
  stock: number
  price?: number
  description: string
}

export interface Coordinates {
  geofence: string | number
  lat: number
  lng: number
}
export interface CompanyItem extends Coordinates {
  id?: string
  name_company: string
  rfc: string
  phone: number
  bussiness_name: string
  address: string
  department: string
  city: string
  postal_code: number
  isActive?: string
  tax_regime: string
  workerCountByCompany?: number
  idCompany?: string
}

export interface WorkerItem extends Coordinates {
  id?: string
  fullName: string
  email: string
  phone: number
  isActive?: string
  idCompany?: string | null
}

export interface CompanyFields {
  fields: Record<string, any>
  items: CompanyItem[]
}
export interface PricesFields {
  fields: Record<string, any>
  items: PriceItem[]
  companies?: any
}
export interface InventoryFields extends Count {
  fields: Record<string, any>
  items: InventoryItem[]
  cache: Record<string, InventoryItem[]>
}
export interface UsersFields {
  fields: Record<string, any>
  items: UserItem[]
}
export interface RatingFields {
  fields: Record<string, any>
  items: RatingItem[]
}
export interface OrdersFields extends Count {
  fields: Record<string, any>
  items: OrdersItem[]
}

export interface WorkerFields {
  fields: Record<string, any>
  items: WorkerItem[]
  companies?: any
}

export type DataTableCompareFunction<T = any> = (a: T, b: T) => number

export type SelectItemKey =
  | boolean
  | string
  | (string | number)[]
  | ((item: Record<string, any>, fallback?: any) => any)

export type DataTableHeader = {
  key: string
  value?: SelectItemKey
  title: string
  colspan?: number
  rowspan?: number
  fixed?: boolean
  align?: 'start' | 'end' | 'center'
  width?: number | string
  minWidth?: string
  maxWidth?: string
  sortable?: boolean
  sort?: DataTableCompareFunction
}
