<template>
  <div class="login">
    <v-row no-gutters>
      <v-col cols="12">
        <v-sheet
          color="orange-accent-1"
          rounded="lg"
          height="420"
          width="400"
          elevation="18"
          class="mx-auto pa-6"
        >
          <form>
            <v-img src="/images/logo-talachApp.png" height="140" class="mb-3" />
            <v-text-field
              v-model="state.email"
              :error-messages="v$.email.$errors.map((e) => e.$message)"
              label="Correo electronico"
              variant="underlined"
              prepend-icon="mdi-email"
              required
              clearable
              @input="v$.email.$touch"
              @blur="v$.email.$touch"
            ></v-text-field>

            <v-text-field
              v-model="state.password"
              :error-messages="v$.password.$errors.map((e) => e.$message)"
              label="Contraseña"
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
              block
              variant="flat"
              color="orange-accent-4"
              rounded="lg"
              size="large"
              class="mt-4"
              to="home"
              @click="v$.$validate"
            >
              Iniciar Sesión
            </v-btn>
          </form>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, helpers } from '@vuelidate/validators'

export default {
  data() {
    return {
      show1: false
    }
  },
  setup() {
    const initialState = {
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

    return { state, v$ }
  }
}
</script>

<style>
.login {
  background-image: url('/images/bg-login.png');
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>
