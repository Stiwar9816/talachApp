<template>
  <v-snackbar
    v-model="snackbarVisible"
    :timeout="3000"
    :color="props.color"
    rounded="pill"
    location="bottom right"
  >
    {{ props.message }}
  </v-snackbar>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: 'Message alert'
  },
  color: {
    type: String,
    default: 'grey-darken-1'
  },
  snackbarModel: {
    type: Boolean
  }
})

const snackbarVisible = ref(props.snackbarModel)

// Observa cambios en la prop snackbarModel
watch(
  () => props.snackbarModel,
  (newVal) => {
    snackbarVisible.value = newVal
  }
)

const emitCloseEvent = () => {
  snackbarVisible.value = false
}
</script>
