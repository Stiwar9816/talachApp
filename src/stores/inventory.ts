import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', () => {
    const fields = [
        {
            title: 'Nombre',
            sortable: false,
            key: 'name'
        },
        { title: '11 R 22.5', align: 'center', key: 'tireS' },
        { title: '11 R 24.5', align: 'center', key: 'tireM' },
        { title: 'Llanta Nueva', align: 'center', key: 'tireN' },
        { title: 'Acciones', key: 'actions', sortable: false }
    ]

    const items = [
        {
            name: 'Frozen Yogurt',
            tireS: 159,
            tireM: 6.0,
            tireN: 24
        },
        {
            name: 'Ice cream sandwich',
            tireS: 237,
            tireM: 9.0,
            tireN: 37
        },
        {
            name: 'Eclair',
            tireS: 262,
            tireM: 16.0,
            tireN: 23
        },
        {
            name: 'Cupcake',
            tireS: 305,
            tireM: 3.7,
            tireN: 67
        },
        {
            name: 'Gingerbread',
            tireS: 356,
            tireM: 16.0,
            tireN: 49
        },
        {
            name: 'Jelly bean',
            tireS: 375,
            tireM: 0.0,
            tireN: 94
        },
        {
            name: 'Lollipop',
            tireS: 392,
            tireM: 0.2,
            tireN: 98
        },
        {
            name: 'Honeycomb',
            tireS: 408,
            tireM: 3.2,
            tireN: 87
        },
        {
            name: 'Donut',
            tireS: 452,
            tireM: 25.0,
            tireN: 51
        },
        {
            name: 'KitKat',
            tireS: 518,
            tireM: 26.0,
            tireN: 65
        }
    ]

    return { fields, items }
})