<template>
  <div>
    <h1>Productos</h1>
    <TableCrudPrices :fields="storeProduct.fields" :items="storeProduct.items" page="Producto" />
  </div>
</template>

<script setup lang="ts">
// Components
import TableCrudPrices from '@/components/tables/TableCrudPrices.vue'
// Store
import { useProductStore } from '@/stores'
// Initialization Store
const storeProduct = useProductStore()
</script>
