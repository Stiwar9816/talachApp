<template>
  <div>
    <v-card class="pl-5" variant="tonal" rounded="lg" :color="props.bgCard">
      <v-card-title>
        <h2 class="my-3 text-black font-weight-bold">{{ props.title }}</h2>
      </v-card-title>
      <v-card-text class="d-block">
        <div class="d-flex">
          <v-icon class="me-3" icon="mdi-cash-register" size="x-large" color="orange-darken-3" />
          <span class="text-h6 text-black mb-2">{{ props.description }}</span>
        </div>

        <span v-show="props.showCurrency" class="text-h5 text-black font-weight-bold"
          >{{ currencyFormatter('MXN', props.value) }} MXN</span
        >
        <span v-show="props.showInventory" class="text-h5 text-black font-weight-bold">
          {{ props.value }}</span
        >
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mt-n3 mb-3 font-weight-bold"
          :color="props.bgButton"
          variant="tonal"
          :to="props.route"
          rounded="lg"
          >{{ props.textButton }}</v-btn
        >
      </v-card-actions>
    </v-card>

    <Alert
      :snackbar-model="showSnackbar"
      :color="color"
      :message="message"
      @close="handleSnackbarClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useOrdersStore, useInventoryStore } from '@/stores'
import { currencyFormatter } from '../../utils/currencyFormatter'
// Components
import Alert from '@/components/alerts/Alert.vue'
// Stores Initialization
const ordersStore = useOrdersStore()
const invetoryStore = useInventoryStore()
// Alerts
const showSnackbar = ref(false)
const color = ref('')
const message = ref('')
const handleSnackbarClose = () => {
  showSnackbar.value = false
}

const initialize = async () => {
  try {
    const inventory = await invetoryStore.countLowInventory()
    const orders = await ordersStore.countPayment()
    return { inventory, orders }
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

onMounted(() => {
  initialize()
})

const props = defineProps({
  title: {
    type: String,
    default: 'Title card'
  },
  description: {
    type: String,
    default: 'description card'
  },
  value: {
    type: Number,
    required: true
  },
  textButton: {
    type: String,
    default: 'text button'
  },
  route: String,
  bgCard: String,
  bgButton: String,
  showCurrency: Boolean,
  showInventory: Boolean
})
</script>
