<template>
  <div>
    <v-img
      style="position:fixed; height:100%; width:100%; opacity: 60%; z-index: 0;"
      class="mt-n16"
      lazy-src="http://research.cuningham.com/circular-economy/assets/CE_Backdrop_Web.jpg"
      src="http://research.cuningham.com/circular-economy/assets/CE_Backdrop.JPG"
    ></v-img>
    <v-container
      class="elevation-5 mt-16 mb-16 pt-0 rounded-lg"
      style="background-color: rgba(255,255,255,0.95); position:relative"
      :style="{ width: articleWidth }"
    >
      <div>
        <v-row
          class="mt-0 pt-3 pb-0 rounded-lg rounded-b-0"
          style="background-color: rgba(0,149,203,1)"
        >
          <v-col xl="0" lg="0" cols="0" />
          <v-col xl="12" lg="12" cols="12">
            <h1 class="text-center white--text" style="font-weight:1100">
              Circular Economy and the Built Environment
            </h1>
            <h5 class=" px-12 text-center white--text">
              Discover design strategies, evaluate projects and learn more about
              how circular thinking can be applied to the built environment
            </h5>
          </v-col>
        </v-row>

        <v-row class="" style="background-color: #035C67; height:10px"></v-row>

        <v-row class="px-9 pt-6">
          <v-col cols="12" lg="4">
            <v-hover v-slot="{ hover }">
              <div
                class="pa-4 pointer"
                :class="hover ? 'elevation-5' : 'elevation-3'"
                :style="topLinkBorderStyle"
                style=""
                @click="linkClicked('discover')"
              >
                <h2 class="">Discover</h2>
                <h6>Circular Design Strategies</h6>
                <hr
                  style="border-width: 5px;"
                  :style="
                    hover
                      ? { 'border-color': '#FFC72C' }
                      : { 'border-color': 'lightgray' }
                  "
                />
                <p class="text-justify">
                  Use an interactive diagram to explore and discover design
                  strategies that are related to specific stages in a typical
                  building project's lifecycle. The information from this
                  diagram can be used to understand the strategy itself, how it
                  ties into other stages in the lifecycle, and where more
                  information about the strategy can be found online.
                </p>
              </div>
            </v-hover>
          </v-col>
          <v-col cols="12" lg="4">
            <v-hover v-slot="{ hover }">
              <div
                class="pa-4 pointer"
                :class="hover ? 'elevation-5' : 'elevation-3'"
                :style="topLinkBorderStyle"
                style=""
                @click="linkClicked('evaluation')"
              >
                <h2 class="">Evaluate</h2>
                <h6>A Project’s Circular Approach</h6>
                <hr
                  style="border-width: 5px;"
                  :style="
                    hover
                      ? { 'border-color': '#FFC72C' }
                      : { 'border-color': 'lightgray' }
                  "
                />
                <p class="text-justify">
                  Use a simple web app version of the interactive diagram to
                  select design strategies that may apply to your building
                  project(s). This is a lightweight and fast way to understand
                  how well your project’s circular design intent is performing
                  at the various stages in that building’s lifecycle. This tool
                  is designed to be fast and easy to use at the earliest stages
                  of design, to set the stage for bringing detail to these
                  strategies and sparking conversations about the value circular
                  economy strategies can bring to your project.
                </p>
              </div>
            </v-hover>
          </v-col>
          <v-col cols="12" lg="4">
            <v-hover v-slot="{ hover }">
              <div
                class="pa-4 pointer"
                :class="hover ? 'elevation-5' : 'elevation-3'"
                :style="topLinkBorderStyle"
                style=""
                @click="linkClicked('resources')"
              >
                <h2 class="">Resources</h2>
                <h6>To Learn More</h6>
                <hr
                  style="border-width: 5px;"
                  :style="
                    hover
                      ? { 'border-color': '#FFC72C' }
                      : { 'border-color': 'lightgray' }
                  "
                />
                <p class="text-justify">
                  This Toolkit was built based on an extensive list of reading
                  and available resources, and these have been organized and
                  categorized for your use to learn more as well. Use the list
                  of resources on this page to identify future ready material
                  and broaden your knowledge on the topic of design strategies
                  and the Circular Economy.
                </p>
              </div>
            </v-hover>
          </v-col>
        </v-row>

        <hr class="my-8" />

        <v-row>
          <v-col cols="12" lg="12" class="px-12 ma-0 text-justify">
            <h2 class="mb-4">Project Lifecycle Phases</h2>
            <p class="">
              The graphics used throughout this toolkit organize circular
              economy design strategies by the phase in a typical project
              lifecycle at which they are most relevant. The four phases are
              described below. Their color scheme and icons are used throughout
              the toolkit for visual consistency and continuity.
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
        <hr />
        <v-row class="mt-4">
          <v-col cols="12">
            <h2 class="grey--text text--darken-3 mx-8">
              About This Toolkit of Resources
            </h2>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col class="ma-0 pa-0">
            <v-container fluid class="px-12">
              <v-row>
                <v-col lg="12" cols="12">
                  <h5>What is it?</h5>
                  <p class="text-justify">
                    This Toolkit aggregates high level information about
                    circular economy design and construction strategies. It
                    makes it possible to explore information related to these
                    strategies and track the strategies that may apply to your
                    own projects.
                  </p>
                </v-col>
                <v-col lg="12" cols="12">
                  <h5>Who is it for?</h5>
                  <p class="text-justify">
                    This Toolkit is for designers, building owners and
                    manufacturers of building related products and components.
                  </p>
                </v-col>

                <v-col lg="12" cols="12">
                  <h5>Why is it useful?</h5>
                  <p class="text-justify">
                    By making information about the Circular Economy more easily
                    accessible and readily available, this Toolkit helps design
                    teams to take these strategies into consideration and acts
                    as a starting point for design decision making. It helps
                    building owners understand how their building can
                    participate in the Circular Economy over the course of its
                    lifecycle, and it helps manufacturers understand how their
                    products exist and interact with the Circular Economy beyond
                    their initial installation.
                  </p>
                </v-col>
                <v-col lg="12" cols="12">
                  <h5>How can you get started?</h5>
                  <p class="text-justify">
                    You can browse the design strategies using an interactive
                    diagram here, or use the same strategies to quickly get a
                    general evaluation of your project’s degree of circularity
                    here.
                  </p>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ml-7 mb-8 mt-0">
            <v-btn to="about" color="#FFC72C"
              >Learn More About this Project</v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import router from "../router";
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
    windowWidth: 1000,
    topLinkBorderStyle: {
      borderWidth: "1.5px",
      borderStyle: "solid",
      borderRadius: "10px",
      borderColor: "lightgray"
    },
    articleWidth: "80%"
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
      if (this.windowWidth > 2000) {
        this.articleWidth = "58%";
      } else if (this.windowWidth > 1264) {
        this.articleWidth = "72%";
      } else if (this.windowWidth > 900) {
        this.articleWidth = "82%";
      } else {
        this.articleWidth = "92%";
      }
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
    },
    linkClicked(dest) {
      console.log("linked click", dest);
      router.push(dest);
    }
  }
};
</script>

<style></style>
