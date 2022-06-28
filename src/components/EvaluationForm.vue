<template>
  <div
    class="container-fluid ml-0 no-select"
    style="overflow-y:auto;height:100%"
    id="evaluation-form-container"
  >
    <div class="row mt-0">
      <div class="col h5">
        Evaluate Your Project's Circularity
      </div>
    </div>
    <div class="row mt-0">
      <div class="col roboto">
        The comparable potential impact (on a scale of one to five) of various
        strategies signifies their potential to retain material value, reduce
        waste, and regenerate the natural environment. The higher the number the
        more impactful the strategy. Strategies with an impact rating of 4 or 5
        are considered High Impact strategies. High Impact strategies are
        critical to shaping how the industry transitions to a Circular Economy.
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
        <v-expansion-panel-header :color="cat.color" class="white--text">
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
            :id="actorToId(d.actor)"
            :style="calculateEvalCellStyle(d)"
            @click="actorEvalSelected(d, $event)"
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
                        <div class="col-11">
                          <div class="container ma-0 pa-0">
                            <div class="row">
                              <div
                                class="col ma-0 pa-0 no-select h6"
                                :style="
                                  d.evalSelected
                                    ? { color: d.color, fontWeight: 'bold' }
                                    : {}
                                "
                              >
                                Circular Approach
                              </div>
                            </div>
                            <div class="row">
                              <div
                                class="col ma-0 pa-0 no-select"
                                :style="
                                  d.evalSelected
                                    ? { color: d.color, fontWeight: 'bold' }
                                    : {}
                                "
                              >
                                {{ d.eval }}
                              </div>
                            </div>
                            <div class="row">
                              <div
                                class="col ma-0 mt-4 pa-0 no-select h6"
                                :style="
                                  d.evalSelected ? { color: 'lightgrey' } : {}
                                "
                              >
                                Conventional Approach
                              </div>
                            </div>
                            <div class="row">
                              <div
                                class="col ma-0 pa-0 no-select"
                                :style="
                                  d.evalSelected ? { color: 'lightgrey' } : {}
                                "
                              >
                                {{ d.conventional }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col ma-0 mt-n5 pa-0 pr-2 text-right">
                          <div class="container-fluid ma-0 pa-0">
                            <div class="row">
                              <div class="col" style="height:100%">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-btn
                                      class="info-button"
                                      color="grey lighten-1"
                                      v-on="on"
                                      icon
                                      dark
                                      small
                                      @click="activateAdditionalResources(d)"
                                    >
                                      <v-icon large dark class="info-button"
                                        >mdi-information-outline</v-icon
                                      >
                                    </v-btn>
                                  </template>
                                  <span
                                    >Additional resources related to...
                                    {{ d.actor }}</span
                                  >
                                </v-tooltip>
                              </div>
                            </div>

                            <div class="row pt-0" v-if="d.evalSelected">
                              <div class="col">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-btn
                                      class="info-button"
                                      color="grey lighten-1"
                                      v-on="on"
                                      icon
                                      dark
                                      small
                                      @click="activateCommentDialog(d)"
                                    >
                                      <v-icon
                                        large
                                        dark
                                        class="info-button"
                                        v-if="!d.comments"
                                      >
                                        mdi-comment-outline
                                      </v-icon>
                                      <v-icon
                                        large
                                        dark
                                        class="info-button"
                                        color="#FFC72C"
                                        v-else
                                        >mdi-comment</v-icon
                                      >
                                    </v-btn>
                                  </template>
                                  <span
                                    >Add comments to describe how your project
                                    is meeting these criteria</span
                                  >
                                </v-tooltip>
                              </div>
                            </div>
                          </div>
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

    <v-dialog v-model="additionalResourcesDialog" width="950">
      <v-card v-if="resourcesActor">
        <v-card-title
          class=" text-white pa-2 ma-0 border-bottom"
          :style="'backgroundColor:' + resourcesActor.color"
          style="z-index:1000"
        >
          <table class="table table-borderless ma-0 pa-0">
            <tbody class="ma-0 pa-0">
              <tr class="ma-0 pa-0">
                <td
                  class="align-middle ma-0 pa-0"
                  style="width:120px"
                  rowspan="2"
                >
                  <img
                    class="ma-0 pa-0"
                    :src="selectedCategory.whiteIconPath"
                    style="height:100px; width:100px"
                  />
                </td>
                <td class="align-bottom text-left ma-0 pa-0">
                  <p
                    class="h5 ma-0 pa-0 mt-2 text-white"
                    style="word-break:normal;"
                  >
                    {{ resourcesActor.actor.toUpperCase() }}
                  </p>
                </td>
              </tr>
              <tr class="ma-0 pa-0">
                <td class="ma-0 pa-0 align-top">
                  <p
                    class="ma-0 mt-2 pa-0 text-white"
                    style="word-break:normal; font-style:italic; font-weight:300; line-height:normal"
                  >
                    Additional Resources
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-title>

        <v-container
          style="z-index:0"
          class="my-0 pb-4 pt-4"
          :style="'max-height:' + 650 + 'px; overflow-y: auto'"
        >
          <v-row class="py-1">
            <v-col v-if="relevantResources.length == 0">
              <p class="red--text text--darken-4">
                No resources are listed for this circular strategy
              </p>
              <p class="red--text text--darken-4">
                Use the "Suggest A Resource" button below to suggest missing
                resources that should be added to this database
              </p>
            </v-col>
            <v-col
              v-for="resource in relevantResources"
              :key="resource.id"
              cols="12"
              class="py-2"
            >
              <v-card
                v-blur
                @click="openLink(resource['external link'])"
                hover
                shaped
                class="grey lighten-5"
              >
                <v-card-title class="text-h5" style="word-break:normal;">
                  {{ resource["short name"] }}
                </v-card-title>
                <v-card-subtitle
                  v-if="resource['long name'] != ''"
                  style="line-height:normal"
                >
                  <b>{{ resource["long name"] }}</b>
                </v-card-subtitle>
                <v-card-text>
                  <table class="table table-borderless ma-0 pa-0">
                    <tbody class="ma-0 pa-0">
                      <tr class="ma-0 pa-0">
                        <td
                          class="ma-0 pt-0 pb-2 pl-0 pr-4 border-bottom align-middle"
                          style="width:50px"
                        >
                          <v-icon
                            color="grey"
                            v-if="resource['type'] == 'Resource'"
                            large
                            :title="resource['type']"
                            >mdi-file-table-box-multiple-outline</v-icon
                          >
                          <v-icon
                            color="grey"
                            v-else-if="resource['type'] == 'Learn'"
                            large
                            :title="resource['type']"
                          >
                            mdi-book-open-page-variant-outline</v-icon
                          >
                          <v-icon
                            color="grey"
                            v-else-if="resource['type'] == 'Example'"
                            large
                            :title="resource['type']"
                          >
                            mdi-city-variant-outline</v-icon
                          >
                        </td>
                        <td
                          class="ma-0 pt-0 pb-2 pl-0 pr-3 border-bottom align-middle"
                          style="width:75px"
                        >
                          {{ resource["type"] }}
                        </td>
                        <td
                          class="ma-0 pl-3 pr-0 py-0 border-left align-middle"
                          rowspan="2"
                        >
                          <p class="h6" style="font-weight:400">
                            {{ resource["summary"] }}
                          </p>
                        </td>
                      </tr>
                      <tr class="ma-0 pa-0">
                        <td
                          class="ma-0 pt-2 pb-0 pl-0 pr-4 align-middle"
                          style="width:50px"
                        >
                          <v-icon
                            color="grey"
                            v-if="resource['read time'] == '2 min'"
                            large
                            :title="resource['read time']"
                            >mdi-circle-slice-1</v-icon
                          >
                          <v-icon
                            color="grey"
                            v-else-if="resource['read time'] == '5 min'"
                            large
                            :title="resource['read time']"
                            >mdi-circle-slice-2</v-icon
                          >
                          <v-icon
                            color="grey"
                            v-else-if="resource['read time'] == '10 min'"
                            large
                            :title="resource['read time']"
                            >mdi-circle-slice-3</v-icon
                          >
                        </td>
                        <td
                          class="ma-0 pt-2 pb-0 pl-0 pr-3 align-middle"
                          style="width:75px"
                        >
                          {{ resource["read time"] }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <div class="elevation-3 my-0 py-0">
          <v-divider class="my-0"></v-divider>
          <v-card-actions class="py-4">
            <v-btn
              color="#A80051"
              class="elevation-2"
              @click="navigateToRoute('/suggest-resource')"
              outlined
              >Suggest A Resource</v-btn
            >
            <v-spacer></v-spacer>

            <v-btn
              color="#06262D"
              text
              @click="additionalResourcesDialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="commentsDialog"
      width="950"
      @click:outside="actorCommentsUpdated(resourcesActor)"
    >
      <v-card v-if="resourcesActor">
        <v-card-title
          class="text-white pa-2 ma-0 border-bottom"
          :style="'backgroundColor:' + resourcesActor.color"
          style="z-index:1000"
        >
          <table class="table table-borderless ma-0 pa-0">
            <tbody class="ma-0 pa-0">
              <tr class="ma-0 pa-0">
                <td
                  class="align-middle ma-0 pa-0"
                  style="width:120px"
                  rowspan="2"
                >
                  <img
                    class="ma-0 pa-0"
                    :src="selectedCategory.whiteIconPath"
                    style="height:100px; width:100px"
                  />
                </td>
                <td class="align-bottom text-left ma-0 pa-0">
                  <p
                    class="h5 ma-0 pa-0 mt-2 text-white"
                    style="word-break:normal;"
                  >
                    {{ resourcesActor.actor.toUpperCase() }}
                  </p>
                </td>
              </tr>
              <tr class="ma-0 pa-0">
                <td class="ma-0 pa-0 align-top">
                  <p
                    class="ma-0 mt-2 pa-0 text-white"
                    style="word-break:normal; font-style:italic; font-weight:300; line-height:normal"
                  >
                    Comments About Implementation
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-title>

        <v-container
          style="z-index:0;"
          class="my-0 pb-4 pt-4"
          :style="'max-height:' + 650 + 'px; overflow-y: auto'"
        >
          <v-row class="pt-1">
            <v-col class="pb-0 mb-0">
              <h4>Comments</h4>
            </v-col>
          </v-row>
          <v-row class="py-0">
            <v-col class="pt-0 pb-0 mb-0">
              <p>
                Write your comments about implementing this Circular Economy
                design strategy in the dialog box below
              </p>
            </v-col>
          </v-row>
          <v-row class="py-0 mb-0 mt-0">
            <v-col class="pb-0 mb-0">
              <v-textarea
                outlined
                class="pt-0 mt-0"
                v-model="resourcesActor.comments"
              />
            </v-col>
          </v-row>
        </v-container>

        <div class="elevation-3 my-0 py-0">
          <v-divider class="my-0"></v-divider>
          <v-card-actions class="py-4">
            <v-btn
              color="#A80051"
              class="elevation-2"
              @click="
                actorCommentsUpdated(resourcesActor);
                commentsDialog = false;
              "
              outlined
              >Save</v-btn
            >
            <v-spacer></v-spacer>

            <v-btn
              color="#06262D"
              text
              @click="
                resourcesActor.comments = tempComments;
                commentsDialog = false;
              "
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>

    <div class="ma-0 pa-0" style="height:1000px" v-if="categorySelected"></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "EvaluationForm",
  watch: {
    selectedActor: function() {
      console.log("noticed an actor changed", this.selectedActor);
      let actorElement = document.getElementById(
        this.actorToId(this.selectedActor.actor)
      );
      if (actorElement) {
        let actorBounds = actorElement.getBoundingClientRect();
        let appBarHeight = document
          .getElementById("vuetify-application-bar")
          .getBoundingClientRect().height;
        let evalTabsHeight = document
          .getElementById("vuetify-tabs-for-evaluation")
          .getBoundingClientRect().height;
        let actorHeight = actorBounds.top - appBarHeight - evalTabsHeight;
        let formHeight = document
          .getElementById("evaluation-form-container")
          .getBoundingClientRect().height;
        let scrollTop = document.getElementById("evaluation-form-container")
          .scrollTop;

        let scrollActorHeight =
          actorHeight + scrollTop + evalTabsHeight - formHeight / 2;
        console.log(
          "measures",
          actorHeight,
          scrollTop,
          evalTabsHeight,
          scrollActorHeight
        );
        document
          .getElementById("evaluation-form-container")
          .scroll({ top: scrollActorHeight, left: 0, behavior: "smooth" });
      }
    },
    categorySelectTracker: function() {
      // if (!this.categorySelectTracker.includes("evaluation")) {
      if (this.categorySelected) {
        for (let i in this.expansionPanelCategories) {
          let cat = this.expansionPanelCategories[i];
          if (cat.text == this.selectedCategory.text) {
            this.openExpansionPanel = Number(i);
          }
        }
      } else {
        this.openExpansionPanel = undefined;
      }
    }
    // }
  },
  props: ["containerVmin"],
  computed: {
    ...mapGetters(["getActorsForEvaluation"]),
    ...mapState([
      "categories",
      "categorySelected",
      "selectedCategory",
      "categorySelectTracker",
      "selectedActor",
      "resourcesData"
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
    },
    relevantResources() {
      if (this.resourcesActor) {
        let actorFilter = this.resourcesActor.actor.toLowerCase();
        let relevantResources = [];
        for (let d of this.resourcesData.data) {
          if (actorFilter in d) {
            if (d[actorFilter] === true) {
              relevantResources.push(d);
            }
          }
        }

        return relevantResources;
      } else {
        return [];
      }
    }
  },
  data: () => ({
    openExpansionPanel: undefined,
    additionalResourcesDialog: false,
    resourcesActor: undefined,
    commentsDialog: false,
    tempComments: ""
  }),
  methods: {
    openLink(link) {
      window.open(link, "_blank");
    },
    navigateToRoute(path) {
      let currentRoute = this.$route.path;
      if (path != currentRoute) {
        this.$router.push(path);
      }
    },
    activateAdditionalResources(d) {
      this.additionalResourcesDialog = true;
      this.resourcesActor = d;
      console.log("active additional resources called", d);
    },
    activateCommentDialog(d) {
      this.commentsDialog = true;
      if (d.comments == undefined) {
        d.comments = "";
      }
      this.tempComments = d.comments;
      this.resourcesActor = d;

      console.log("activate comment dialog called", d);
    },
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
    actorEvalSelected(actorData, event) {
      if (!event.srcElement.classList.contains("info-button")) {
        this.$store.commit("actorEvalSelected", actorData);
      }
    },
    actorCommentsUpdated(actorData) {
      console.log("actors comments updated");
      this.tempComments = actorData.comments;
      this.$store.commit("actorCommentsUpdated", actorData);
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
    },
    actorToId(str) {
      return "expansion-panel-" + str.toLowerCase().replace(/\s/g, "-");
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
