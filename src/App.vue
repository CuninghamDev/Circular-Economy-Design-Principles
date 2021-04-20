<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" absolute temporary>
      <v-app-bar-nav-icon
        class="ma-3 pa-4"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item class="prevent" active="false"> </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Circular Economy Toolkit</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        contain
        lazy-src="http://research.cuningham.com/space-planner/assets/cuningham_logo.png"
        src="http://research.cuningham.com/space-planner/assets/cuningham_logo.png"
        class="mt-1"
        max-height="50"
        max-width="150"
      ></v-img>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <div class="container-fluid m-0 p-0">
          <!-- <div> </div> -->
          <div class="row m-0 p-0">
            <div class=" col-lg-8 m-0 p-0">
              <circular-economy-diagram></circular-economy-diagram>
            </div>
            <div class="col m-0 p-0" style="">
              <actor-data></actor-data>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CircularEconomyDiagram from "./components/CircularEconomyDiagram.vue";
import ActorData from "./components/ActorData.vue";

export default {
  name: "App",
  components: { CircularEconomyDiagram, ActorData },
  mounted: function() {},
  methods: {
    testingMethod: function(testing) {
      console.log("testing", testing);
    }
  },
  data: function() {
    return {
      drawer: false
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.pointer {
  cursor: pointer;
}
.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
            supported by Chrome, Edge, Opera and Firefox */
}
</style>
