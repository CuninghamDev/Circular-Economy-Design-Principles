<template>
  <div class="container-fluid m-0 ml-0 p-0 hide-scrollbar">
    <v-toolbar
      id="circular-evaluation-toolbar"
      elevation="1"
      color="grey lighten-3"
      dense
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            color="brown lighten-5"
            class="ml-0 pa-1 px-2 mr-2"
            style="min-width: 0"
            @click="saveEvaluation"
          >
            <v-icon color="grey darken-2">mdi-content-save-outline</v-icon>
          </v-btn>
        </template>
        <span class="">Save file as JSON</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            color="brown lighten-5"
            class="ml-0 pa-1 px-2 mr-2"
            style="min-width: 0"
            @click="openEvaluation"
          >
            <v-icon color="grey darken-2">mdi-folder-open-outline</v-icon>
          </v-btn>
        </template>
        <span class="">Open JSON file</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            color="brown lighten-5"
            class="ml-0 pa-1 px-2 mr-2"
            style="min-width:0"
            @click="toggleProjectInfoDialog()"
          >
            <v-icon color="grey darken-2">mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <span class="">Edit Project Information</span>
      </v-tooltip>
    </v-toolbar>
    <v-tabs
      class="mt-1"
      v-model="currentTab"
      color="#A80051"
      id="vuetify-tabs-for-evaluation"
    >
      <v-tab v-for="(d, i) in tabData" :key="i">{{ d }}</v-tab>
    </v-tabs>
    <div
      class="row m-0 p-0 border-top"
      v-if="currentTab == 0 || currentTab == 1"
    >
      <div
        class="col-lg-8 col-xl-6 m-0 p-0 "
        :style="'height: ' + heightVmin + 'vh'"
      >
        <input
          v-if="currentTab == 0"
          id="project-name-input"
          class="ml-6 mt-3 h4 invisible-form"
          style="position:absolute; width:80%"
          :value="projectName"
          @input="updateProjectName($event)"
        />

        <CircularEconomyDiagram
          class="ml-9"
          :svgContainerVmin="82"
          :titleClickable="false"
          v-if="currentTab == 0"
        />

        <EvaluationReport v-if="currentTab == 1" :reportVmin="82" />
      </div>
      <div
        class="col-lg-4 col-xl-6 m-0 p-0"
        :style="'height: ' + heightVmin + 'vh'"
      >
        <EvaluationForm />
      </div>
    </div>
    <div class="row m-0 p-0 border-top" v-if="currentTab == 2">
      <div class="col-xl-8 col-lg-10">
        <EvaluationWrittenSummary :reportVmin="82" />
      </div>
    </div>
    <input id="file-input" type="file" name="name" style="display: none" />

    <v-dialog v-model="projectInfoDialog" width="600">
      <v-card>
        <v-card-title
          class="pa-2 ma-0 pl-4 py-3 border-bottom"
          style="backgroundColor:lightgray; z-index: 1000;"
        >
          <h5>Project Information</h5>
        </v-card-title>

        <v-container>
          <v-row class="pt-1">
            <v-col class="pb-0 mb-0">
              <h4>Project Name</h4>
            </v-col>
          </v-row>
          <v-row class="mt-1">
            <v-col class="pb-0 mb-0">
              <v-text-field
                outlined
                :value="projectName"
                @change="alternateUpdateProjectName($event)"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <div class="elevation-3 my-0 py-0">
          <v-divider class="my-0"></v-divider>
          <v-card-actions class="py-1">
            <v-spacer></v-spacer>

            <v-btn color="#06262D" text @click="projectInfoDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CircularEconomyDiagram from "../components/CircularEconomyDiagram.vue";
import EvaluationReport from "../components/EvaluationReport.vue";
import EvaluationForm from "../components/EvaluationForm.vue";
import EvaluationWrittenSummary from "../components/EvaluationWrittenSummary.vue";
import { mapState } from "vuex";
export default {
  name: "CircularEvaluation",
  components: {
    CircularEconomyDiagram,
    EvaluationReport,
    EvaluationForm,
    EvaluationWrittenSummary
  },
  beforeMount() {
    this.$store.commit("buildEvaluationTracking");
  },
  mounted() {
    this.calcContentHeight();
    window.addEventListener("resize", this.calcContentHeight);
    let inputElement = document.getElementById("file-input");
    inputElement.addEventListener("change", handleFiles, false);
    let self = this;
    function handleFiles() {
      const fileList = this.files;
      self.activateOpenedFile(fileList);
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calcContentHeight);
  },
  computed: {
    ...mapState(["projectName"])
  },
  data: () => ({
    tabData: ["Diagram", "Evaluation Report", "Written Summary"],
    currentTab: 0,
    heightVmin: 100,
    additionalResourcesDialog: false,
    projectInfoDialog: false
  }),
  methods: {
    toggleProjectInfoDialog() {
      this.projectInfoDialog = !this.projectInfoDialog;
    },
    updateProjectName(e) {
      this.$store.commit("setState", {
        key: "projectName",
        val: e.target.value
      });
    },
    alternateUpdateProjectName(d) {
      this.$store.commit("setState", {
        key: "projectName",
        val: d
      });
    },
    resetCategory() {
      console.log("reset category called");
      this.$store.commit("selectCategory", {
        toggle: false,
        isSource: true,
        data: undefined,
        sourceType: "parent"
      });
    },
    calcContentHeight() {
      let windowHeight = window.innerHeight;
      let appbarHeight = document.getElementById("vuetify-application-bar")
        .clientHeight;
      let tabsHeight = document.getElementById("vuetify-tabs-for-evaluation")
        .clientHeight;
      let toolbarHeight = document.getElementById("circular-evaluation-toolbar")
        .clientHeight;
      let remainderHeight =
        windowHeight - appbarHeight - tabsHeight - toolbarHeight - 10;
      let heightRatio = (remainderHeight / windowHeight) * 100;
      this.heightVmin = heightRatio;
    },
    saveEvaluation() {
      this.$store.commit("saveEvaluation");
    },
    openEvaluation() {
      // console.log('opening evaluation')
      document.getElementById("file-input").click();
    },
    activateOpenedFile(fileList) {
      let self = this;
      // console.log('activated opened file', fileList[0])
      let reader = new FileReader();
      reader.addEventListener("load", function() {
        // console.log('reader results', reader.results)
        let loadedData = JSON.parse(reader.result);
        self.$store.commit("openEvaluation", loadedData);
      });
      reader.readAsText(fileList[0]);
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
.invisible-form {
  border: none;
  cursor: pointer;
  height: 40px;
}
</style>
