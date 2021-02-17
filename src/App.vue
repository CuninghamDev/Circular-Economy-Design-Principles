<template>
  <div id="app">
    <div class="container-fluid m-0 p-0">
      <!-- <div> </div> -->
      <div class="row m-0 p-0">
        <div class="col-sm-6 col-md-6 col-lg-8 m-0 p-0">
          <circular-economy-diagram></circular-economy-diagram>
        </div>
        <div class="col m-0 p-0" style="">
          <actor-data></actor-data>
        </div>
      </div>
    </div>
  </div>
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
      console.log("testing to see if I can get unused variables to be allowed");
      console.log("another change");
      console.log("yet another change");
      console.log("more changes");
      console.log("some more changes");
    }
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
