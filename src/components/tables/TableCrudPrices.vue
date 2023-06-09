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
                          v-model="editedItem.price"
                          label="Precio"
                          :rules="requiredValue"
                          variant="underlined"
                          density="comfortable"
                          type="number"
                          min="0"
                          clearable
                          required
                        ></v-text-field>
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
        <template v-slot:item.price="{ item }"
          >{{ currencyFormatter('MXN', item.columns.price) }} MXN</template
        >
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
import { ref, computed, onMounted, toRefs, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { currencyFormatter } from '@/utils'
import { useCostsStore, useProductStore, useServiceStore } from '@/stores'
// Interface
import type { PriceItem } from '@/interface'
interface Price {
  fields: Record<string, string>
  items: PriceItem[]
}

// Props
const props = defineProps<Price>()
// Const
const dialog = ref<boolean>(false)
const search = ref<string>('')
const perPage = ref<number>(5)
const data = ref<PriceItem[]>([])
const editedIndex = ref(-1)
const editedItem = ref<PriceItem>({
  name: '',
  price: 0
})
const defaultItem = ref<PriceItem>({
  name: '',
  price: 0
})
// Alerts
const snackbar = ref(false)
const color = ref('')
const message = ref('')

// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])

//Initialize table
const route = useRoute()
const currentPage = reactive({
  pageTitle: ref<string>('')
})

const cost = useCostsStore()
const service = useServiceStore()
const product = useProductStore()

const initialize = async () => {
  try {
    await cost.allCost()
    await product.allProduct()
    await service.allService()
  } catch (error: any) {
    snackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

onMounted(() => {
  initialize()
  currentPage.pageTitle = route.name?.toString() || ''
})

// Methods / Actions
const formTitle = computed(() => {
  return !editedItem.value.id ? 'Agregar' : 'Editar'
})

const editItem = (item: PriceItem) => {
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
    let { pageTitle } = toRefs(currentPage)
    let { id, price, type, ...payload } = editedItem.value
    price = +price
    switch (pageTitle.value) {
      case 'costs':
        type = 'Costo'
        if (!id) {
          // Add new cost
          await cost.createCost({ price, type, ...payload })
          snackbar.value = true
          message.value = '¡Costo agregado con exito!'
          color.value = 'orange-darken-2'
          close()
        } else {
          // Update cost
          await cost.updateCost(+id, { ...payload, price, type })
          snackbar.value = true
          message.value = '¡Costo Actualizado con exito!'
          color.value = 'light-blue-darken-3'
          close()
        }
        break
      case 'services':
        type = 'Servicio'
        if (!id) {
          // Add new cost
          await service.createService({ price, type, ...payload })
          snackbar.value = true
          message.value = '¡Servicio agregado con exito!'
          color.value = 'orange-darken-2'
          close()
        } else {
          // Update cost
          await service.updateService(+id, { ...payload, price, type })
          snackbar.value = true
          message.value = '¡Servicio Actualizado con exito!'
          color.value = 'light-blue-darken-3'
          close()
        }
        break
      case 'products':
        type = 'Producto'
        if (!id) {
          // Add new cost
          await product.createProduct({ price, type, ...payload })
          snackbar.value = true
          message.value = '¡Producto agregado con exito!'
          color.value = 'orange-darken-2'
          close()
        } else {
          // Update cost
          await product.updateProduct(+id, { ...payload, price, type })
          snackbar.value = true
          message.value = '¡Producto Actualizado con exito!'
          color.value = 'light-blue-darken-3'
          close()
        }
        break
      default:
        break
    }
  } catch (error: any) {
    snackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
</script>
