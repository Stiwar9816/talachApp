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
              <td>{{ item.columns.checkOutOrder }}</td>
              <td>{{ item.columns.client }}</td>
              <td>{{ item.columns.mechanic }}</td>
              <td>{{ item.columns.from }}</td>
              <td>{{ item.columns.to }}</td>
              <td>{{ currencyFormatter('MXN', item.columns.price) }} MXN</td>
              <td>{{ new Date(item.columns.created_at).toLocaleString() }}</td>
            </tr>
          </template>
          <template v-slot:no-data>
            <p class="pa-5">No hay registros que coincidan con su busqueda!</p>
          </template>
        </v-data-table>
      </v-col>
      <!-- DataTable -->
    </v-row>
    <v-snackbar
      v-model="showSnackbar"
      :timeout="4000"
      :color="color"
      rounded="pill"
      location="bottom right"
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, type PropType, onMounted, onUnmounted } from 'vue'
// Xlsx
import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'
// Utils
import { currencyFormatter, supabase } from '@/utils'
// Stores
import { useOrdersStore } from '@/stores'
// Const
const tableRef = ref<HTMLElement | null>(null)
const search = ref<string>('')
const perPage = ref<number>(5)
// Alerts
const showSnackbar = ref(false)
const color = ref('')
const message = ref('')

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

const order = useOrdersStore()

const initialize = async () => {
  try {
    await Promise.all([order.allOrders(), order.subscribeToOrders()])
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
onMounted(() => {
  initialize()
})

const exportData = () => {
  try {
    if (!tableRef.value || props.items.length === 0) return

    // Obtener una lista de los campos que deseas exportar
    const fieldsToExport = Object.values(props.fields).filter((field) => field)

    const data = props.items.map((item: any) => {
      const rowData = fieldsToExport.map((field: any) => {
        const value = item[field.key]
        return value !== null && typeof value !== 'object' ? value : ''
      })
      return rowData
    })
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
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
onUnmounted(async () => {
  await supabase.removeAllChannels()
})
</script>
