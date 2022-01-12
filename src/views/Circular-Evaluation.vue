<template>
  <div class="container-fluid m-0 ml-0 p-0 hide-scrollbar">
    <v-tabs
      v-model="currentTab"
      color="blue accent-4"
      id="vuetify-tabs-for-evaluation"
      @change="resetCategory()"
    >
      <v-tab v-for="(d, i) in tabData" :key="i">{{ d }}</v-tab>
    </v-tabs>
    <div class="row m-0 p-0 border-top">
      <div
        class="col-lg-8 col-xl-6 m-0 p-0 "
        :style="'height: ' + heightVmin + 'vh'"
      >
        <CircularEconomyDiagram
          :svgContainerVmin="88"
          :titleClickable="false"
          v-if="currentTab == 0"
        />
        <EvaluationReport v-if="currentTab == 1" :reportVmin="88" />
      </div>
      <div
        class="col-lg-4 col-xl-6 m-0 p-0"
        :style="'height: ' + heightVmin + 'vh'"
      >
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
    this.$store.commit("setState", { key: "categorySelected", val: false });
  },
  mounted() {
    this.calcContentHeight();
    window.addEventListener("resize", this.calcContentHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calcContentHeight);
  },
  data: () => ({
    tabData: ["Diagram", "Evaluation Report"],
    currentTab: 0,
    heightVmin: 100
  }),
  methods: {
    resetCategory() {
      console.log("reset category called");
      this.$store.commit("selectCategory", {
        toggle: false,
        isSource: true,
        data: undefined,
        sourceType: "parent"
      });
    },
    calcContentHeight() {
      let windowHeight = window.innerHeight;
      let appBarheight = document.getElementById("vuetify-application-bar")
        .clientHeight;
      let tabsHeight = document.getElementById("vuetify-tabs-for-evaluation")
        .clientHeight;
      let remainderHeight = windowHeight - appBarheight - tabsHeight;
      let heightRatio = (remainderHeight / windowHeight) * 100;
      this.heightVmin = heightRatio;
    }
  }
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
