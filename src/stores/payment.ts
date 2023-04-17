import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('payment', () => {
    const fields: Object = [
        {
            key: 'id',
            sortable: false,
            title: 'ID'
        },
        { key: 'user', sortable: false, title: 'Usuario' },
        { key: 'date', sortable: true, title: 'Fecha de servicio' },
        { key: 'talachero', sortable: false, title: 'Talachero' },
        { key: 'payment', sortable: false, title: 'Método de pago' },
        { key: 'total', sortable: false, title: 'Total' },
        { key: 'state', sortable: true, title: 'Estado' }
    ]
    const items: Object = [
        {
            id: 1,
            user: 'Frozen Yogurt',
            date: '13-04-2023',
            talachero: 'Frozen Yogurt',
            payment: 'Bancomer',
            total: 1000,
            state: 'Pagado'
        },
        {
            id: 1,
            user: 'Frozen Yogurt',
            date: '13-04-2023',
            talachero: 'Frozen Yogurt',
            payment: 'Bancomer',
            total: 1000,
            state: 'Pagado'
        },
        {
            id: 1,
            user: 'Frozen Yogurt',
            date: '13-04-2023',
            talachero: 'Frozen Yogurt',
            payment: 'Bancomer',
            total: 1000,
            state: 'Pagado'
        },
        {
            id: 1,
            user: 'Frozen Yogurt',
            date: '13-04-2023',
            talachero: 'Frozen Yogurt',
            payment: 'Bancomer',
            total: 1000,
            state: 'Pagado'
        },
        {
            id: 1,
            user: 'Frozen Yogurt',
            date: '13-04-2023',
            talachero: 'Frozen Yogurt',
            payment: 'Bancomer',
            total: 1000,
            state: 'Pagado'
        },
        {
            id: 1,
            user: 'Frozen Yogurt',
            date: '13-04-2023',
            talachero: 'Frozen Yogurt',
            payment: 'Bancomer',
            total: 1000,
            state: 'Pagado'
        },
        {
            id: 1,
            user: 'Frozen Yogurt',
            date: '13-04-2023',
            talachero: 'Frozen Yogurt',
            payment: 'Bancomer',
            total: 1000,
            state: 'Pagado'
        }
    ]
    return { fields, items }
})