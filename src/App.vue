<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-app-bar-nav-icon
        class="ml-3 mt-3 pa-4"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-divider></v-divider>
      <v-list nav dense>
        <!-- <v-subheader>Pages</v-subheader> -->
        <v-list-item-group>
          <v-list-item
            v-for="route in routes"
            :key="route.route"
            @click="navigateToRoute(route)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ route.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app class="brown lighten-5">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Circular Economy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        contain
        lazy-src="http://research.cuningham.com/space-planner/assets/cuningham_logo.png"
        src="http://research.cuningham.com/space-planner/assets/cuningham_logo.png"
        @click="openCgaWebsite()"
        class="mt-1"
        max-height="50"
        max-width="120"
        style="cursor:pointer"
      ></v-img>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import * as d3 from "d3";
import { mapState } from "vuex";
export default {
  name: "App",
  created: function() {
    let self = this;
    d3.csv(self.csvPath).then(function(d) {
      let dataObj = {};
      dataObj.columns = d.columns;
      dataObj.data = [];
      for (let i in d) {
        if (i != "columns") {
          let rowObj = {};
          for (let k in d[i]) {
            let trimmedKey = k.trim().toLowerCase();
            if (d[i][k] == "TRUE") {
              d[i][k] = true;
            }
            if (self.isNumeric(d[i][k])) {
              d[i][k] = Number(d[i][k]);
            }
            rowObj[trimmedKey] = d[i][k];
          }
          dataObj.data.push(rowObj);
        }
      }
      self.setResourceData(dataObj);
    });
  },
  methods: {
    testingMethod: function(testing) {
      console.log("testing", testing);
    },
    navigateToRoute: function(routeInfo) {
      let currentRoute = this.$route.path;
      if (routeInfo.route != currentRoute) {
        this.$router.push(routeInfo.route);
      }
    },
    isNumeric: function(str) {
      if (typeof str != "string") return false; // we only process strings!
      return (
        !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      ); // ...and ensure strings of whitespace fail
    },
    setResourceData: function(data) {
      this.$store.commit("setResourcesData", data);
    },
    openCgaWebsite: function() {
      window.open("https://cuningham.com/", "_blank");
    }
  },
  data: function() {
    return {
      drawer: false,
      routes: [
        {
          name: "Interactive Diagram",
          route: "/"
        },
        {
          name: "List of Resources",
          route: "/resources"
        },
        {
          name: "About",
          route: "/about"
        }
      ]
    };
  },
  computed: {
    ...mapState(["csvPath"])
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.pointer {
  cursor: pointer;
}
.no-select {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
            supported by Chrome, Edge, Opera and Firefox */
}
</style>
