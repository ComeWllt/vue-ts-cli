<template>
  <v-container fluid grid-list-lg text-md-center>
    <v-layout row wrap>
      <v-flex xs12>
        <ExampleComponent/>
      </v-flex>
      <!-- GOOGLEMAPS_START -->
      <v-flex xs12 md6>
        <ExampleMap/>
      </v-flex>
      <!-- GOOGLEMAPS_END -->
      <!-- ECHARTS_START -->
      <v-flex xs12 md6>
        <ExampleGraph/>
      </v-flex>
      <!-- ECHARTS_END -->
    </v-layout>
    <BackButton/>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BackButton from '@/components/BackButton.vue';
import ExampleComponent from '@/components/examples/ExampleComponent.vue';
// <!-- GOOGLEMAPS_START -->
import ExampleMap from '@/components/examples/ExampleMap.vue';
// <!-- GOOGLEMAPS_END -->
// <!-- ECHARTS_START -->
import ExampleGraph from '@/components/examples/ExampleGraph.vue';
// <!-- ECHARTS_END -->

@Component({
  components: {
    BackButton,
    ExampleComponent,
    // <!-- GOOGLEMAPS_START -->
    ExampleMap,
    // <!-- GOOGLEMAPS_END -->
    // <!-- ECHARTS_START -->
    ExampleGraph,
    // <!-- ECHARTS_END -->
  },
})
export default class ExampleView extends Vue {}
</script>

<style scoped>
</style>
