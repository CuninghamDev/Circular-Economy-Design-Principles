<template>
  <div class="container-fluid ma-0 pa-0" style="overflow-y:auto;">
    <div class="row ma-0 pa-0">
      <div class="col ma-0 pa-0">
        <!-- <CircularBarChart /> -->
        <CircularStackedBarChart />
      </div>
    </div>
    <div class="row ma-0 pa-0"></div>
  </div>
</template>

<script>
// import CircularBarChart from "../components/CircularBarChart.vue";
import CircularStackedBarChart from "../components/CircularStackedBarChart.vue";
export default {
  name: "EvaluationReport",
  components: {
    // CircularBarChart,
    CircularStackedBarChart
  },
  props: ["reportVmin"],
  data: () => ({})
};
</script>

<style></style>
