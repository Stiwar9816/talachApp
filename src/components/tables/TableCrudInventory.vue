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
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon size="large" class="my-1" color="blue-accent-3" @click="editItem(item.raw)">
            mdi-pencil
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
import { useInventoryStore } from '@/stores/inventory'
interface Inventory {
  fields: Record<string, string>
  items: InventoryItem[]
}
// Props
const props = defineProps<Inventory>()
// Const
const dialog = ref<boolean>(false)
const search = ref<string>('')
const perPage = ref<number>(5)
const data = ref<InventoryItem[]>([])
const editedIndex = ref<number>(-1)
const editedItem = ref<InventoryItem>({
  name: '',
  stock: 0,
  description: ''
})
const defaultItem = ref<InventoryItem>({
  name: '',
  stock: 0,
  description: ''
})
// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])

const inventory = useInventoryStore()

const initialize = async () => {
  try {
    const result = await inventory.allInventory()
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
  return !editedItem.value.id ? 'Agregar Inventario' : 'Editar Inventario'
})

const editItem = (item: InventoryItem) => {
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
  let { user, stock, type, ...inevntory } = editedItem.value
  user = localStorage.getItem('user')
  type = 'Producto'
  stock = +stock
  console.log(user)
  console.log(editedItem.value)
  await inventory.createInventory({ ...inevntory, stock, user, type })
}
</script>
