<template>
  <div>
    <h1>Usuarios</h1>
    <table-crud-user :fields="storeUser.fields" :items="storeUser.items" />
  </div>
</template>

<script setup lang="ts">
import TableCrudUser from '@/components/tables/TableCrudUser.vue'
// Store
import { useUserStore } from '@/stores/users'
// Initialization Store
const storeUser = useUserStore()
</script>
