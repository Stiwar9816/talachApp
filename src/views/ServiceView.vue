<template>
  <div>
    <h1>Servicios</h1>
    <TableCrudPrices
      :fields="storeService.fields"
      :items="storeService.items"
      page="Servicio"
      :show-button="role"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import TableCrudPrices from '@/components/tables/TableCrudPrices.vue'
// Store
import { useServiceStore } from '@/stores'
// Initialization Store
const storeService = useServiceStore()

const userRole = localStorage.getItem('role')

const role = userRole === 'superAdmin'
</script>
