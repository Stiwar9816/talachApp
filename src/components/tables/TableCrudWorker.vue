<template>
  <div class="mt-2">
    <v-row no-gutters>
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
      <v-data-table
        :headers="props.fields"
        :items="props.items"
        :search="search"
        :items-per-page="perPage"
        class="elevation-1 rounded-lg"
      >
        <template v-slot:top>
          <v-toolbar class="bg-grey-lighten-5" density="comfortable" flat>
            <v-spacer></v-spacer>
            <!-- Add Modal -->
            <v-dialog v-model="dialog" persistent max-width="800px">
              <v-card class="rounded-lg">
                <v-toolbar color="orange-darken-3">
                  <v-card-title>
                    <v-container>
                      {{ formTitle }}
                    </v-container>
                  </v-card-title>
                </v-toolbar>

                <v-card-text class="bg-grey-lighten-3">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.fullName"
                          label="Nombre completo"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="text"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="email"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.phone"
                          label="Teléfono"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="number"
                          min="0"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.lat"
                          label="Latitud"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="number"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.lng"
                          label="Longitud"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="number"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="editedItem.geofence"
                          label="Geocerca"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="text"
                          auto-grow
                          rows="1"
                          row-height="15"
                          clearable
                          required
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="editedItem.company_worker"
                          label="Centros talacheros"
                          :rules="requiredValue"
                          :items="company.items"
                          item-title="name_company"
                          item-value="id"
                          variant="underlined"
                          density="comfortable"
                          type="text"
                          clearable
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions class="bg-grey-lighten-3">
                  <v-spacer />
                  <v-btn color="grey-lighten-1" variant="flat" @click="close"> Cancelar </v-btn>
                  <v-btn color="orange-darken-3" variant="flat" @click="save"> Guardar </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Add Modal -->
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon size="large" class="my-1" color="blue-accent-3" @click="editItem(item.raw)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:no-data>
          <p class="pa-5">No hay registros</p>
        </template>
      </v-data-table>
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
import { ref, computed, onMounted, onUnmounted, type DeepReadonly } from 'vue'
// Interface
import type { DataTableHeader, WorkerItem } from '@/interface'
// Stores
import { useCompanyStore, useWorkerStore } from '@/stores'
// Utils
import { subscribeToUsers, supabase } from '@/utils'
// Props
const props = defineProps({
  fields: Array as () => DeepReadonly<DataTableHeader[] | DataTableHeader[][]> | undefined,
  items: Array<WorkerItem>
})
// Const
const dialog = ref<boolean>(false)
const search = ref<string>('')
const perPage = ref<number>(5)
const data = ref<WorkerItem[]>([])
const editedIndex = ref<number>(-1)
const editedItem = ref<WorkerItem>({
  fullName: '',
  email: '',
  phone: 0,
  geofence: '',
  lat: 0,
  lng: 0,
  company_worker: null
})
const defaultItem = ref<WorkerItem>({
  fullName: '',
  email: '',
  phone: 0,
  geofence: '',
  lat: 0,
  lng: 0,
  company_worker: null
})
// Alerts
const showSnackbar = ref(false)
const color = ref('')
const message = ref('')

// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])

const worker = useWorkerStore()
const company = useCompanyStore()

const initialize = async () => {
  try {
    await Promise.all([
      worker.allWorkers(),
      subscribeToUsers(worker.items),
      company.allCompanies(),
      company.subscribeToCompanies()
    ])
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

onMounted(() => {
  initialize()
})

// Methods / Actions
const formTitle = computed(() => {
  return !editedItem.value.id ? 'Agregar Trabajador' : 'Editar Trabajador'
})

const editItem = (item: WorkerItem) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign(
    {},
    {
      id: item.id,
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      company_worker: item.company_worker,
      lat: item.lat,
      lng: item.lng,
      geofence: item.geofence
    }
  )
  dialog.value = true
}

const close = () => {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  editedIndex.value = -1
}

const save = async () => {
  try {
    let { id, phone, lat, lng, company_worker, ...create } = editedItem.value
    phone = +phone
    lat = +lat
    lng = +lng
    if (id) {
      // Update company
      await worker.updateWorker(id, { ...create, phone, lat, lng }, company_worker!)
      showSnackbar.value = true
      message.value = `¡Trabajador ${create.fullName} fue actualizado con exito!`
      color.value = 'light-blue-darken-3'
      close()
    }
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
