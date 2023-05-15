<template>
  <div>
    <h1>Calificaciones</h1>
    <TableRating :fields="storeRatings.fields" :items="storeRatings.items" />
  </div>
</template>

<script setup lang="ts">
import TableRating from '@/components/tables/TableRating.vue'
// Store
import { useRatingsStore } from '@/stores/ratings'
// Initialization Store
const storeRatings = useRatingsStore()
</script>
