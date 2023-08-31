<template>
  <div>
    <h1>Servicios</h1>
    <TableCrudPrices
      :fields="storeService.fields"
      :items="storeService.items"
      page="Servicio"
      :show-button="extractRoleFromToken(token)"
    />
  </div>
</template>

<script setup lang="ts">
// Components
import TableCrudPrices from '@/components/tables/TableCrudPrices.vue'
// Store
import { useServiceStore } from '@/stores'
import { extractRoleFromToken } from '@/utils'
import { onMounted } from 'vue';
// Initialization Store
const storeService = useServiceStore()

const token = sessionStorage.getItem('token')

onMounted(() => {
  extractRoleFromToken(token)
})
</script>
