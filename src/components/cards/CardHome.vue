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
        <span class="text-h5 text-black font-weight-bold">{{ props.value }}</span>
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
  </div>
</template>

<script lang="ts" setup>
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
    type: String || Number,
    default: 'value'
  },
  textButton: {
    type: String,
    default: 'text button'
  },
  route: String,
  bgCard: String,
  bgButton: String
})
</script>
