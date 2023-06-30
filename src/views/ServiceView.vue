<template>
  <div>
    <h1>Servicios</h1>
    <TableCrudPrices :fields="storeService.fields" :items="storeService.items" page="Servicio" />
  </div>
</template>

<script setup lang="ts">
// Components
import TableCrudPrices from '@/components/tables/TableCrudPrices.vue'
// Store
import { useServiceStore } from '@/stores'
// Initialization Store
const storeService = useServiceStore()
</script>
