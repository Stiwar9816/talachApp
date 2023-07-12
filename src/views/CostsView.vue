<template>
  <div>
    <h1>Costos Fijos</h1>
    <TableCrudPrices
      :fields="storeCosts.fields"
      :items="storeCosts.items"
      page="Costos"
      :show-button="extractRoleFromToken(token)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import TableCrudPrices from '@/components/tables/TableCrudPrices.vue'
import { useCostsStore } from '@/stores'
import { extractRoleFromToken } from '@/utils/extractRoleToken'
const storeCosts = useCostsStore()
const token = localStorage.getItem('token')

onMounted(() => {
  extractRoleFromToken(token)
})
</script>
