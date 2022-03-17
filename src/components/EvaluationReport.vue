<template>
  <div class="container-fluid ma-0 pa-0" style="overflow-y:auto;">
    <div class="row ma-0 ml-2 pa-0">
      <div class="col-xl-9 mb-0 pb-0">
        <input
          id="project-name-input"
          class="h4 invisible-form w-100"
          :value="projectName"
          @input="updateProjectName($event)"
        />
      </div>
    </div>
    <div class="row ma-0 pa-0">
      <div class="col-xl-9 col-lg-12 col-sm-8 ma-0 pa-0">
        <!-- <CircularBarChart /> -->
        <CircularStackedBarChart />
      </div>
      <div class="col-xl-3 ma-0 pa-0">
        <CircularStackedBarChartSummary />
      </div>
    </div>
    <div class="row ma-0 pa-0 mb-10"></div>
  </div>
</template>

<script>
// import CircularBarChart from "../components/CircularBarChart.vue";
import CircularStackedBarChart from "../components/CircularStackedBarChart.vue";
import CircularStackedBarChartSummary from "../components/CircularStackedBarChartSummary.vue";
import { mapState } from "vuex";
export default {
  name: "EvaluationReport",
  components: {
    // CircularBarChart,
    CircularStackedBarChart,
    CircularStackedBarChartSummary
  },
  props: ["reportVmin"],
  computed: {
    ...mapState(["projectName"])
  },
  data: () => ({}),
  methods: {
    updateProjectName(e) {
      this.$store.commit("setState", {
        key: "projectName",
        val: e.target.value
      });
    }
  }
};
</script>

<style>
.invisible-form {
  border: none;
  cursor: pointer;
  height: 40px;
}
</style>
