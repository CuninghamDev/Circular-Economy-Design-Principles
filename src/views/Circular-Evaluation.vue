<template>
  <div class="container-fluid m-0 ml-0 p-0 hide-scrollbar">
    <v-tabs
      v-model="currentTab"
      color="blue accent-4"
      id="vuetify-tabs-for-evaluation"
    >
      <v-tab v-for="(d, i) in tabData" :key="i">{{ d }}</v-tab>
    </v-tabs>
    <div class="row m-0 p-0 border-top">
      <div class="col-lg-8 m-0 p-0 ">
        <CircularEconomyDiagram :svgContainerVmin="88" v-if="currentTab == 0" />
        <EvaluationReport v-if="currentTab == 1" :reportVmin="88" />
      </div>
      <div class="col-lg-4 m-0 p-0" style="height:88vmin">
        <EvaluationForm />
      </div>
    </div>
  </div>
</template>

<script>
import CircularEconomyDiagram from "../components/CircularEconomyDiagram.vue";
import EvaluationReport from "../components/EvaluationReport.vue";
import EvaluationForm from "../components/EvaluationForm.vue";
export default {
  name: "CircularEvaluation",
  components: { CircularEconomyDiagram, EvaluationReport, EvaluationForm },
  beforeMount() {
    this.$store.commit("buildEvaluationTracking");
  },
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