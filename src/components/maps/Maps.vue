<template>
  <div>
    <GoogleMap
      :api-key="storeMaps.key"
      style="width: 100%; height: 400px"
      :center="storeMaps.center"
      :zoom="storeMaps.zoom"
    >
      <template v-for="(polygon, i) in storeMaps.myPolygons" :key="i">
        <Polygon :options="polygon" />
      </template>
      <MarkerCluster>
        <template v-for="(marker, i) in storeMaps.markers" :key="i">
          <Marker :options="marker" />
        </template>
      </MarkerCluster>
    </GoogleMap>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      :color="color"
      rounded="pill"
      location="bottom right"
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { GoogleMap, Polygon, Marker, MarkerCluster } from 'vue3-google-map'
// Store
import { useMapsStore } from '@/stores'
// Initialization Store
const storeMaps = useMapsStore()
// Alerts
const snackbar = ref(false)
const color = ref('')
const message = ref('')

const initialize = async () => {
  try {
    Promise.all([storeMaps.allLocations(), storeMaps.allGeofences()])
  } catch (error: any) {
    snackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

onMounted(() => {
  initialize()
})
</script>

<style>
.mapdiv {
  border-radius: 10px;
}
</style>
