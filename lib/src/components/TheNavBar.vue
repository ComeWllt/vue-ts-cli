<template>
  <div>
    <v-navigation-drawer v-model="drawer" :style="{'backgroundColor': '#050f31'}" dark absolute temporary>
      <v-list class="pa-1">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              Front-Template &nbsp;
              <span class="caption">{{ version }}</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider/>
        <v-list-tile @click="onRouteClick('')">
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="onRouteClick('example')">
          <v-list-tile-title>Example</v-list-tile-title>
        </v-list-tile>
        <!-- PATCHNOTES_START -->
        <v-list-tile @click="onRouteClick('patch-notes')">
          <v-list-tile-title>Patch Notes</v-list-tile-title>
        </v-list-tile>
        <!-- PATCHNOTES_END -->
        <!-- LOGIN_START -->
        <v-list-tile @click="logout">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
        <!-- LOGIN_END -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark>
      <v-toolbar-side-icon v-if="isLoggedIn" class="hidden-sm-and-up" @click.stop="drawer = !drawer"/>
      <v-toolbar-title>
        <span :style="{'cursor':'pointer'}" @click="onRouteClick('')">Front-Template</span>
        &nbsp;
        <span class="caption">{{ version }}</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items v-if="isLoggedIn" class="hidden-xs-only">
        <v-btn flat @click="onRouteClick('example')">Example</v-btn>
      </v-toolbar-items>
      <!-- PATCHNOTES_START -->
      <v-btn v-if="isLoggedIn" class="hidden-xs-only" icon @click="onRouteClick('patch-notes')">
        <v-icon>build</v-icon>
      </v-btn>
      <!-- PATCHNOTES_END -->
      <!-- LOGIN_START -->
      <v-btn v-if="isLoggedIn" class="hidden-xs-only" icon @click="logout">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
      <!-- LOGIN_END -->
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import pkg from '../../package.json';
// <!-- LOGIN_START -->
import { namespace } from 'vuex-class';
import { SIGN_OUT } from '@/store/constants/mutation-types';
// <!-- LOGIN_END -->

@Component
export default class TheNavBar extends Vue {
  private drawer: boolean = false;
  // <!-- LOGIN_START -->
  @namespace('LoginModule').State('isLoggedIn')
  private isLoggedIn!: boolean;
  @namespace('LoginModule').Mutation(SIGN_OUT)
  private logout!: () => void;
  // <!-- LOGIN_END -->

  private onRouteClick(route: string): void {
    this.$router.push(`/${route}`);
  }
  get version(): string {
    return pkg.version;
  }
}
</script>

<style scoped>
</style>
