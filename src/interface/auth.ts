export interface User {
    id?: number
    fullName: string
}

export interface AuthState {
    token: string | null
    user: User | null
    role: string | null
}