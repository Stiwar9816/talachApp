<template>
  <v-app>
    <Layout>
      <!-- Navbar -->
      <template v-slot:navbar>
        <navbar />
      </template>
      <!-- Navbar -->

      <!-- Aside Menu -->
      <template v-slot:asideMenu>
        <aside-menu />
      </template>
      <!-- Aside Menu -->

      <!-- Children  -->
      <template v-slot:default>
        <v-main>
          <v-container>
            <RouterView />
          </v-container>
        </v-main>
      </template>
      <!-- Children -->

      <!-- Footer -->
      <template v-slot:footer>
        <app-footer />
      </template>
      <!-- Footer -->
    </Layout>
  </v-app>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
// Layouts
import Layout from '@/layouts/Layout.vue'
import Navbar from '@/layouts/Navbar.vue'
import AsideMenu from '@/layouts/Aside.vue'
import AppFooter from '@/layouts/Footer.vue'
</script>
