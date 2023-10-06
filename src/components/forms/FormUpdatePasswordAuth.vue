<template>
  <div>
    <v-dialog v-model="dialog" width="400">
      <template v-slot:activator="{ props }">
        <v-btn
          prepend-icon="mdi-lock"
          variant="flat"
          color="grey-lighten-2"
          rounded="lg"
          class="my-2"
          v-bind="props"
        >
          <template v-slot:prepend>
            <v-icon color="orange-darken-4"></v-icon>
          </template>
          Cambiar contraseña
        </v-btn>
      </template>
      <v-card class="rounded-lg">
        <v-toolbar color="orange-darken-3">
          <v-card-title>
            <span class="text-h5">Cambio de contraseña</span>
          </v-card-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <form>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    label="Nueva Contraseña"
                    :rules="requiredValue"
                    :type="show ? 'text' : 'password'"
                    variant="underlined"
                    density="comfortable"
                    clearable
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="confPassword"
                    label="Confirmar nueva contraseña"
                    :rules="requiredValue"
                    :type="show ? 'text' : 'password'"
                    variant="underlined"
                    density="comfortable"
                    clearable
                    required
                  ></v-text-field>
                </v-col>
                <v-checkbox
                  v-model="show"
                  class="my-n5"
                  label="Mostrar Contraseña"
                  @click:append="show = !show"
                ></v-checkbox>
              </v-row>
            </form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-lighten-1" variant="flat" @click="close"> Cancelar </v-btn>
          <v-btn color="orange-darken-3" variant="flat" @click="save"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Alert
      :snackbar-model="showSnackbar"
      :color="color"
      :message="message"
      @close="handleSnackbarClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// Store
import { useAuthStore } from '@/stores'
// Store initialization
const authStore = useAuthStore()
// Components
import Alert from '@/components/alerts/Alert.vue'
// Const
let show = ref(false)
const dialog = ref(false)
const password = ref('')
const confPassword = ref('')
// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])
// Alerts
const showSnackbar = ref(false)
const color = ref('')
const message = ref('')
const handleSnackbarClose = () => {
  showSnackbar.value = false
}

//Methods
const close = () => {
  dialog.value = false
  password.value = ''
  confPassword.value = ''
}

const save = async () => {
  try {
    const token = sessionStorage.getItem('token')
    if (token) {
      const newPassword = password.value
      const confirmPassword = confPassword.value

      if (newPassword !== confirmPassword) throw new Error('Las contraseñas no coinciden')

      await authStore.updatePassword(newPassword)
      close()
    }
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
</script>
