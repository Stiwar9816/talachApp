<template>
  <div>
    <v-row no-gutters>
      <!-- Text Field & Button -->
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
      <!-- Text Field & Button -->
      <!-- Data Table -->
      <v-col cols="12">
        <v-data-table
          :headers="fields"
          :items="items"
          :search="search"
          :items-per-page="perPage"
          item-value="id"
          class="elevation-1 rounded-lg"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.columns.id }}</td>
              <td>{{ item.columns.user?.fullName }}</td>
              <td>{{ item.columns.quality }}</td>
              <td>
                <v-rating
                  v-model="item.columns.rank"
                  color="amber"
                  density="comfortable"
                  readonly
                ></v-rating>
              </td>
              <td>{{ item.columns.createdAt }}</td>
            </tr>
          </template>
          <template v-slot:no-data>
            <p class="pa-5">No hay registros que coincidan con su busqueda!</p>
          </template>
        </v-data-table>
      </v-col>
      <!-- Data Table -->
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
import { SUBSCRIBE_SCORE } from '@/gql/rating'
import apolloClient from '@/plugins/apollo'
import { useRatingsStore } from '@/stores'
import { onMounted, onUnmounted, ref } from 'vue'
// Const
const search = ref<String>('')
const perPage = ref<Number>(5)
// Alerts
const snackbar = ref(false)
const color = ref('')
const message = ref('')

const props = defineProps({
  fields: Object,
  items: Object
})

const ratingStore = useRatingsStore()

// Realiza la suscripción al iniciar el componente
const observableQuery = apolloClient.subscribe({
  query: SUBSCRIBE_SCORE
})

const subscription = observableQuery.subscribe({
  next({ data }) {
    const newRating = data.newScore
    // Actualiza el estado del store con la nueva calificación recibida
    ratingStore.items = [...ratingStore.items, newRating]
  },
  error(error) {
    // Maneja errores de suscripción
    console.log(error)
  }
})

const initialize = async () => {
  try {
    const result = await ratingStore.allRatings()
    return result
  } catch (error: any) {
    snackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
onMounted(() => {
  initialize()
})

// Cancela la suscripción al desmontar el componente
onUnmounted(() => {
  subscription.unsubscribe()
})
</script>
