<template>
  <div class="login">
    <v-row no-gutters>
      <v-col cols="12">
        <v-sheet
          color="orange-accent-1"
          rounded="lg"
          width="380"
          elevation="18"
          class="mx-auto pa-6"
        >
          <form @submit.prevent="handleLogin">
            <v-img
              src="/images/logo-talachapp.webp"
              alt="Logo TalachAPP"
              height="140"
              class="mb-3"
            />
            <v-text-field
              v-model="state.email"
              label="Correo electronico"
              aria-label="Email"
              variant="underlined"
              prepend-icon="mdi-email"
              required
              clearable
              @input="v$.email.$touch"
              @blur="v$.email.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.password"
              label="Contraseña"
              id="current-password"
              aria-label="current-password"
              autocomplete="false"
              variant="underlined"
              prepend-icon="mdi-lock"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              required
              clearable
              @input="v$.password.$touch"
              @blur="v$.password.$touch"
            ></v-text-field>

            <v-btn
              type="submit"
              block
              variant="flat"
              color="orange-accent-4"
              rounded="lg"
              size="large"
              class="my-3"
              @click="v$.$validate"
            >
              Iniciar Sesión
            </v-btn>
            <router-link class="reset" to="/reset-password"
              >¿Has olvidado la contraseña? - Click Aquí</router-link
            >
          </form>
        </v-sheet>
      </v-col>
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

<script setup lang="ts">
import { onBeforeUnmount, reactive, ref } from 'vue'
// Router
import router from '@/router'
// Validators
import { email, required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
// Stores
import { useAuthStore, useErrorsStore } from '@/stores'

// Interface
import type { SigninInput } from '@/interface'
// Alerts
let show1 = ref(false)
const showSnackbar = ref(false)
const color = ref('')
const message = ref('')

const initialState: SigninInput = {
  email: '',
  password: ''
}

const state = reactive({
  ...initialState
})

const rules = {
  email: {
    required: helpers.withMessage('El campo correo electronico es requerido', required),
    email: helpers.withMessage('El texto ingresado no es correo electronico valido', email)
  },
  password: {
    required: helpers.withMessage('El campo contraseña es requerido', required)
  }
}

const v$ = useVuelidate(rules, state)
const errors = useErrorsStore()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    const signinInput: SigninInput = {
      email: state.email,
      password: state.password
    }
    await authStore.login(signinInput)
    router.push({ name: 'home' })
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
    errors.$reset()
  }
}
onBeforeUnmount(() => errors.$reset())
</script>

<style>
.login {
  background: rgb(239, 108, 0);
  background: linear-gradient(
    190deg,
    rgba(239, 108, 0, 0.9317926999901524) 36%,
    rgba(255, 167, 38, 1) 85%
  );
  height: 100vh;
  display: grid;
  place-items: center;
}

.reset {
  display: grid;
  place-items: center;
  color: #000;
  text-decoration: none;
  &:hover {
    color: #8d4610;
    text-decoration: underline;
  }
}
</style>
