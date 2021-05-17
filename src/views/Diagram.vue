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
    <v-alert
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
    </v-alert>
  </div>
</template>

<script>
import CircularEconomyDiagram from "../components/CircularEconomyDiagram.vue";
import ActorData from "../components/ActorData.vue";
import { mapState } from "vuex";
export default {
  name: "Diagram",
  components: { ActorData, CircularEconomyDiagram },
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
    windowWidth: undefined
  }),
  methods: {
    recordWindowWidth() {
      let windowWidth = window.innerWidth;
      this.windowWidth = windowWidth;
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
