export const currencyFormatter = (currency: string, value: number) => {
    {
        const formatter = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            minimumFractionDigits: 2,
            currency
        })
        return formatter.format(value)
    }
}