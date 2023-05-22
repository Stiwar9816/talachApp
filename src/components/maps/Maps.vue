<template>
  <div>
    <GoogleMap
      :api-key="storeMaps.key"
      style="width: 100%; height: 400px"
      :center="storeMaps.center"
      :zoom="storeMaps.zoom"
    >
      <template v-for="polygon in storeMaps.myPolygons" :key="polygon">
        <Polygon :options="polygon" />
      </template>
      <MarkerCluster>
        <template v-for="marker in storeMaps.markers" :key="marker">
          <Marker :options="marker" />
        </template>
      </MarkerCluster>
    </GoogleMap>
  </div>
</template>

<script lang="ts" setup>
import { GoogleMap, Polygon, Marker, MarkerCluster } from 'vue3-google-map'
// Store
import { useMapsStore } from '@/stores/maps'
// Initialization Store
const storeMaps = useMapsStore()
</script>
