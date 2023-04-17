<template>
  <div>
    <v-row no-gutters>
      <!-- Text Field & Button -->
      <v-col cols="12" md="4">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          v-model="search"
          class="mt-4"
          label="Buscar"
          type="text"
          clearable
          density="compact"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-spacer />
      <v-btn
        prepend-icon="mdi-google-spreadsheet"
        variant="flat"
        color="grey-lighten-2"
        rounded="lg"
        class="mt-4"
      >
        <template v-slot:prepend>
          <v-icon color="success"></v-icon>
        </template>
        Exportar Excel
      </v-btn>
      <!-- Text Field & Button -->
      <!-- DataTable -->
      <v-col cols="12">
        <v-data-table
          :headers="props.fields"
          :items="props.items"
          :search="search"
          :items-per-page="perPage"
          class="elevation-1 mt-3 rounded-lg"
        >
          <template v-slot:no-data>
            <p class="pa-5">No hay registros que coincidan con su busqueda!</p>
          </template>
          <template v-slot:no-results> No hay datos!</template>
        </v-data-table>
      </v-col>
      <!-- DataTable -->
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// Const
const search = ref<String>('')
const perPage = ref<Number>(5)
// Props
const props = defineProps({
  fields: Object,
  items: Object
})
</script>
