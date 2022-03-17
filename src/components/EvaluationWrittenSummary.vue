<template>
  <div class="container-fluid" :style="{}">
    <!-- The next div makes sure that some strategies are selected before creating a report (otherwise it would look pretty weird) -->
    <div class="ma-0 pa-0" v-if="totalSelectedPoints > 0">
      <div class="row">
        <div class="col h2 mb-1 pb-0">
          {{ projectName }}
        </div>
      </div>

      <div class="row">
        <div class="col h4 mt-0 pt-0 mb-1 pb-0">
          Circular Strategies
        </div>
      </div>

      <div class="row">
        <div class="col">
          The following Circular Economy strategies will be pursued for
          {{ projectName }}. These strategies have been sorted by the primary
          building life cycle stage that they impact.
        </div>
      </div>

      <div class="ma-0 pa-0" v-for="cat in categoryData" :key="cat.text">
        <div class="row" v-if="cat.selectedPoints > 0">
          <div class="col">
            <v-container fluid class="pa-0 ma-0">
              <v-row class="">
                <v-col>
                  <v-card>
                    <v-card-title
                      :style="{ backgroundColor: cat.color }"
                      class="text-white pa-2 pb-0 ma-0 border-bottom"
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
                                :src="cat.whiteIconPath"
                                style="height:100px; width:100px;"
                              />
                            </td>
                            <td class="align-top text-left ma-0 pa-0 pt-1">
                              <p
                                class="h3 ma-0 pa-0 mt-2 text-white"
                                style="word-break:normal"
                              >
                                {{ cat.text }}
                              </p>
                            </td>
                          </tr>
                          <tr class="ma-0 pa-0">
                            <td class="ma-0 pa-0 align-top">
                              <p
                                class="ma-0 mt-n12 pa-0 text-white h5"
                                style="word-break:normal; font-weight:100; font-size:medium; line-height:normal"
                              >
                                Strategies Related to this Phase in the Project
                                Lifecycle
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </v-card-title>

                    <v-card-text class="mt-5 mb-3">
                      <div v-for="(act, i) in cat.actors" :key="i">
                        <div v-if="act.evalSelected" class="mb-5">
                          <div class="h5">
                            {{ act.actor }}
                          </div>
                          <div class="mb-2">
                            <v-chip class="mr-2" :color="cat.color" dark>
                              {{ act.evalPoints }} pts
                            </v-chip>
                            <v-chip
                              v-if="act.evalPoints >= 4"
                              class="mr-2"
                              color="orange accent-4"
                              dark
                            >
                              High Impact
                            </v-chip>
                          </div>

                          <div class="h6">
                            Description of Circular Approach
                          </div>
                          <div class="p">
                            {{ act.details }}
                          </div>
                          <div class="h6 mt-2">
                            Criteria
                          </div>
                          <div class="p">
                            {{ act.eval }}
                          </div>

                          <div class="h6 mt-2" v-if="act.buttonData.length > 0">
                            Other Relevant Lifecycle Stages
                          </div>
                          <v-card
                            v-for="(b, i) in act.buttonData"
                            :key="i"
                            class="mb-4"
                          >
                            <div
                              class="h6 ml-3 pt-2"
                              :style="{ color: categoryColorLookup[b.stage] }"
                            >
                              {{ b.stage }}
                            </div>
                            <div class="p ml-3 pb-3 ">{{ b.details }}</div>
                          </v-card>
                          <div class="p"></div>

                          <hr
                            v-if="
                              act.selectedActorIndex <
                                cat.selectedActorCount - 1
                            "
                          />
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col"></div>
      </div>
    </div>

    <!-- This section provides a warning message if no strategies have been selected -->
    <div class="ma-0 pa-0" v-else>
      <div class="row">
        <div class="col h2 mb-1 pb-0">
          No Strategies Selected!
        </div>
      </div>

      <div class="row">
        <div class="col">
          There are currently no strategies selected for this project. Return to
          the "Diagram" or "Evaluation Report" to select Circular Economy
          strategies that are relevant to your project to see the results
          reflected in the written report generated on this tab.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "WrittenSummary",
  computed: {
    ...mapState(["projectName", "categories", "actors", "buttons"]),
    categoryData() {
      let categoryData = [];
      let categoriesCopy = JSON.parse(JSON.stringify(this.categories));
      // let categoryCount = categoriesCopy.length;
      // let rotation = (-1 / 4) * Math.PI;
      for (let i in categoriesCopy) {
        let c = categoriesCopy[i];
        if (i == 0) {
          c.rotationStart = Math.PI / -2;
        } else {
          c.rotationStart = categoriesCopy[i - 1].rotationEnd;
        }
        let relevantActors = this.actors.filter(
          a => a.category == c.text && a.evalSelected
        );
        relevantActors.sort((a, b) => (a.evalPoints <= b.evalPoints ? 1 : -1));
        c.actors = relevantActors;
        c.selectedActorCount = 0;
        c.totalPoints = 0;
        c.selectedPoints = 0;
        let indexTracker = 0;
        for (let a of relevantActors) {
          a.selectedActorIndex = -1;
          a.buttonData = [];
          if (a.evalPoints) {
            c.totalPoints += a.evalPoints;
            if (a.evalSelected) {
              for (let b of this.buttons) {
                if (a.actor == b.sourceActor) {
                  a.buttonData.push(b);
                }
              }
              a.selectedActorIndex = indexTracker;
              indexTracker += 1;
              c.selectedPoints += a.evalPoints;
              c.selectedActorCount += 1;
            }
          }
        }
        c.percentSelected = c.selectedPoints / c.totalPoints;
        c.rotationEnd = c.rotationStart + c.percentSelected * Math.PI * 0.5;
        categoryData.push(c);
      }
      return categoryData;
    },
    categoryColorLookup() {
      let categoryColorLookup = {};
      for (let c of this.categories) {
        categoryColorLookup[c.text] = c.color;
      }
      return categoryColorLookup;
    },
    totalSelectedPoints() {
      let totalSelectedPoints = 0;
      for (let a of this.actors) {
        if (a.evalSelected && a.evalPoints) {
          totalSelectedPoints += a.evalPoints;
        }
      }
      return totalSelectedPoints;
    }
  }
};
</script>

<style></style>
