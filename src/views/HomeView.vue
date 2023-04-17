<template>
  <div>
    <h1>Inicio</h1>
    <v-row class="mt-4">
      <!-- Card Payments -->
      <v-col cols="12" md="6">
        <v-card class="pl-5" variant="tonal" rounded="lg" color="orange-accent-4">
          <v-card-title>
            <h1 class="text-h4 my-3 text-black font-weight-bold">Pagos realizados</h1>
          </v-card-title>
          <v-card-text class="d-block">
            <div class="d-flex">
              <v-icon
                class="me-3"
                icon="mdi-cash-register"
                size="x-large"
                color="orange-darken-3"
              />
              <P class="text-h6 text-black mb-2">Pagos realizados esta semana:</P>
            </div>
            <span class="text-h4 text-black font-weight-bold">$ 0.00 MXN</span>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="mt-n3 mb-3 font-weight-bold"
              color="grey-darken-4"
              variant="tonal"
              to="/payment"
              rounded="lg"
              >Ver Pagos</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <!-- Card Payments -->
      <!-- Card  -->
      <v-col cols="12" md="6">
        <v-card class="pl-5" variant="tonal" rounded="lg" color="blue-darken-4">
          <v-card-title>
            <h1 class="text-h4 my-3 text-black font-weight-bold">Inventarios</h1>
          </v-card-title>
          <v-card-text class="d-block">
            <div class="d-flex">
              <v-icon class="me-3" icon="mdi-cart" size="x-large" color="orange-darken-3" />
              <P class="text-h6 text-black mb-2">Talacheros con inventario bajo:</P>
            </div>
            <span class="text-h4 text-black font-weight-bold">15</span>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="mt-n3 mb-3 font-weight-bold"
              color="grey-darken-4"
              variant="tonal"
              rounded="lg"
              to="/inventory"
              >Ver Inventario</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts"></script>
