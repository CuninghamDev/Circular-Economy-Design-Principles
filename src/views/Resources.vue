<template>
  <div class="container-fluid mt-4">
    <div class="row p-4 pb-5">
      <div class="col-lg-7 grey grey lighten-4 elevation-2 rounded-lg">
        <h4>Resources to Learn More About the Circular Economy</h4>
        <p>
          Use the filters below browse through the full list of identified
          resources to find the information most relevant to you
        </p>
      </div>
    </div>
    <div class="row pt-0 mt-0 mb-0 px-2 pb-0">
      <div class="col-md-3 pb-0 mb-0">
        <v-select
          :items="readTimeFilters"
          label="Quick Reads"
          dense
          outlined
          @input="setReadTimeFilter($event)"
        >
        </v-select>
      </div>
      <div class="col-md-3 pb-0 mb-0">
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
      <div class="col-md-3 pb-0 mb-0">
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
    </div>
    <div class="row pt-0 mt-0 pb-1 px-2 my-0">
      <div class="col-lg-12 py-0 my-0">
        <div class="table-responsive rounded-lg elevation-2">
          <table class="table table-borderless table-hover">
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
                v-for="(d, i) in resourcesData.data"
                :key="i"
                @click="openLinkPage(d['external link'])"
              >
                <td>{{ d["short name"] }}</td>
                <td>{{ d["type"] }}</td>
                <td>{{ d["read time"] }}</td>
                <td>Set of Icons</td>
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
    ...mapState(["resourcesData"]),
    ...mapGetters(["getLifeCycles"]),
    filteredResources: function() {
      return "something";
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
