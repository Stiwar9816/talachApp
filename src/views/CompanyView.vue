<template>
  <div>
    <h1>Empresas</h1>
    <TableCrudCompany :fields="storeCompany.fields" :items="storeCompany.items" />
  </div>
</template>

<script setup lang="ts">
// Components
import TableCrudCompany from '@/components/tables/TableCrudCompany.vue'
// Store
import { useCompanyStore } from '@/stores/company'
// Initialization Store
const storeCompany = useCompanyStore()
</script>
