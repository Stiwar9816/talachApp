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
          <Marker
            :options="{
              position: marker.position,
              icon: getMarkerIcon(marker.label),
              title: marker.title
            }"
          />
        </template>
      </MarkerCluster>
    </GoogleMap>
    <Alert
      :snackbar-model="showSnackbar"
      :color="color"
      :message="message"
      @close="handleSnackbarClose"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// Google Maps
import { GoogleMap, Polygon, Marker, MarkerCluster } from 'vue3-google-map'
// Utils
import { getMarkerIcon } from '@/utils'
// Store
import { useMapsStore } from '@/stores'
// Components
import Alert from '@/components/alerts/Alert.vue'
// Initialization Store
const storeMaps = useMapsStore()
// Alerts
const showSnackbar = ref(false)
const color = ref('')
const message = ref('')
const handleSnackbarClose = () => {
  showSnackbar.value = false
}

const initialize = async () => {
  try {
    Promise.all([storeMaps.allLocations(), storeMaps.allGeofences()])
  } catch (error: any) {
    showSnackbar.value = true
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
