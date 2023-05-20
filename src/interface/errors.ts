export interface ErrorState {
    message: string | null
    category?: any
    fields?: { input: Record<string, string> } | {}
}
