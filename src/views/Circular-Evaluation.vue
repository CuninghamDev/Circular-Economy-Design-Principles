<template>
  <div class="container-fluid m-0 ml-0 p-0 hide-scrollbar">
    <v-tabs v-model="currentTab" color="blue accent-4">
      <v-tab v-for="(d, i) in tabData" :key="i">{{ d }}</v-tab>
    </v-tabs>
    <div class="row m-0 p-0">
      <div class="col-lg-8 m-0 p-0 border-top">
        <CircularEconomyDiagram :svgContainerVmin="88" v-if="currentTab == 0" />
      </div>
    </div>
    <div class="col m-0 p-0"></div>
  </div>
</template>

<script>
import CircularEconomyDiagram from "../components/CircularEconomyDiagram.vue";
export default {
  name: "CircularEvaluation",
  components: { CircularEconomyDiagram },
  data: () => ({
    tabData: ["Diagram", "Evaluation Report"],
    currentTab: 0
  })
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
