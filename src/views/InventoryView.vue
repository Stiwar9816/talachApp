<template>
  <div>
    <h1>Inventario</h1>
    <table-crud-inventory :fields="storeInventory.fields" :items="storeInventory.items" />
  </div>
</template>

<script setup lang="ts">
import TableCrudInventory from '../components/tables/TableCrudInventory.vue'
// Store
import { useInventoryStore } from '@/stores/inventory'
// Initialization Store
const storeInventory = useInventoryStore()
</script>
