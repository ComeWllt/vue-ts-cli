<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">Map Example</h3>
    </v-card-title>
    <v-card-text>
      <gmap-map :center="site.position" :zoom="12" :options="options" style="width:100%;  height: 500px;">
        <gmap-marker :position="site.position"/>
      </gmap-map>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ExampleMap extends Vue {
  private site = { position: { lat: -33.8690244, lng: 151.2146834 } };
  private options = { disableDefaultUI: true, zoomControl: true };
}
</script>
