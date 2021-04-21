<template>
  <div
    id="actor-data-container"
    class="container-fluid p-0 m-0 no-select"
    style="vertical-align: 50%; height: 75%"
  >
    <!-- <div class="h2 row mt-5">
      Circular Economy in the Built Environment (envr.)
    </div> -->
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
          <div class="col">
            <v-dialog v-model="dialog" width="750">
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
                <v-card-title class="pb-5 brown lighten-5">
                  Additional Resources
                </v-card-title>
                <v-card-subtitle class="brown lighten-5 pb-1">
                  {{
                    selectedActor.actor.toUpperCase() +
                      " | " +
                      selectedActor.category
                  }}
                </v-card-subtitle>

                <v-list class="transparent">
                  <v-list-item
                    v-for="resource in relevantResources"
                    :key="resource.id"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="h5 font-italic">
                        {{
                          resource["long name"] != ""
                            ? resource["long name"]
                            : resource["short name"]
                        }}
                      </v-list-item-title>
                      <v-list-item-subtitle v-if="resource['type'] != ''">
                        Resource Type: {{ resource["type"].toUpperCase() }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-if="resource['read time'] != ''">
                        Expected Read Time: {{ resource["read time"] }}
                      </v-list-item-subtitle>
                      <v-card-text v-if="'summary' in resource">
                        {{ resource["summary"] }}
                      </v-card-text>
                      <a
                        class="ml-4"
                        v-if="resource['external link'] != ''"
                        :href="resource['external link']"
                        target="_blank"
                      >
                        Link
                      </a>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="relevantResources.length == 0">
                    <v-list-item-content>
                      <v-list-item-title class="h6 red--text">
                        There are currently no listed resources for this topic
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="teal darken-3" text @click="dialog = false">
                    Close
                  </v-btn>
                </v-card-actions>
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
  computed: {
    ...mapState([
      "selectedActor",
      "actorSelected",
      "categorySelected",
      "resourcesData"
    ]),
    ...mapGetters(["selectedActorColor", "getButtons"]),
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
      dialog: false
    };
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
</style>
