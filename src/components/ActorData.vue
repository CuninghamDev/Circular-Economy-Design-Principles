<template>
  <div
    id="actor-data-container"
    class="container-fluid p-0 m-0 no-select"
    style="vertical-align: 50%; height: 75%"
  >
    <div
      v-if="!actorSelected && !categorySelected"
      class="ml-3 mr-1 row align-items-center h-100 p-0"
      style="color: gray; height: 400px"
    >
      <div class="col m-0 p-0">
        <p class="h4">
          <b><em>Where is your project in its life-cycle? </em></b>
        </p>
        <p class="h6" style="color:gray">
          Select a phase in a built asset's lifecycle to explore applicable
          circular strategies
        </p>
      </div>
    </div>
    <div
      v-if="!actorSelected && categorySelected"
      class="ml-3 mr-1 row align-items-center h-100 p-0"
      style="color: gray; height: 400px"
    >
      <div class="col m-0 p-0">
        <p class="h4">
          <b><em>Explore Circular Strategies</em></b>
        </p>
        <p class="h6" style="color:gray">
          Select the arrows representing circular strategies to access
          additional information
        </p>
      </div>
    </div>
    <div
      v-if="selectedActor.actor != ''"
      class="row align-items-center h-100 p-0 m-2"
    >
      <div class="col m-0 p-0">
        <p class="h7 my-0" style="color:rgb(200,200,200)">
          <em>{{ selectedActor.category }}</em>
        </p>

        <p class="h4" style="color:Gray">
          <b>{{ selectedActor.actor.toUpperCase() }}</b>
        </p>

        <div
          :style="{ background: selectedActorColor, color: 'white' }"
          class="rounded-text-box px-3 py-3"
          v-if="selectedActor.actor != ''"
        >
          <b> {{ selectedActor.details }}</b>
        </div>

        <div class="ml-7">
          <div
            class="row p-0 mx-0 my-2 rounded-text-box"
            v-for="(button, index) in getButtons"
            :key="index"
            :style="{ background: button.color, color: 'white' }"
          >
            <div
              class="col-2 col-sm-3 col-md-2 col-lg-3 col-xl-2 m-0 p-0 align-self-center"
            >
              <img :src="button.whiteIconPath" class="m-0 p-0 pl-1 " />
            </div>
            <div class="col px-1 py-2">
              <b> {{ button.details }} </b>
            </div>
          </div>
        </div>
        <div class="row align-items-end mt-7">
          <div class="col"></div>
          <div class="col"></div>
          <div class="col">
            <v-dialog v-model="dialog" width="950">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="teal darken-3"
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  @click="dialog = true"
                >
                  Additional Resources
                </v-btn>
              </template>

              <v-card>
                <v-card-title
                  class=" text-white pa-2 ma-0 elevation-3"
                  :style="'backgroundColor:' + selectedActorColor"
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
                            :src="activeCategory.whiteIconPath"
                            style="height:100px; width:100px"
                          />
                        </td>
                        <td class="align-bottom text-left ma-0 pa-0">
                          <p
                            class="h5 ma-0 pa-0 text-white"
                            style="overflow-wrap:break-word; hyphens: auto"
                          >
                            {{ selectedActor.actor.toUpperCase() }}
                          </p>
                        </td>
                      </tr>
                      <tr class="ma-0 pa-0">
                        <td class="ma-0 pa-0 align-top">
                          <p class="ma-0 pa-0 text-white">
                            Additional Resources
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </v-card-title>

                <v-container
                  style="z-index:0"
                  class="my-0 pb-4 pt-4 hide-scrollbar"
                  :style="
                    'max-height:' +
                      this.windowHeight * 0.5 +
                      'px; overflow-y: auto'
                  "
                >
                  <v-row class="py-1">
                    <v-col v-if="relevantResources.length == 0">
                      <p class="red--text text--darken-4">
                        No resources are listed for this circular strategy
                      </p>
                      <p class="red--text text--darken-4">
                        Use the "Suggest Resource" button below to suggest
                        missing resources that should be added to this database
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
                        <v-card-title class="text-h5">
                          {{ resource["short name"] }}
                        </v-card-title>
                        <v-card-subtitle v-if="resource['long name'] != ''">
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
                                  <p class="h6">{{ resource["summary"] }}</p>
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
                                    v-else-if="
                                      resource['read time'] == '10 min'
                                    "
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
                      color="blue accent-4"
                      class="elevation-2"
                      @click="navigateToRoute('/suggest-resource')"
                      outlined
                      >Suggest Resource</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn color="teal darken-3" text @click="dialog = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ActorData",
  created() {
    this.recordWindowHeight();
    window.addEventListener("resize", this.recordWindowHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.recordWindowHeight);
  },
  computed: {
    ...mapState([
      "selectedActor",
      "actorSelected",
      "categorySelected",
      "resourcesData",
      "categories"
    ]),
    ...mapGetters(["selectedActorColor", "getButtons"]),
    activeCategory() {
      let activeCategory = {};
      for (let cat of this.categories) {
        if (
          cat.text.toLowerCase() == this.selectedActor.category.toLowerCase()
        ) {
          activeCategory = cat;
        }
      }
      return activeCategory;
    },
    titleDataObj() {
      return {
        background: this.selectedActorColor,
        color: "white",
        borderRadius: "14px"
      };
    },
    actorFilter() {
      return this.selectedActor.actor.toLowerCase();
    },
    relevantResources() {
      let actorFilter = this.actorFilter;
      let relevantResources = [];
      for (let d of this.resourcesData.data) {
        if (actorFilter in d) {
          if (d[actorFilter] === true) {
            relevantResources.push(d);
          }
        }
      }

      return relevantResources;
    }
  },
  data: function() {
    return {
      dialog: false,
      windowHeight: undefined
    };
  },
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
    recordWindowHeight() {
      let windowHeight = window.innerHeight;
      this.windowHeight = windowHeight;
    }
  }
};
</script>

<style>
.rounded-text-box {
  border-radius: 14px;
}
.ml-7 {
  margin-left: 6rem;
}
.modal {
  padding: 0 !important;
}
.modal-open {
  padding: 0 !important;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
