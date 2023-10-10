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
      <!-- Text Field & Button -->
      <!-- Data Table -->
      <v-col cols="12">
        <v-data-table
          :headers="props.fields"
          :items="props.items"
          :search="search"
          :items-per-page="5"
          item-value="id"
          class="elevation-1 rounded-lg"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.columns.client }}</td>
              <td>{{ item.columns.mechanic }}</td>
              <td>{{ item.columns.description }}</td>
              <td>
                <v-rating
                  v-model="item.columns.calificationClient"
                  color="amber"
                  density="comfortable"
                  readonly
                  half-increments
                ></v-rating>
              </td>
              <td>
                <v-rating
                  v-model="item.columns.calificationMechanic"
                  color="amber"
                  density="comfortable"
                  readonly
                  half-increments
                ></v-rating>
              </td>
              <td>
                <img
                  class="rounded-lg mt-2"
                  :src="item.columns.imageReport"
                  alt="image_report1"
                  width="100"
                  cover
                />
              </td>
              <td>
                <img
                  class="rounded-lg mt-2"
                  :src="item.columns.imageReport2"
                  alt="image_report2"
                  width="100"
                  cover
                />
              </td>
              <td>{{ new Date(item.columns.created_at).toLocaleString() }}</td>
            </tr>
          </template>
          <template v-slot:no-data>
            <p class="pa-5">No hay registros que coincidan con su busqueda!</p>
          </template>
        </v-data-table>
      </v-col>
      <!-- Data Table -->
    </v-row>
    <Alert
      :snackbar-model="showSnackbar"
      :color="color"
      :message="message"
      @close="handleSnackbarClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, type DeepReadonly } from 'vue'
// Stores
import { useRatingsStore } from '@/stores'
// Interfaces
import type { DataTableHeader } from '@/interface'
// Utils
import { supabase } from '@/utils'
// Components
import Alert from '@/components/alerts/Alert.vue'
// Const
const search = ref<string>('')
// Alerts
const showSnackbar = ref(false)
const color = ref('')
const message = ref('')
const handleSnackbarClose = () => {
  showSnackbar.value = false
}

// Props
const props = defineProps({
  fields: Array as () => DeepReadonly<DataTableHeader[] | DataTableHeader[][]> | undefined,
  items: Array
})

const rating = useRatingsStore()

const initialize = async () => {
  try {
    await Promise.all([rating.allRatings(), rating.subscribeToRatings()])
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
onMounted(() => {
  initialize()
})

onUnmounted(async () => {
  await supabase.removeAllChannels()
})
</script>
