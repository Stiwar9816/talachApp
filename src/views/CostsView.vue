<template>
  <div>
    <h1>Costos Fijos</h1>
    <TableCrudPrices
      :fields="storeCosts.fields"
      :items="storeCosts.items"
      page="Costos"
      :show-button="role"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import TableCrudPrices from '@/components/tables/TableCrudPrices.vue'
// Store
import { useCostsStore } from '@/stores'
// Initialization Store
const storeCosts = useCostsStore()

const userRole = localStorage.getItem('role')

const role = userRole === 'superAdmin'
</script>
