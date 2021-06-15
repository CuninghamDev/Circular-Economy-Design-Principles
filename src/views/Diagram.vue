<template>
  <div class="container-fluid m-0 p-0 hide-scrollbar">
    <div class="row m-0 p-0">
      <div class=" col-lg-8 m-0 p-0">
        <circular-economy-diagram></circular-economy-diagram>
      </div>
      <div class="col m-0 p-0" style="">
        <actor-data></actor-data>
      </div>
    </div>
    <div>
      <v-dialog v-model="showDiagramInteractionAlert" width="1000">
        <v-card>
          <v-card-title class="pa-2 ma-0 border-bottom pl-4 pt-4">
            <h4>
              Circular Economy in the Built Environment
            </h4>
          </v-card-title>
          <div
            class="my-0 pb-4 pt-4 container"
            :style="
              'max-height:' + this.windowHeight * 0.7 + 'px; overflow-y: auto'
            "
          >
            <div class="row my-0 py-0">
              <div class="col my-0 py-0">
                <p>
                  This toolkit has been designed to aggregate and visualize
                  resources related to the Circular Economy in the Built
                  Environment, that can be used by Building Owners, Designers,
                  Manufacturers and Contractors to gain a general understanding
                  about the range of concepts and approaches that can be used to
                  implement circular economy principles when doing work related
                  to the built environment.
                </p>
              </div>
            </div>
            <div class="row my-0 py-0">
              <div class="col my-0 py-0 ">
                <h5>Four Phases</h5>
              </div>
            </div>
            <div class="row my-0 py-0">
              <div class="col my-0 py-0">
                <p>
                  There are any number of conventional names for the various
                  phases of a project's lifecycle. For this effort phases have
                  been chosen to break down the project lifecycle in terms of
                  the circular economy activities taking place during at given
                  points in time. The four phases as defined by this effort are
                  listed below with more detailed descriptions.
                </p>
              </div>
            </div>
            <div class="row my-0 py-0">
              <div class="col my-0 py-0">
                <v-chip dark color="#61BAE0" medium
                  ><h6 class="ma-0 pa-0 pb-1">Resource Exchange</h6></v-chip
                >
              </div>
            </div>
            <div class="row my-0 py-0 pl-5 pt-3">
              <div class="col my-0 py-0">
                <p>
                  This tool itself is part of resource exchange. This is where
                  we learn about new strategies, and find all the information
                  and materials to then design the built environment. This is
                  the pond of resources, tangible and intangible.
                </p>
              </div>
            </div>
            <div class="row my-0 py-0">
              <div class="col my-0 py-0">
                <v-chip dark color="#358BB0" medium
                  ><h6 class="ma-0 pa-0 pb-1">Design and Deliver</h6></v-chip
                >
              </div>
            </div>
            <div class="row my-0 py-0 pl-5 pt-3">
              <div class="col my-0 py-0">
                <p>
                  One of the most impactful stages for creating a circular
                  journey in the built environment. Working off of the Circular
                  Economy pillar to “Design out Waste”, this phase is where we
                  identify and coordinate the tangible strategies to be used
                  during design.
                </p>
              </div>
            </div>
            <div class="row my-0 py-0">
              <div class="col my-0 py-0">
                <v-chip dark color="#A6D08F" medium
                  ><h6 class="ma-0 pa-0 pb-1">
                    Intelligent Built Environment
                  </h6></v-chip
                >
              </div>
            </div>
            <div class="row my-0 py-0 pl-5 pt-3">
              <div class="col my-0 py-0">
                <p>
                  During this phase, ideas are implemented and tracked. We are
                  now using/reusing the design to its maximized potential. This
                  is where we would see the third Circular Economy principle to
                  “regenerate natural systems” at work.
                </p>
              </div>
            </div>
            <div class="row my-0 py-0">
              <div class="col my-0 py-0">
                <v-chip dark color="#90B47D" medium
                  ><h6 class="ma-0 pa-0 pb-1">End of Design Life</h6></v-chip
                >
              </div>
            </div>
            <div class="row my-0 py-0 pl-5 pt-3">
              <div class="col my-0 py-0">
                <p>
                  The follow through, with an emphasis on another Circular
                  Economy principle to “Keep Materials in Use”. This phase is
                  where materials make their way back to being exchanged or
                  headed to their next site for reuse.
                </p>
              </div>
            </div>
            <div class="row my-0 py-0">
              <div class="col my-0 py-0 ">
                <h5>Getting Started</h5>
              </div>
            </div>
            <div class="row my-0 py-0 pl-5 pt-3">
              <div class="col my-0 py-0">
                <p>
                  To get started, click outside of this dialog window or click
                  the "Go To Diagram" button in the bottom right. This will take
                  you to the first page of the toolkit, the Circular Economy
                  Diagram. This diagram will allow you to browse through the
                  various strategies associated with the phases listed above,
                  and view online resources associated with these different
                  approaches to circularity. If you'd like resources associated
                  with the Circular Economy more generally, click the button in
                  the center of the diagram for a list of additional reading and
                  online resources.
                </p>
              </div>
            </div>
          </div>

          <div class="elevation-3 my-0 py-0">
            <v-divider class="my-0"></v-divider>
            <v-card-actions class="py-4">
              <v-spacer></v-spacer>
              <v-btn
                color="teal darken-3"
                text
                @click="showDiagramInteractionAlert = false"
              >
                Go To Diagram
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <!-- <v-alert
      v-if="showDiagramInteractionAlert"
      style="position:absolute; left: 2vh; max-width:420px"
      :style="
        windowWidth < 900
          ? 'offset-position:bottom; bottom: 2vh'
          : 'offset-position:top; top: 2vh'
      "
      dismissible
      color="blue-grey"
      border="right"
      class="ma-2 ml-1 mr-3 py-3"
      prominent
      icon="mdi-autorenew"
      outlined
    >
      The diagram is interactive! Click on it to explore Strategies related to
      the Circular Economy!
    </v-alert> -->
  </div>
</template>

<script>
import CircularEconomyDiagram from "../components/CircularEconomyDiagram.vue";
import ActorData from "../components/ActorData.vue";
import { mapState } from "vuex";
export default {
  name: "Diagram",
  components: { ActorData, CircularEconomyDiagram },
  created() {
    this.recordWindowHeight();
    window.addEventListener("resize", this.recordWindowHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.recordWindowHeight);
  },
  mounted() {
    this.recordWindowWidth();
    window.addEventListener("resize", this.recordWindowWidth);
  },
  beforeDestroy() {
    this.$store.commit("resetDiagram");
    if (this.showDiagramInteractionAlert) {
      this.$store.commit("toggleShowDiagramInteractionAlert");
    }
    window.removeEventListener("resize", this.recordWindowWidth);
  },
  computed: {
    ...mapState(["showDiagramInteractionAlert"])
  },
  data: () => ({
    windowWidth: undefined,
    windowHeight: undefined
  }),
  methods: {
    recordWindowWidth() {
      let windowWidth = window.innerWidth;
      this.windowWidth = windowWidth;
    },
    recordWindowHeight() {
      let windowHeight = window.innerHeight;
      this.windowHeight = windowHeight;
    }
  }
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
