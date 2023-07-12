export interface User {
    id?: string
    fullName: string
}

export interface AuthState {
    token: string | null
    user: User | null
    // role: string | null
}