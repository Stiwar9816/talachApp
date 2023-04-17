<template>
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
    <!-- Text Field & Button -->
    <!-- Data Table -->
    <v-col cols="12">
      <v-data-table
        :headers="props.headers"
        :items="props.items"
        :search="search"
        :items-per-page="perPage"
        item-value="id"
        class="elevation-1 rounded-lg"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.columns.id }}</td>
            <td>{{ item.columns.user }}</td>
            <td>{{ item.columns.quality }}</td>
            <td>
              <v-rating
                v-model="item.columns.rating"
                color="amber"
                density="comfortable"
                readonly
              ></v-rating>
            </td>
            <td>{{ item.columns.date }}</td>
          </tr>
        </template>
        <template v-slot:no-data>
          <p class="pa-5">No hay registros que coincidan con su busqueda!</p>
        </template>
        <template v-slot:no-results> No hay datos!</template>
      </v-data-table>
    </v-col>
    <!-- Data Table -->
  </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// Const
const search = ref<String>('')
const perPage = ref<Number>(5)

const props = defineProps({
  headers: Object,
  items: Object
})
</script>
