<template>
  <div>
    <v-row>
      <v-col md="3"></v-col>
      <v-col cols="12" md="6">
        <form class="mt-5">
          <v-text-field
            v-model="state.name"
            label="Nombre"
            required
            variant="underlined"
            @input="v$.name.$touch"
            @blur="v$.name.$touch"
          ></v-text-field>

          <v-text-field
            v-model="state.email"
            label="Correo electrónico"
            required
            variant="underlined"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
          ></v-text-field>

          <v-text-field
            class="mb-3"
            v-model="state.phone"
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
          <v-btn @click="v$.$validate" color="orange-darken-3" variant="flat">Guardar</v-btn>
        </form>
      </v-col>
      <v-col md="3"></v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { rules } from '@/utils'

const initialState = {
  name: '',
  email: '',
  phone: ''
}

const state: {
  name: string
  email: string
  phone: string
} = reactive({
  ...initialState
})

// Validations
const v$ = useVuelidate(rules, state)

function clear() {
  v$.value.$reset()

  for (const [key, value] of Object.entries<string>(initialState)) {
    state[key as keyof typeof state] = value
  }
}
</script>
