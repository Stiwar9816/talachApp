<template>
  <v-snackbar
    v-model="props.snackbar"
    :timeout="3000"
    :color="props.color"
    rounded="pill"
    location="bottom right"
  >
    {{ props.message }}
  </v-snackbar>
</template>

<script lang="ts" setup>
const props = defineProps({
  message: {
    type: String,
    default: 'Message alert'
  },
  color: {
    type: String,
    default: 'grey-darken-1'
  },
  snackbar: {
    type: Boolean,
    default: false
  }
})
</script>
