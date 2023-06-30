<template>
  <div>
    <h1>Inicio</h1>
    <v-row class="mt-4">
      <!-- Card Payments -->
      <v-col cols="12" md="6">
        <CardHome
          title="Pedidos realizados"
          description="Pedidos realizados esta semana:"
          :value="ordersStore.count"
          text-button="Ver Pedidos"
          route="/orders"
          bg-card="orange-accent-4"
          bg-button="grey-darken-4"
          :show-currency="true"
        />
      </v-col>
      <!-- Card Payments -->
      <!-- Card Inventory -->
      <v-col cols="12" md="6">
        <CardHome
          title="Inventarios"
          description="Talacheros con inventario bajo:"
          :value="invetoryStore.count"
          text-button="Ver Inventario"
          route="/inventory"
          bg-card="blue-darken-4"
          bg-button="grey-darken-4"
          :show-inventory="true"
        />
        <!-- Card Inventory -->
      </v-col>
      <!-- Map -->
      <v-col cols="12">
        <Maps />
      </v-col>
      <!-- Map -->
    </v-row>
  </div>
</template>

<script setup lang="ts">
import CardHome from '@/components/cards/CardHome.vue'
import Maps from '@/components/maps/Maps.vue'

import { useOrdersStore, useInventoryStore } from '@/stores'
const ordersStore = useOrdersStore()
const invetoryStore = useInventoryStore()

</script>
