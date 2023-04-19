<template>
  <div>
    <v-row>
      <v-col md="3"></v-col>
      <v-col cols="12" md="6">
        <form class="mt-5">
          <v-text-field
            v-model="state.name"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            label="Nombre"
            required
            variant="underlined"
            @input="v$.name.$touch"
            @blur="v$.name.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            label="Correo electronico"
            required
            variant="underlined"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
          ></v-text-field>

          <v-text-field
            class="mb-3"
            v-model="state.phone"
            :error-messages="v$.phone.$errors.map((e) => e.$message)"
            label="Teléfono"
            type="number"
            min="0"
            max="10"
            :counter="10"
            required
            variant="underlined"
            @input="v$.phone.$touch"
            @blur="v$.phone.$touch"
          ></v-text-field>

          <v-btn class="me-4" @click="clear" color="grey-lighten-1" variant="flat">
            Cancelar
          </v-btn>
          <v-btn @click="v$.$validate" color="orange-darken-3" variant="flat"> Guardar </v-btn>
        </form>
      </v-col>
      <v-col md="3"></v-col>
    </v-row>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, maxLength, helpers } from '@vuelidate/validators'

export default {
  setup() {
    const initialState = {
      name: '',
      email: '',
      phone: ''
    }

    const state = reactive({
      ...initialState
    })

    const rules = {
      name: { required: helpers.withMessage('El campo nombre es requerido', required) },
      email: {
        required: helpers.withMessage('El campo correo electronico es requerido', required),
        email: helpers.withMessage('El texto ingresado no es correo electronico valido', email)
      },
      phone: {
        required: helpers.withMessage('El campo teléfono es requerido', required),
        maxLengthValue: helpers.withMessage('Este campo admite máximo 10 caracteres', maxLength(10))
      }
    }

    const v$ = useVuelidate(rules, state)

    function clear() {
      v$.value.$reset()

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value
      }
    }

    return { state, clear, v$ }
  }
}
</script>
