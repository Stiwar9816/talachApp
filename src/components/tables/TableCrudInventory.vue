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
                    <v-icon color="orange-darken-4" />
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
                      <v-col cols="12" sm="5" md="5">
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
                      <v-col cols="12" sm="3" md="3">
                        <v-text-field
                          v-model="editedItem.stock"
                          label="Stock"
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
                          v-model="editedItem.responsible"
                          label="Responsable"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="text"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="editedItem.description"
                          label="Descripción"
                          :rules="requiredValue"
                          rows="2"
                          auto-grow
                          row-height="15"
                          variant="underlined"
                          density="comfortable"
                          clearable
                        ></v-textarea>
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
import type { InventoryItem } from '@/interface'
interface Inventory {
  fields: Record<string, string>
  items: InventoryItem[]
}
// Props
const props = defineProps<Inventory>()
// Const
const dialog = ref<boolean>(false)
const dialogDelete = ref<boolean>(false)
const search = ref<string>('')
const perPage = ref<number>(5)
const data = ref<InventoryItem[]>([])
const editedIndex = ref<number>(-1)
const editedItem = ref<InventoryItem>({
  name: '',
  stock: 0,
  description: '',
  responsible: ''
})
const defaultItem = ref<InventoryItem>({
  name: '',
  stock: 0,
  description: '',
  responsible: ''
})
// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])

onMounted(() => {
  initialize()
})

// Methods / Actions
const formTitle = computed(() => {
  return editedIndex.value === -1 ? 'Agregar Inventario' : 'Editar Inventario'
})

const initialize = () => {
  data.value = props.items
}

const editItem = (item: InventoryItem) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

const deleteItem = (item: InventoryItem) => {
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