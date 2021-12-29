<template>
  <div
    class="container-fluid ml-0 px-2 no-select"
    style="overflow-y:auto;height:100%"
  >
    <div class="row mt-0">
      <div class="col h5">
        Evaluate Your Project's Circularity
      </div>
    </div>
    <div class="row mt-0">
      <div class="col roboto">
        This is where a description of the evaluation will be included
      </div>
    </div>
    <div class="row mt-0">
      <div class="col roboto">
        Placeholder placeholder placeholder placeholder placeholder placeholder
        placeholder placeholder placeholder placeholder placeholder placeholder
        placeholder placeholder placeholder placeholder placeholder placeholder
        placeholder placeholder placeholder placeholder placeholder placeholder
        placeholder placeholder placeholder placeholder placeholder placeholder
        placeholder placeholder placeholder placeholder placeholder placeholder
        placeholder placeholder placeholder placeholder placeholder
      </div>
    </div>
    <div class="row mb-0">
      <div class="col h5">
        Select The Strategies That Apply To Your Project
      </div>
    </div>
    <div
      class="row ma-0 pa-0 mb-2 pointer elevation-1"
      v-for="d in evalActors"
      :key="d.actor"
      :style="calculateEvalCellStyle(d)"
      @click="actorEvalSelected(d)"
      @mouseenter="
        'rotate diagram';


      "
    >
      <div class="col px-0 py-2">
        <div class="container-fluid ma-0 pa-0 px-3">
          <div class="row ma-0 pa-0 mb-4">
            <div class="col h6 ma-0 pa-0 no-select">
              {{ d.actor }}
            </div>
          </div>
          <div class="row ma-0 pa-0 mb-2">
            <div class="col-xl-2 col-lg-3 col-3 h6 ma-0 pa-0 text-center">
              <!-- <v-checkbox
                class=""
                v-model="d.evalSelected"
                :color="d.color"
                @click="actorEvalSelected(d)"
              /> -->
              <v-btn
                fab
                small
                :outlined="d.evalSelected ? false : true"
                :color="d.evalSelected ? d.color : 'grey'"
                :dark="d.evalSelected ? true : false"
                elevation="0"
                v-blur
                ><div class="h3 mt-1">{{ d.evalPoints }}</div></v-btn
              >
            </div>
            <div class="col-xl-10 col-lg-9 col-9 ma-0 pa-0">
              <div class="container-fluid ma-0 pa-0">
                <div class="row ma-0 pa-0">
                  <div class="col ma-0 pa-0 no-select">
                    {{ d.eval }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "EvaluationForm",

  props: ["containerVmin"],
  computed: {
    ...mapGetters(["getActorsForEvaluation"]),
    ...mapState(["categories"]),
    evalActors() {
      let actorCopy = this.getActorsForEvaluation.filter(
        d => d.actor != undefined
      );
      for (let actor of actorCopy) {
        let categoryColor = "lightgrey";
        for (let category of this.categories) {
          if (category.text == actor.category) {
            categoryColor = category.color;
          }
        }
        actor.color = categoryColor;
      }
      return actorCopy;
    }
  },
  data: () => ({}),
  methods: {
    calculateEvalCellStyle(actorData) {
      let styleObj = {};
      styleObj.borderStyle = "solid";
      styleObj.borderWidth = "1px 1px 5px 10px";
      styleObj.borderColor = "lightgrey";
      styleObj.borderRadius = "0px 15px 0px 60px";
      let categoryColor = "lightgrey";
      if (actorData.evalSelected) {
        styleObj.borderColor =
          "lightgrey lightgrey " + actorData.color + " " + actorData.color;
      }
      return styleObj;
    },
    actorEvalSelected(actorData) {
      this.$store.commit("actorEvalSelected", actorData);
    }
  }
};
</script>

<style>
.no-select {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
</style>
