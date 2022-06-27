<template>
  <v-container>
    <v-row class="mt-4">
      <v-col xl="3" lg="2" cols="0" />
      <v-col xl="6" lg="8" cols="12">
        <h1
          class="text-center grey--text text--darken-3"
          style="font-weight:1100"
        >
          Circular Economy and the Built Environment
        </h1>
      </v-col>
      <v-col xl="3" lg="2" cols="0" />
    </v-row>
    <v-row class="">
      <v-col class="ma-0 pa-0">
        <v-container fluid class="px-12">
          <v-row>
            <v-col lg="5" cols="12">
              <h3>What</h3>
              <h6>
                What is this toolkit?
              </h6>
              <p class="text-justify">
                This toolkit aggregates high level information about circular
                economy design and construction strategies. It makes it possible
                to explore information related to these strategies, and track
                the strategies that may apply to your own projects.
              </p>
            </v-col>
            <v-col lg="2" md="0" sm="0" cols="0" class="py-0 my-0" />
            <v-col lg="5" cols="12">
              <h3>Who</h3>
              <h6>
                Who is this toolkit for?
              </h6>
              <p class="text-justify">
                This toolkit is for anyone involved in the design, construction,
                procurement or ownership of buildings.
              </p>
            </v-col>

            <v-col lg="5" cols="12">
              <h3>Why</h3>
              <h6>
                Why should you use this toolkit as part of the design process?
              </h6>
            </v-col>
            <v-col lg="2" md="0" sm="0" cols="0" class="py-0 my-0" />
            <v-col lg="5" cols="12">
              <h3>How</h3>
              <h6>
                How do you get started?
              </h6>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <hr />
    <v-row>
      <v-col cols="12" lg="6" class="px-12 ma-0 text-justify">
        <h3>Phases</h3>
        <h6>Phases used for typical built environment project</h6>
        <p class="">
          The toolkit breaks down the project timeline in terms of the design
          strategies that take place at each lifecycle phase. The four phases
          are described below. Their color scheme and icons are used throughout
          the toolkit for visual consistency and clarity.
        </p>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col class="px-8 ma-0">
        <v-timeline :dense="isDense">
          <v-timeline-item
            v-for="(cat, i) in categories"
            :key="cat.text"
            :color="cat.color"
            :left="i % 2 == 0"
            :right="i % 2 != 0"
          >
            <v-card class="px-0">
              <v-card-title
                class="py-2 mb-0"
                :style="{ background: cat.color }"
              >
                <h6
                  class=" mb-0 w-100 text-white"
                  :class="alignmentClass(i)"
                  style="word-break: break-word;"
                >
                  {{ cat.text }}
                </h6>
              </v-card-title>
              <v-card-text class="px-0">
                <v-container class="ma-0 pa-0">
                  <v-row class="ma-0 pa-0">
                    <v-col
                      cols="12"
                      sm="4"
                      md="3"
                      class="ma-0 pa-0 pl-3 text-center"
                      v-if="!imageToggle(i)"
                    >
                      <v-img
                        contain
                        :src="cat.iconPath"
                        max-height="140"
                      ></v-img>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="8"
                      md="9"
                      class="ma-0 pa-0 pt-3 px-3 text-justify"
                    >
                      {{ cat.textDescription }}
                    </v-col>
                    <v-col
                      cols="12"
                      sm="4"
                      md="3"
                      class="ma-0 pa-0 pr-3 text-center"
                      v-if="imageToggle(i)"
                    >
                      <v-img
                        contain
                        :src="cat.iconPath"
                        max-height="140"
                      ></v-img>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <v-container fluid class="">
          <v-row class="my-6 border-bottom py-6 border-top px-5">
            <v-col class="pr-12" lg="5" xl="5" cols="12">
              <h3>Discover</h3>
              <h6>
                Discover Circular Design Strategies
              </h6>
              <p class="text-justify">
                An interactive diagram to explore and discover design strategies
                as they relate to specific stages in a typical building
                project's lifecycle. The information from this diagram can be
                used to understand the strategy itself, how it ties into other
                stages in the lifecycle, and where more information about the
                strategy can be found online.
              </p>
            </v-col>
            <v-col class="pa-1 grey lighten-2 rounded" lg="7" xl="7" cols="12">
              <v-img
                class="rounded pointer"
                @click="$router.push('discover')"
                src="http://research.cuningham.com/circular-economy/assets/ce-diagram.PNG"
              />
            </v-col>
          </v-row>

          <v-row class="my-6 border-bottom pb-6 px-5">
            <v-col class="pr-12" lg="5" xl="5" cols="12">
              <h3>Evaluate</h3>
              <h6>
                Evaluate A Project's Circular Approach
              </h6>
            </v-col>
            <v-col class="pa-1 grey lighten-2 rounded" lg="7" xl="7" cols="12">
              <v-img
                class="rounded pointer"
                @click="$router.push('evaluation')"
                src="http://research.cuningham.com/circular-economy/assets/ce-evaluation.PNG"
              />
            </v-col>
          </v-row>

          <v-row class="my-6 border-bottom pb-6 px-5">
            <v-col class="pr-12" lg="5" xl="5" cols="12">
              <h3>
                Resources
              </h3>
              <h6>
                Browse Resources for Discovering the Circular Economy
              </h6>
            </v-col>
            <v-col class="pa-1 grey lighten-2 rounded" lg="7" xl="7" cols="12">
              <v-img
                class="rounded pointer"
                @click="$router.push('resources')"
                src="http://research.cuningham.com/circular-economy/assets/ce-browse.PNG"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-btn text outlined to="about">Learn More About this Project</v-btn>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Home",
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  data: () => ({
    mediumBreakPoint: 991,
    windowWidth: 1000
  }),
  computed: {
    ...mapGetters([
      "getLifeCycles",
      "getActorsForEvaluation",
      "selectedActorColor"
    ]),
    ...mapState(["categories", "actors", "buttons", "title"]),
    isDense() {
      if (this.windowWidth < this.mediumBreakPoint) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    resize() {
      this.windowWidth = window.innerWidth;
    },
    alignmentClass(i) {
      if (i % 2 == 0 && !this.isDense) {
        return "text-right";
      } else if (!this.isDense) {
        return "text-left";
      } else {
        return "text-left";
      }
    },
    imageToggle(i) {
      if (i % 2 == 0 && !this.isDense) {
        return true;
      } else if (!this.isDense) {
        return false;
      } else {
        return false;
      }
    }
  }
};
</script>

<style></style>
