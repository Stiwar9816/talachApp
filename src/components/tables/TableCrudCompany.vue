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
        :headers="fields"
        :items="items"
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
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.name_company"
                          label="Nombre"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="text"
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
                          v-model="editedItem.bussiness_name"
                          label="Nombre Comercial"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="text"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.address"
                          label="Dirección"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="text"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.department"
                          label="Estado"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="text"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" md="4">
                        <v-text-field
                          v-model="editedItem.city"
                          label="Ciudad"
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
                          v-model="editedItem.postal_code"
                          label="Codigo Postal"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="number"
                          min="0"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
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
            <!-- Delete Modal -->
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card class="rounded-lg">
                <v-card-text class="text-h6 text-center"
                  >¿Estás seguro de que quieres eliminar esta empresa?
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="grey-lighten-1" variant="flat" @click="closeDelete">Cancelar</v-btn>
                  <v-btn color="orange-darken-3" variant="flat" @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Delete Modal -->
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon size="large" class="my-1" color="blue-accent-3" @click="editItem(item.raw)">
            mdi-pencil
          </v-icon>
          <v-icon size="large" class="my-1" color="red-darken-1" @click="deleteItem(item.raw)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <p class="pa-5">¡No hay registros que coincidan con su busqueda!</p>
        </template>
        <template v-slot:no-results>¡No hay datos!</template>
      </v-data-table>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue'
// Interface
import type { CompanyItem } from '@/interface'
import { useCompanyStore } from '@/stores/company'
interface Company {
  fields: Record<string, string>
  items: CompanyItem[]
}
// Props
const props = defineProps<Company>()
// Const
const dialog = ref<boolean>(false)
const dialogDelete = ref<boolean>(false)
const search = ref<string>('')
const perPage = ref<number>(5)
const data = ref<CompanyItem[]>([])
const editedIndex = ref<number>(-1)
const editedItem = ref<CompanyItem>({
  name_company: '',
  phone: 0,
  bussiness_name: '',
  address: '',
  department: '',
  city: '',
  postal_code: 0,
  isActive: ''
})
const defaultItem = ref<CompanyItem>({
  name_company: '',
  phone: 0,
  bussiness_name: '',
  address: '',
  department: '',
  city: '',
  postal_code: 0,
  isActive: ''
})

// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])
const emailRules = ref([
  (v: String) => !!v || 'El valor del campo es requerido',
  (v: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v
    ) || 'Correo electronico no es valido, Verifiquelo nuevamente'
])

const company = useCompanyStore()

const initialize = async () => {
  try {
    const result = await company.allCompanies()
    data.value = result
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  initialize()
})

// Methods / Actions
const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Agregar Empresa' : 'Editar Empresa'
})

const editItem = (item: CompanyItem) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const deleteItem = (item: CompanyItem) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

const deleteItemConfirm = () => {
  data.value.splice(editedIndex.value, 1)
  closeDelete()
}

const close = () => {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  editedIndex.value = -1
}

const closeDelete = () => {
  dialogDelete.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  editedIndex.value = -1
}

const save = async () => {
  try {
    let { phone, postal_code, ...create } = editedItem.value
    phone = Number(phone)
    postal_code = Number(postal_code)
    console.log('Number:', phone, postal_code)
    await company.createCompany({
      ...create,
      phone,
      postal_code
    })
    close()
  } catch (error) {
    console.error(error)
  }
}
</script>
