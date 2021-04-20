<template>
  <v-container fluid>
    <div class="container-fluid m-0 p-0">
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
</template>

<script>
import CircularEconomyDiagram from "../components/CircularEconomyDiagram.vue";
import ActorData from "../components/ActorData.vue";
export default {
  name: "Diagram",
  components: { ActorData, CircularEconomyDiagram }
};
</script>
