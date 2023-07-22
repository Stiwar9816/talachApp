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
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ props }">
                <v-btn
                  prepend-icon="mdi-plus"
                  variant="flat"
                  color="grey-lighten-2"
                  rounded="lg"
                  class="my-2"
                  v-bind="props"
                >
                  <template v-slot:prepend>
                    <v-icon color="orange-darken-4"></v-icon>
                  </template>
                  Agregar
                </v-btn>
              </template>

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
                      <template v-if="!editedItem.id">
                        <v-col cols="12">
                          <v-select
                            v-model="editedItem.companies"
                            label="Centro talachero"
                            :rules="requiredValue"
                            :items="worker.companies"
                            item-title="name_company"
                            item-value="id"
                            variant="underlined"
                            density="comfortable"
                            type="text"
                            clearable
                          >
                          </v-select>
                        </v-col>
                      </template>
                      <template v-if="editedItem.id">
                        <v-col cols="12" sm="12" md="12">
                          <v-select
                            v-model="editedItem.isActive"
                            label="Estado"
                            :rules="requiredValue"
                            :items="['Activo', 'Inactivo']"
                            variant="underlined"
                            density="comfortable"
                            type="text"
                            clearable
                          ></v-select>
                        </v-col>
                      </template>
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
        <template v-slot:item.companies="{ item }">
          {{ item.columns.companies.name_company }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon size="large" class="my-1" color="blue-accent-3" @click="editItem(item.raw)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:no-data>
          <p class="pa-5">¡No hay registros que coincidan con su busqueda!</p>
        </template>
      </v-data-table>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      :color="color"
      rounded="pill"
      location="bottom right"
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
// Interface
import type { WorkerItem } from '@/interface'
import { useWorkerStore } from '@/stores'
interface Worker {
  fields: Record<string, string>
  items: WorkerItem[]
}
// Props
const props = defineProps<Worker>()
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
  companies: null
})
const defaultItem = ref<WorkerItem>({
  fullName: '',
  email: '',
  phone: 0,
  geofence: '',
  lat: 0,
  lng: 0,
  companies: null
})
// Alerts
const snackbar = ref(false)
const color = ref('')
const message = ref('')

// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])

const worker = useWorkerStore()
// Realiza la suscripción al iniciar el componente
const unsubscribe = worker.subcribeToWorkers()

const initialize = async () => {
  try {
    await worker.allWorkers()
    await worker.allCompanies()
  } catch (error: any) {
    snackbar.value = true
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
      companies: item.companies,
      lat: item.lat,
      lng: item.lng,
      geofence: item.geofence,
      isActive: item.isActive
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
    let { id, phone, companies, lat, lng, ...create } = editedItem.value
    phone = +phone
    lat = +lat
    lng = +lng
    if (!id) {
      // Add new company
      await worker.createWorker({ phone, lat, lng, ...create }, companies)
      snackbar.value = true
      message.value = `¡Nuevo trabajador ${create.fullName} fue agregado con exito!`
      color.value = 'orange-darken-2'
      close()
    } else {
      // Update company
      await worker.updateWorker(id, { ...create, phone, lat, lng })
      snackbar.value = true
      message.value = `¡Trabajador ${create.fullName} fue actualizado con exito!`
      color.value = 'light-blue-darken-3'
      close()
    }
  } catch (error: any) {
    snackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

// Cancela la suscripción al desmontar el componente
onUnmounted(()=> {
  unsubscribe()
})
</script>
