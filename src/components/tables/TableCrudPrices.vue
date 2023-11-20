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
            <v-dialog v-model="dialog" persistent max-width="500px">
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
                      <template v-if="route.name == 'products'">
                        <v-col cols="12">
                          <template v-if="!editedItem.id">
                            <v-select
                              v-model="editedItem.companies"
                              label="Centro talachero"
                              :rules="requiredValue"
                              :items="product.companies"
                              item-title="name_company"
                              item-value="id"
                              variant="underlined"
                              density="comfortable"
                              type="text"
                              chips
                              closable-chips
                              multiple
                              clearable
                            >
                            </v-select>
                          </template>
                          <template v-if="editedItem.id">
                            <v-select
                              v-model="editedItem.companies"
                              label="Centro talachero"
                              :rules="requiredValue"
                              :items="product.companies"
                              item-title="name_company"
                              item-value="id"
                              variant="underlined"
                              density="comfortable"
                              type="text"
                              hint="Este campo no se permite editar"                            
                              readonly
                            >
                            </v-select>
                          </template>
                        </v-col>
                        <v-col cols="12">
                          <v-file-input
                            v-model="editedItem.file"
                            :rules="requiredValue"
                            accept="image/png,image/jpg,image/jpeg"
                            label="Imagen de producto"
                            variant="underlined"
                            density="comfortable"
                            prepend-icon="mdi-image"
                            clearable
                            counter
                            show-size
                            chips
                          ></v-file-input>
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
        <template v-slot:item.image="{ item }">
          <img
            class="rounded-lg mt-2"
            :src="item.columns.image"
            alt="image_product"
            width="100"
            cover
          />
        </template>
        <template v-slot:item.companies="{ item }">
          {{ item.columns.companies.name_company }}
        </template>
        <template v-slot:item.price="{ item }">
          {{ currencyFormatter('MXN', item.columns.price) }} MXN
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
import { ref, computed, onMounted, toRefs, reactive, onUnmounted, type DeepReadonly } from 'vue'
import { useRoute } from 'vue-router'
// Utils
import { currencyFormatter, subscribeToPrices, supabase } from '@/utils'
// Stores
import { useCompanyStore, useCostsStore, useProductStore, useServiceStore } from '@/stores'
// Interface
import type { DataTableHeader, PriceItem } from '@/interface'
// Props
const props = defineProps({
  fields: Array as () => DeepReadonly<DataTableHeader[] | DataTableHeader[][]> | undefined,
  items: Array<PriceItem[]>
})
// Const
const dialog = ref<boolean>(false)
const search = ref<string>('')
const perPage = ref<number>(5)
const data = ref<PriceItem[]>([])
const editedIndex = ref(-1)

const defaultFile: FileReader | null = null

const editedItem = ref<PriceItem>({
  name: '',
  price: 0,
  companies: [],
  file: defaultFile
})
const defaultItem = ref<PriceItem>({
  name: '',
  price: 0,
  companies: [],
  file: defaultFile
})
// Alerts
const showSnackbar = ref(false)
const color = ref('')
const message = ref('')

// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])

//Initialize table
const route = useRoute()
const currentPage = reactive({
  pageTitle: ref<string>('')
})

const company = useCompanyStore()
const cost = useCostsStore()
const product = useProductStore()
const service = useServiceStore()

const handlePageEvents = async (pageName: string) => {
  try {
    const pageFunctions: any = {
      costs: [subscribeToPrices('Costo', cost.$state.items), cost.allCost()],
      services: [service.allService(), subscribeToPrices('Servicio', service.$state.items)],
      products: [
        company.subscribeToCompanies(),
        product.allCompanies(),
        product.allProduct(),
        subscribeToPrices('Producto', product.$state.items)
      ]
    }

    const pageFunction = pageFunctions[pageName]

    if (pageFunction) await Promise.all(pageFunction)
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

const initialize = async () => {
  const { pageTitle } = toRefs(currentPage)
  handlePageEvents(pageTitle.value)
}

onMounted(() => {
  currentPage.pageTitle = route.name?.toString() || ''
  initialize()
})

// Methods / Actions
const formTitle = computed(() => {
  return !editedItem.value.id ? 'Agregar' : 'Editar'
})

const editItem = (item: PriceItem) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign(
    {},
    {
      id: item.id,
      name: item.name,
      price: item.price,
      stock: item.stock,
      companies: item.companies,
      file: item.file
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
    let { pageTitle } = toRefs(currentPage)
    let { id, price, type, file, companies, ...payload } = editedItem.value
    price = +price
    switch (pageTitle.value) {
      case 'costs':
        type = 'Costo'
        if (!id) {
          // Add new cost
          await cost.createCost({ price, type, ...payload })
          showSnackbar.value = true
          message.value = `¡Nuevo costo ${payload.name} fue agregado con exito!`
          color.value = 'orange-darken-2'
          close()
        } else {
          // Update cost
          await cost.updateCost(id, { ...payload, price, type })
          showSnackbar.value = true
          message.value = `¡Costo ${payload.name} fue actualizado con exito!`
          color.value = 'light-blue-darken-3'
          close()
        }
        break
      case 'services':
        type = 'Servicio'
        if (!id) {
          // Add new cost
          await service.createService({ price, type, ...payload })
          showSnackbar.value = true
          message.value = `¡Nuevo servicio ${payload.name} fue agregado con exito!`
          color.value = 'orange-darken-2'
          close()
        } else {
          // Update cost
          await service.updateService(id, { ...payload, price, type })
          showSnackbar.value = true
          message.value = `¡Servicio ${payload.name} fue actualizado con exito!`
          color.value = 'light-blue-darken-3'
          close()
        }
        break
      case 'products':
        type = 'Producto'
        if (!id) {
          // Add new product
          await product.createProduct(companies!, { price, type, ...payload }, file)
          showSnackbar.value = true
          message.value = `¡Nuevo producto ${payload.name} fue agregado con exito!`
          color.value = 'orange-darken-2'
          close()
        } else {
          await product.updateProduct(id, { price, type, ...payload }, companies!, file)
          showSnackbar.value = true
          message.value = `¡Producto ${payload.name} fue actualizado con exito!`
          color.value = 'light-blue-darken-3'
          close()
        }
        break
      default:
        break
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
