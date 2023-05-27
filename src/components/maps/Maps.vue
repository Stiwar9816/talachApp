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
  </div>
</template>

<script lang="ts" setup>
import { GoogleMap, Polygon, Marker, MarkerCluster } from 'vue3-google-map'
// Store
import { useMapsStore } from '@/stores'
import { onMounted } from 'vue'
// Initialization Store
const storeMaps = useMapsStore()

const initialize = async () => {
  try {
    await storeMaps.allLocations()
    await storeMaps.allGeofences()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  initialize()
})
</script>
