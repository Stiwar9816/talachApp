<template>
  <div class="orange-accent-3">
    <v-app-bar color="orange-darken-3" elevation="0" flat app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="storeLayout.drawer = !storeLayout.drawer" />
        <v-img class="ml-n4" width="170" src="/images/logo-talachapp.webp" alt="Logo" />
      </template>
      <v-spacer />
      <span class="pa-5 font-weight-bold"> Bienvenido {{ storeLayout.nameProfile }} </span>
    </v-app-bar>
  </div>
</template>

<script lang="ts" setup>
// Store
import { useLayoutStore } from '@/stores/layout'
// Initialization
const storeLayout = useLayoutStore()
</script>
