<template>
  <div class="container-fluid">
    <div class="row mt-5 mx-2">
      <div
        class="col-lg-8 col-xl-6 col-md-12 grey grey lighten-4 elevation-2 rounded-lg"
      >
        <h4>Resources to Learn More About the Circular Economy</h4>
        <p>
          Use the filters below browse through the full list of identified
          resources to find the information most relevant to you
        </p>
      </div>
    </div>
    <div class="row ml-0 mt-6">
      <div class="col-md-4 col-xl-3 mb-0 pb-0 ml-0">
        <v-select
          class="my-0 py-0"
          :items="lifeCycleFilters"
          label="Life Cycle Phase"
          dense
          outlined
          @input="setLifeCycleFilter($event)"
        >
        </v-select>
      </div>

      <div class="col-md-4 col-xl-3  mb-0 pb-0">
        <v-select
          class="my-0 py-0"
          :items="typeFilters"
          label="Type of Resource"
          dense
          outlined
          @input="setTypeFilter($event)"
        >
        </v-select>
      </div>
      <div class="col-md-4 col-xl-3 mb-0 pb-0">
        <v-select
          :items="readTimeFilters"
          label="Quick Reads"
          dense
          outlined
          @input="setReadTimeFilter($event)"
        >
        </v-select>
      </div>
    </div>
    <div class="row mx-2">
      <div class="col-lg-8 col-xl-6 col-md-12 ma-0 pa-0">
        <div class="table-responsive rounded-lg elevation-2 ma-0 pa-0">
          <table class="table table-borderless table-hover ma-0 pa-0">
            <thead class="grey darken-1 text-white elevation-2">
              <th class="border-right header-right-border" scope="col">
                Resource
              </th>
              <th class="border-right header-right-border" scope="col">Type</th>
              <th class="border-right header-right-border" scope="col">
                Read Time
              </th>
              <th scope="col">Lifecycle Phases</th>
            </thead>
            <tbody style="cursor:pointer">
              <tr
                class="border-bottom"
                v-for="(d, i) in filteredResources"
                :key="i"
                @click="openLinkPage(d['external link'])"
              >
                <td class="align-middle">
                  <b>{{ d["short name"] }}</b>
                </td>
                <td class="text-center align-middle">
                  <!-- {{ d["type"] }} -->
                  <v-icon
                    color="grey"
                    v-if="d['type'] == 'Resource'"
                    large
                    :title="d['type']"
                    >mdi-file-table-box-multiple-outline</v-icon
                  >
                  <v-icon
                    color="grey"
                    v-else-if="d['type'] == 'Learn'"
                    large
                    :title="d['type']"
                  >
                    mdi-book-open-page-variant-outline</v-icon
                  >
                  <v-icon
                    color="grey"
                    v-else-if="d['type'] == 'Example'"
                    large
                    :title="d['type']"
                  >
                    mdi-city-variant-outline</v-icon
                  >
                </td>
                <td class="text-center align-middle">
                  <!-- {{ d["read time"] }} -->
                  <v-icon
                    color="grey"
                    v-if="d['read time'] == '2 min'"
                    large
                    :title="d['read time']"
                    >mdi-circle-slice-1</v-icon
                  >
                  <v-icon
                    color="grey"
                    v-else-if="d['read time'] == '5 min'"
                    large
                    :title="d['read time']"
                    >mdi-circle-slice-2</v-icon
                  >
                  <v-icon
                    color="grey"
                    v-else-if="d['read time'] == '10 min'"
                    large
                    :title="d['read time']"
                    >mdi-circle-slice-3</v-icon
                  >
                  <v-icon v-else large title="no listed read time" color="grey"
                    >mdi-circle-slice-5</v-icon
                  >
                </td>
                <td class="align-middle">
                  <div class="container m-0 p-0">
                    <div class="row m-0 p-0">
                      <div
                        class="m-0 p-0"
                        v-for="(lc, k) in d.lifeCycles"
                        :key="k"
                      >
                        <img
                          v-if="lc.flag"
                          :src="lc.link"
                          class="col mx-1 my-1 p-0 rounded-circle bordered"
                          :style="'backgroundColor:' + lc.color"
                          style="width: 40px; min-height: 40px"
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Resources",
  computed: {
    ...mapState(["resourcesData", "actors", "categories"]),
    ...mapGetters(["getLifeCycles"]),
    resourcesWithLifeCycles: function() {
      let resourcesOut = [];
      //this if clause is necessary because the app asynchronously loads the data, and it may not be present on first load
      if (this.resourcesData) {
        let resourcesCopy = JSON.parse(JSON.stringify(this.resourcesData.data));
        for (let resource of resourcesCopy) {
          resource.lifeCycles = {
            "resource exchange": {
              flag: false,
              link: undefined,
              color: undefined
            },
            "design and deliver": {
              flag: false,
              link: undefined,
              color: undefined
            },
            "intelligent built environment": {
              flag: false,
              link: undefined,
              color: undefined
            },
            "end of design life": {
              flag: false,
              link: undefined,
              color: undefined
            }
          };
          for (let key in resource) {
            if (resource[key] == true) {
              for (let actor of this.actors) {
                if (
                  key == actor.actor.toLowerCase() &&
                  !resource.lifeCycles[actor.category.toLowerCase()].flag
                ) {
                  resource.lifeCycles[actor.category.toLowerCase()].flag = true;
                  for (let cat of this.categories) {
                    if (
                      cat.text.toLowerCase() == actor.category.toLowerCase()
                    ) {
                      resource.lifeCycles[actor.category.toLowerCase()].link =
                        cat.whiteIconPath;
                      resource.lifeCycles[actor.category.toLowerCase()].color =
                        cat.color;
                    }
                  }
                }
              }
            }
          }
          resourcesOut.push(resource);
        }
      }

      return resourcesOut;
    },
    filteredResources: function() {
      let filteredResources = [];

      for (let resource of this.resourcesWithLifeCycles) {
        let typeFilter = true;
        let timeFilter = true;
        let lifeCycleFilter = true;
        if (
          this.activeReadTimeFilter != "" &&
          resource["read time"] != this.activeReadTimeFilter
        ) {
          timeFilter = false;
        }
        if (
          this.activeTypeFilter != "" &&
          resource["type"].toLowerCase() != this.activeTypeFilter.toLowerCase()
        ) {
          typeFilter = false;
        }
        if (this.activeLifeCycleFilter != "") {
          let lifeCycleData =
            resource.lifeCycles[this.activeLifeCycleFilter.toLowerCase()];
          if (lifeCycleData.flag == false) {
            lifeCycleFilter = false;
          }
        }

        if (typeFilter && timeFilter && lifeCycleFilter) {
          filteredResources.push(resource);
        }
      }
      return filteredResources;
    }
  },
  methods: {
    setLifeCycleFilter(event) {
      this.activeLifeCycleFilter = event;
    },
    setTypeFilter(event) {
      this.activeTypeFilter = event;
    },
    setReadTimeFilter(event) {
      this.activeReadTimeFilter = event;
    },
    openLinkPage(link) {
      window.open(link, "_blank");
    }
  },
  data: () => ({
    readTimeFilters: ["", "2 min", "5 min", "10 min"],
    typeFilters: ["", "Learn", "Example", "Resource"],
    lifeCycleFilters: [
      "",
      "Design and Deliver",
      "Intelligent Built Environment",
      "End of Design Life",
      "Resource Exchange"
    ],
    activeReadTimeFilter: "",
    activeLifeCycleFilter: "",
    activeTypeFilter: ""
  })
};
</script>

<style scoped>
.header-right-border {
  border-right: 1.5px solid lightgray !important;
}
</style>
