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
            <!-- Modal Reset Password -->
            <FormUpdatePasswordAuth class="mx-2" />
            <!-- Modal Reset Password -->
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
                          v-model="editedItem.fullName"
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
                      <v-col cols="12" sm="12" md="12">
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
                        <v-select
                          v-model="editedItem.roles"
                          label="Rol"
                          :rules="requiredValue"
                          :items="roles"
                          variant="underlined"
                          density="comfortable"
                          type="text"
                          clearable
                          required
                        ></v-select>
                      </v-col>
                      <template v-if="editedItem.roles === 'Trabajador'">
                        <v-col cols="12" sm="12" md="12">
                          <v-select
                            v-model="editedItem.idCompany"
                            label="Centro talachero"
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
        <template v-slot:item.actions="{ item }">
          <v-icon size="large" class="my-1" color="blue-accent-3" @click="editItem(item.raw)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:no-data>
          <p class="pa-5">No hay registros que coincidan con su busqueda!</p>
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
import type { DataTableHeader, UserItem } from '@/interface'
// Stores
import { useCompanyStore, useUserStore } from '@/stores'
// Utils
import { subscribeToUsers, supabase } from '@/utils'
// Components
import FormUpdatePasswordAuth from '@/components/forms/FormUpdatePasswordAuth.vue'
// Props
const props = defineProps({
  fields: Array as () => DeepReadonly<DataTableHeader[] | DataTableHeader[][]> | undefined,
  items: Array<UserItem[]>
})
// Const
const dialog = ref<boolean>(false)
const search = ref<string>('')
const perPage = ref<number>(5)
const data = ref<UserItem[]>([])
const editedIndex = ref(-1)
const editedItem = ref<UserItem>({
  fullName: '',
  phone: 0,
  email: '',
  roles: '',
  isActive: '',
  rfc: '',
  idCompany: null
})
const defaultItem = ref<UserItem>({
  fullName: '',
  phone: 0,
  email: '',
  roles: '',
  isActive: '',
  rfc: '',
  idCompany: null
})
const roles: string[] = ['Administrador', 'Talachero', 'Trabajador', 'Usuario']

// Alerts
const showSnackbar = ref(false)
const color = ref('')
const message = ref('')

// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])
const emailRules = ref([
  (v: String) => !!v || 'El valor del campo es requerido',
  (v: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v
    ) || 'Correo electronico no es valido, Verifiquelo nuevamente'
])

const user = useUserStore()
const company = useCompanyStore()

const initialize = async () => {
  try {
    await Promise.all([
      company.allCompanies(),
      company.subscribeToCompanies(),
      user.allUsers(),
      subscribeToUsers(user.$state.items)
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
  return !editedItem.value.id ? 'Agregar Usuario' : 'Editar Usuario'
})

const editItem = (item: UserItem) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign(
    {},
    {
      id: item.id,
      fullName: item.fullName,
      phone: item.phone,
      email: item.email,
      roles: item.roles,
      isActive: item.isActive,
      rfc: item.rfc,
      idCompany: item.idCompany
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
    let { id, phone, isActive, idCompany, ...rest } = editedItem.value
    // phone = +phone
    if (!id) {
      // Add new user
      await user.createUser({ phone, ...rest }, idCompany)
      showSnackbar.value = true
      message.value = `¡Nuevo usuario ${rest.fullName} fue agregado con exito!`
      color.value = 'orange-darken-2'
      close()
    } else {
      //Update user
      await user.updateUser(id, { phone, isActive, idCompany, ...rest })
      showSnackbar.value = true
      message.value = `¡Usuario ${rest.fullName} fue actualizado con exito!`
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
