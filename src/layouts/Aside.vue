<template>
  <v-navigation-drawer
    app
    flat
    permanent
    color="grey-lighten-5"
    v-model="storeLayout.drawer"
    :rail="storeLayout.rail"
    @click="storeLayout.rail = true"
  >
    <v-list nav>
      <v-list-item :prepend-icon="storeLayout.imageProfile">
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="storeLayout.rail = !storeLayout.rail"
          ></v-btn>
        </template>
        {{ storeLayout.nameProfile }}
        <v-tooltip activator="parent" location="end">{{ storeLayout.nameProfile }}</v-tooltip>
      </v-list-item>
      <v-divider />
      <v-list-item prepend-icon="mdi-card-account-details" to="/profile">
        Perfil
        <v-tooltip activator="parent" location="end">Perfil</v-tooltip>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="item in storeLayout.routes"
        :key="item.name"
        :prepend-icon="item.icon"
        :value="item.name"
        :to="item.route"
      >
        {{ item.name }}
        <v-tooltip activator="parent" location="end">{{ item.name }}</v-tooltip>
      </v-list-item>
      <v-menu transition="slide-x-transition" location="end">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-currency-usd"
            append-icon="mdi-chevron-right"
          >
            Precios
            <v-tooltip activator="parent" location="end">Precios</v-tooltip>
          </v-list-item>
        </template>
        <v-list class="bg-grey-lighten-5" rounded max-width="190">
          <v-list-item
            v-for="(item, index) in storeLayout.prices"
            :key="index"
            :title="item.name"
            :value="item.name"
            :prepend-icon="item.icon"
            :to="item.route"
          >
            <v-tooltip activator="parent" location="end">{{ item.name }}</v-tooltip>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-list-item prepend-icon="mdi-power-cycle" value="Login" @click="logout">
        <template v-slot:prepend>
          <v-icon color="orange-darken-4" icon="mdi-power"></v-icon>
        </template>
        Cerrar Sesión
        <v-tooltip activator="parent" location="end">Cerrar Sesión</v-tooltip>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
// Store
import { useLayoutStore } from '@/stores/layout'
import { useAuthStore } from '@/stores/useAuth'
import { computed } from 'vue'
// Initialization
const storeLayout = useLayoutStore()

const authStore = useAuthStore()
const isAuthenticated = computed(() => !!authStore.token)

const logout = () => {
  return authStore.logout()
}
</script>
