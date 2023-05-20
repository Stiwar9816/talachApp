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
                      <v-col cols="12" sm="6" md="6">
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
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.rfc"
                          label="RFC"
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
                          v-model="editedItem.cfdi"
                          label="CFDI"
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
                      <v-col cols="12" sm="6" md="6">
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
        <template v-slot:item.actions="{ item }">
          <v-icon size="large" class="my-1" color="blue-accent-3" @click="editItem(item.raw)">
            mdi-pencil
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
const search = ref<string>('')
const perPage = ref<number>(5)
const data = ref<CompanyItem[]>([])
const editedIndex = ref<number>(-1)
const editedItem = ref<CompanyItem>({
  name_company: '',
  rfc: '',
  cfdi: '',
  phone: 0,
  bussiness_name: '',
  address: '',
  department: '',
  city: '',
  postal_code: 0
})
const defaultItem = ref<CompanyItem>({
  name_company: '',
  rfc: '',
  cfdi: '',
  phone: 0,
  bussiness_name: '',
  address: '',
  department: '',
  city: '',
  postal_code: 0
})

// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])

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
  return !editedItem.value.id ? 'Agregar Empresa' : 'Editar Empresa'
})

const editItem = (item: CompanyItem) => {
  console.log(item)
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const close = () => {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  editedIndex.value = -1
}

const save = async () => {
  try {
    let { id, phone, postal_code, ...create } = editedItem.value
    phone = +phone
    postal_code = +postal_code
    if (!id) {
      // Add new company
      await company.createCompany({
        ...create,
        phone,
        postal_code
      })
      close()
    } else {
      // Update company
      await company.updateCompany(+id, { ...create, phone, postal_code })
      close()
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
