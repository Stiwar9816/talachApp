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
            <v-dialog v-model="dialog" max-width="500px">
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
                          v-model="editedItem.name"
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
                          v-model="editedItem.email"
                          label="Correo electronico"
                          :rules="emailRules"
                          variant="underlined"
                          density="comfortable"
                          type="email"
                          clearable
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="editedItem.role"
                          label="Rol"
                          :rules="requiredValue"
                          :items="['Administrador', 'Usuario']"
                          variant="underlined"
                          density="comfortable"
                          type="text"
                          clearable
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          v-model="editedItem.state"
                          label="Estado"
                          :rules="requiredValue"
                          :items="['Activo', 'Inactivo']"
                          variant="underlined"
                          density="comfortable"
                          type="text"
                          clearable
                          required
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
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card class="rounded-lg">
                <v-card-text class="text-h6 text-center"
                  >¿Estás seguro de que quieres eliminar este artículo?
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
          <p class="pa-5">No hay registros que coincidan con su busqueda!</p>
        </template>
        <template v-slot:no-results> No hay datos!</template>
      </v-data-table>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
// Interface
import type { UserItem } from '@/interface'
interface User {
  fields: Record<string, unknown>
  items: UserItem[]
}
// Props
const props = defineProps<User>()
// Const
const dialog = ref(false)
const dialogDelete = ref(false)
const search = ref('')
const perPage = ref(5)
const data = ref<UserItem[]>([])
const editedIndex = ref(-1)
const editedItem = ref<UserItem>({
  name: '',
  email: '',
  role: '',
  state: ''
})
const defaultItem = ref<UserItem>({
  name: '',
  email: '',
  role: '',
  state: ''
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

onMounted(() => {
  initialize()
})

// Methods / Actions
const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Agregar Usuario' : 'Editar Usuario'
})

const initialize = () => {
  data.value = props.items
}

const editItem = (item: UserItem) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const deleteItem = (item: UserItem) => {
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

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(data.value[editedIndex.value], editedItem.value)
  } else {
    data.value.push(editedItem.value)
  }
  close()
}
</script>
