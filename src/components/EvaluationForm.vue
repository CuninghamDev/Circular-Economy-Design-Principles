<template>
  <div
    class="container-fluid ml-0 no-select"
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
    <v-expansion-panels v-model="openExpansionPanel">
      <v-expansion-panel
        v-for="(cat, i) in expansionPanelCategories"
        :key="i"
        @change="selectCategory(cat, i)"
      >
        <v-expansion-panel-header
          :color="cat.color"
          class="white--text"
          @click="$vuetify.goTo(getHeaderElement('#category-' + i))"
        >
          <v-container class="ma-0 pa-0">
            <v-row class="ma-0 pa-0">
              <v-col class="ma-0 pa-0">
                <h5 :id="'#category-' + i">
                  {{ cat.text }}
                </h5>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0">
              <v-col cols="12" lg="6" class="ma-0 pa-0 mt-1">
                {{ cat.stratSelected }}/{{ cat.stratTotal }} Strategies Selected
              </v-col>
              <v-col cols="12" lg="6" class="ma-0 pa-0 mt-1">
                {{ cat.stratPoints }}/{{ cat.stratPointsTotal }} Points
              </v-col>
            </v-row>
          </v-container>

          <template v-slot:actions>
            <v-icon color="white">
              $expand
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content
          class="pt-6"
          :style="expansionPanelStyle(cat)"
        >
          <div
            class="row ma-0 pa-0 mb-2 pointer elevation-1"
            v-for="d in getCategoryFilteredActors(cat)"
            :key="d.actor"
            :style="calculateEvalCellStyle(d)"
            @click="actorEvalSelected(d)"
            @mouseenter="
              'rotate diagram';


            "
          >
            <div class="col px-0 py-2">
              <div class="container-fluid ma-0 pa-0 px-2">
                <div class="row ma-0 pa-0 mb-4">
                  <div class="col h6 ma-0 pa-0 no-select">
                    {{ d.actor }}
                  </div>
                </div>
                <div class="row ma-0 pa-0 mb-2">
                  <div class="col-xl-2 col-lg-3 col-3 h6 ma-0 pa-0 text-center">
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
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "EvaluationForm",
  watch: {
    categorySelectTracker: function() {
      if (!this.categorySelectTracker.includes("evaluation")) {
        // console.log(
        //   "evaluation noticed a category being selected in the diagram"
        // );
        if (this.categorySelected) {
          // console.log("category selected toggle was true");
          for (let i in this.expansionPanelCategories) {
            let cat = this.expansionPanelCategories[i];
            if (cat.text == this.selectedCategory.text) {
              // console.log("category and selected category have matching text");
              this.openExpansionPanel = Number(i);
            }
            // this.selectCategory(cat,i)
          }
        } else {
          this.openExpansionPanel = undefined;
        }
      }
    }
  },
  props: ["containerVmin"],
  computed: {
    ...mapGetters(["getActorsForEvaluation"]),
    ...mapState([
      "categories",
      "categorySelected",
      "selectedCategory",
      "categorySelectTracker"
    ]),
    evalActors() {
      let actorCopy = JSON.parse(
        JSON.stringify(
          this.getActorsForEvaluation.filter(d => d.actor != undefined)
        )
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
    },
    expansionPanelCategories() {
      let categoriesCopy = JSON.parse(
        JSON.stringify(this.categories.filter(d => d.text != undefined))
      );

      for (let cat of categoriesCopy) {
        cat.stratSelected = 0;
        cat.stratTotal = 0;
        cat.stratPoints = 0;
        cat.stratPointsTotal = 0;
        for (let act of this.evalActors) {
          if (cat.text == act.category) {
            cat.stratTotal += 1;
            cat.stratPointsTotal += act.evalPoints;
            if (act.evalSelected) {
              cat.stratSelected += 1;
              cat.stratPoints += act.evalPoints;
            }
          }
        }
      }

      return categoriesCopy;
    }
  },
  data: () => ({
    openExpansionPanel: undefined
  }),
  methods: {
    selectCategory(cat, i) {
      let isSource = true;
      let toggle;
      if (i != this.openExpansionPanel) {
        toggle = true;
      } else {
        toggle = false;
      }
      let data = cat;
      let sourceType = "evaluation";
      if (toggle) {
        this.openExpansionPanel = i;
      } else {
        this.openExpansionPanel = undefined;
      }
      this.$store.commit("selectCategory", {
        data,
        toggle,
        sourceType,
        isSource
      });
    },
    getHeaderElement(id) {
      return document.getElementById(id);
    },
    expansionPanelStyle(cat) {
      let styleObj = {};
      styleObj.borderStyle = "solid";
      styleObj.borderColor = cat.color;
      styleObj.borderWidth = "0px 1px 1px 10px";
      return styleObj;
    },
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
    },
    getCategoryFilteredActors(cat) {
      let filteredActors = this.evalActors.filter(a => {
        if (a.category == cat.text) {
          return true;
        } else {
          return false;
        }
      });
      filteredActors.sort((a, b) => (a.evalPoints > b.evalPoints ? -1 : 1));
      return filteredActors;
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
