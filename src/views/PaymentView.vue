<template>
  <div>
    <h1>Pagos</h1>
    <TableDefault :items="storePayment.items" :fields="storePayment.fields" />
  </div>
</template>

<script setup lang="ts">
import TableDefault from '@/components/tables/TableDefault.vue'
// Store
import { usePaymentStore } from '@/stores'
// Initialization Store
const storePayment = usePaymentStore()
</script>
