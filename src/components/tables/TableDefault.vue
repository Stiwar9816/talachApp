<template>
  <div>
    <v-row no-gutters>
      <!-- Text Field & Button -->
      <v-col cols="12" md="4">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          class="mt-4"
          label="Buscar"
          type="text"
          clearable
          density="compact"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-spacer />

      <v-btn
        prepend-icon="mdi-google-spreadsheet"
        variant="flat"
        color="grey-lighten-2"
        rounded="lg"
        class="mt-4"
        @click="exportData"
      >
        <template v-slot:prepend>
          <v-icon color="success"></v-icon>
        </template>
        Exportar Excel
      </v-btn>
      <!-- Text Field & Button -->
      <!-- DataTable -->
      <v-col cols="12">
        <v-data-table
          :headers="props.fields"
          :items="props.items"
          :search="search"
          :items-per-page="perPage"
          class="elevation-1 mt-3 rounded-lg"
          ref="tableRef"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.columns.id }}</td>
              <td>{{ item.columns.user.fullName }}</td>
              <td>{{ new Date(item.columns.createdAt).toLocaleString() }}</td>
              <td>{{ item.columns.companies.name_company }}</td>
              <td>{{ currencyFormatter('MXN', item.columns.total) }} MXN</td>
            </tr>
          </template>
          <template v-slot:no-data>
            <p class="pa-5">No hay registros que coincidan con su busqueda!</p>
          </template>
          <template v-slot:no-results> No hay datos!</template>
        </v-data-table>
      </v-col>
      <!-- DataTable -->
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, type PropType, onMounted } from 'vue'
import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'
import { currencyFormatter } from '@/utils'
import { useOrdersStore } from '@/stores'
const tableRef = ref<HTMLElement | null>(null)
// Const
const search = ref<string>('')
const perPage = ref<number>(5)
// Props
const props = defineProps({
  fields: {
    type: Object as PropType<{ [key: string]: any[] }>,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  }
})
const ordersStore = useOrdersStore()

const initialize = async () => {
  try {
    const result = await ordersStore.allOrders()
    return result
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  initialize()
})

const exportData = () => {
  try {
    if (!tableRef.value || props.items.length === 0) return
    const data = props.items.map((item: any) => Object.values(item))
    // Obtener los encabezados personalizados
    const headers = Object.values(props.fields).map((field: any) => field.title)
    const worksheet = XLSX.utils.json_to_sheet([headers, ...data])
    if (worksheet['!ref']) {
      const range = XLSX.utils.decode_range(worksheet['!ref'])
      range.s.r += 1
      worksheet['!ref'] = XLSX.utils.encode_range(range)
    }
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders')
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const fileName = 'orders.xlsx'
    const file = new Blob([wbout], { type: 'application/octet-stream' })
    FileSaver.saveAs(file, fileName)
  } catch (error) {
    console.log(error)
  }
}
</script>
