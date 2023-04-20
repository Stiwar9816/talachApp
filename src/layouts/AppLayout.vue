<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const layout = computed(() => {
  const layout = useRoute().meta.layout
  return layout ? `${layout}Layout` : 'div'
})
</script>
