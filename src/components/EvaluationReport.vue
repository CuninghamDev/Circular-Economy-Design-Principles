<template>
  <div class="container-fluid ma-0 pa-0" style="overflow-y:auto;">
    <div class="row ma-0 pa-0">
      <div class="col ma-0 pa-0">
        <CircularBarChart />
      </div>
    </div>
    <div class="row ma-0 pa-0"></div>
  </div>
</template>

<script>
import CircularBarChart from "../components/CircularBarChart.vue";
export default {
  name: "EvaluationReport",
  components: { CircularBarChart },
  props: ["reportVmin"],
  data: () => ({})
};
</script>

<style></style>
