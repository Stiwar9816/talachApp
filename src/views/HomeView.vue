<template>
  <div>
    <h1>Inicio</h1>
    <v-row class="mt-4">
      <!-- Card Payments -->
      <v-col cols="12" md="6">
        <CardHome
          title="Pagos realizados"
          description="Pagos realizados esta semana:"
          value="$ 0.00 MXN"
          text-button="Ver Pagos"
          route="/payment"
          bg-card="orange-accent-4"
          bg-button="grey-darken-4"
        />
      </v-col>
      <!-- Card Payments -->
      <!-- Card Inventory -->
      <v-col cols="12" md="6">
        <CardHome
          title="Inventarios"
          description="Talacheros con inventario bajo:"
          value="15"
          text-button="Ver Inventario"
          route="/inventory"
          bg-card="blue-darken-4"
          bg-button="grey-darken-4"
        />
        <!-- Card Inventory -->
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import CardHome from '@/components/cards/CardHome.vue'
</script>
