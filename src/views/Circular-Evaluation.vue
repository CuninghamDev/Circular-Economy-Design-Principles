<template>
  <div class="container-fluid m-0 ml-0 p-0 hide-scrollbar">
    <v-toolbar
      id="circular-evaluation-toolbar"
      elevation="1"
      color="grey lighten-3"
      dense
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            color="brown lighten-5"
            class="ml-0 pa-1 px-2 mr-2"
            style="min-width: 0"
          >
            <v-icon color="grey darken-2">mdi-content-save-outline</v-icon>
          </v-btn>
        </template>
        <span class="">Save file as JSON</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            color="brown lighten-5"
            class="ml-0 pa-1 px-2 mr-2"
            style="min-width: 0"
          >
            <v-icon color="grey darken-2">mdi-folder-open-outline</v-icon>
          </v-btn>
        </template>
        <span class="">Open JSON file</span>
      </v-tooltip>
    </v-toolbar>
    <v-tabs
      class="mt-1"
      v-model="currentTab"
      color="blue accent-4"
      id="vuetify-tabs-for-evaluation"
    >
      <v-tab v-for="(d, i) in tabData" :key="i">{{ d }}</v-tab>
    </v-tabs>
    <div class="row m-0 p-0 border-top">
      <div
        class="col-lg-8 col-xl-6 m-0 p-0 "
        :style="'height: ' + heightVmin + 'vh'"
      >
        <CircularEconomyDiagram
          class="ml-9"
          :svgContainerVmin="82"
          :titleClickable="false"
          v-if="currentTab == 0"
        />
        <EvaluationReport v-if="currentTab == 1" :reportVmin="82" />
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
    heightVmin: 100,
    additionalResourcesDialog: false
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
      let appbarHeight = document.getElementById("vuetify-application-bar")
        .clientHeight;
      let tabsHeight = document.getElementById("vuetify-tabs-for-evaluation")
        .clientHeight;
      let toolbarHeight = document.getElementById("circular-evaluation-toolbar")
        .clientHeight;
      let remainderHeight =
        windowHeight - appbarHeight - tabsHeight - toolbarHeight - 10;
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
