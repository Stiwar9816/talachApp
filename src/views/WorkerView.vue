<template>
  <div>
    <h1>Trabajadores</h1>
    <TableCrudWorker :fields="storeWorker.fields" :items="storeWorker.items" />
  </div>
</template>

<script setup lang="ts">
// Components
import TableCrudWorker from '@/components/tables/TableCrudWorker.vue'
// Store
import { useWorkerStore } from '@/stores'
// Initialization Store
const storeWorker = useWorkerStore()
</script>
