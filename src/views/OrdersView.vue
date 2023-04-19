<template>
  <div>
    <h1>Pedidos</h1>
    <TableDefault :fields="storeOrders.fields" :items="storeOrders.items" />
  </div>
</template>

<script setup lang="ts">
import TableDefault from '@/components/tables/TableDefault.vue'
// Store
import { useOrdersStore } from '@/stores/orders'
// Initialization Store
const storeOrders = useOrdersStore()
</script>
