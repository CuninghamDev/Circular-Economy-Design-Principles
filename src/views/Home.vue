<template>
  <div>
    <div class="ma-0 pa-0" style="position:fixed; height:100%; width:100%;">
      <div
        style="position:fixed; z-index:1; top:0%; height:100%; width:100%; background-color:rgba(255,199,44,0.45)"
        class="ma-0 pa-0"
      ></div>
      <v-img
        style=" opacity: 100%; z-index: 0; height:100%; width:100%"
        class="mt-n16"
        lazy-src="http://research.cuningham.com/regen-planning/assets/EloiseBoardwalk-low.jpg"
        src="http://research.cuningham.com/regen-planning/assets/EloiseBoardwalk-high.jpg"
      ></v-img>
    </div>
    <v-container
      class="elevation-5 mt-16 mb-16 pt-0 rounded-lg"
      style="background-color: rgba(255,255,255,0.95); position:relative"
      :style="{ width: articleWidth }"
    >
      <div>
        <v-row
          class="mt-0 pt-3 pb-0 rounded-lg rounded-b-0 elevation-3"
          style="background-color: #005D68"
        >
          <v-col xl="1" lg="1" cols="0" />
          <v-col xl="10" lg="10" cols="12">
            <h1 class="text-center white--text" style="font-weight:1100">
              Circular Economy and the Built Environment
            </h1>
            <p class=" px-12 text-center white--text">
              Discover design strategies, evaluate projects and learn more about
              how circular thinking can be applied to the built environment
            </p>
          </v-col>
        </v-row>

        <!-- <v-row class="" style="background-color: #035C67; height:10px"></v-row> -->

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

        <hr />

        <v-row class="px-9 pt-6 mb-5">
          <v-col cols="12" lg="4">
            <v-hover v-slot="{ hover }">
              <div
                class="pa-4 pointer"
                :class="
                  hover ? 'elevation-6 grey lighten-5' : 'elevation-4 white'
                "
                :style="topLinkBorderStyle"
                style=""
                @click="linkClicked('discover')"
              >
                <div class="container ma-0 pa-0">
                  <div class="row ma-0 pa-0">
                    <div class="col-10 ma-0 pa-0">
                      <h2 class="">Discover</h2>
                      <h6>Circular Design Strategies</h6>
                    </div>
                    <div class="col-2 ma-0 pa-0 pt-4 text-right">
                      <v-icon
                        x-large
                        :color="hover ? '#FFC72C' : 'grey darken-1'"
                        >mdi-magnify</v-icon
                      >
                    </div>
                  </div>
                </div>

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
                <hr />
                <div class="text-right ma-0 pa-0">
                  <v-icon large :color="hover ? '#FFC72C' : 'grey lighten-1'"
                    >mdi-arrow-right-thick</v-icon
                  >
                </div>
              </div>
            </v-hover>
          </v-col>
          <v-col cols="12" lg="4">
            <v-hover v-slot="{ hover }">
              <div
                class="pa-4 pointer"
                :class="
                  hover ? 'elevation-6 grey lighten-5' : 'elevation-4 white'
                "
                :style="topLinkBorderStyle"
                style=""
                @click="linkClicked('evaluation')"
              >
                <div class="container ma-0 pa-0">
                  <div class="row ma-0 pa-0">
                    <div class="col-10 ma-0 pa-0">
                      <h2 class="">Evaluate</h2>
                      <h6>A Project’s Circular Approach</h6>
                    </div>
                    <div class="col-2 ma-0 pa-0 pt-4 text-right">
                      <v-icon
                        x-large
                        :color="hover ? '#FFC72C' : 'grey darken-1'"
                        >mdi-format-list-checkbox</v-icon
                      >
                    </div>
                  </div>
                </div>

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
                <hr />
                <div class="text-right ma-0 pa-0">
                  <v-icon large :color="hover ? '#FFC72C' : 'grey lighten-1'"
                    >mdi-arrow-right-thick</v-icon
                  >
                </div>
              </div>
            </v-hover>
          </v-col>
          <v-col cols="12" lg="4">
            <v-hover v-slot="{ hover }">
              <div
                class="pa-4 pointer"
                :class="
                  hover ? 'elevation-6 grey lighten-5' : 'elevation-4 white'
                "
                :style="topLinkBorderStyle"
                style=""
                @click="linkClicked('resources')"
              >
                <div class="container ma-0 pa-0">
                  <div class="row ma-0 pa-0">
                    <div class="col-10 ma-0 pa-0">
                      <h2 class="">Resources</h2>
                      <h6>To Learn More</h6>
                    </div>
                    <div class="col-2 ma-0 pa-0 pt-4 text-right">
                      <v-icon
                        x-large
                        :color="hover ? '#FFC72C' : 'grey darken-1'"
                        >mdi-book-open-page-variant-outline</v-icon
                      >
                    </div>
                  </div>
                </div>

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
                <hr />
                <div class="text-right ma-0 pa-0">
                  <v-icon large :color="hover ? '#FFC72C' : 'grey lighten-1'"
                    >mdi-arrow-right-thick</v-icon
                  >
                </div>
              </div>
            </v-hover>
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
