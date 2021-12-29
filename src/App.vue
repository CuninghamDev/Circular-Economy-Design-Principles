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
            :to="route.route"
          >
            <v-list-item-content :ref="route.ref">
              <v-list-item-title>
                {{ route.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      class="brown lighten-5 pr-0 mr-0"
      id="vuetify-application-bar"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Circular Economy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-img
        contain
        lazy-src="http://research.cuningham.com/space-planner/assets/cuningham_logo.png"
        src="http://research.cuningham.com/space-planner/assets/cuningham_logo.png"
        @click="openCgaWebsite()"
        class="mt-1 mr-0 pr-0"
        max-height="30"
        max-width="20vw"
        style="cursor:pointer"
        position="center right"
      ></v-img>
    </v-app-bar>

    <v-main id="vuetify-application-main">
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

    d3.csv(self.resourcesCsvPath).then(function(d) {
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

    d3.csv(self.generalResourcesCsvPath).then(function(d) {
      let dataObj = {};
      dataObj.columns = d.columns;
      dataObj.data = [];
      for (let i in d) {
        if (i != "columns" && i != 0) {
          let rowObj = {};
          for (let k of d.columns) {
            let val = d[i][k];
            if (val.includes("resource")) {
              val = "Resource";
            } else if (val.includes("learn")) {
              val = "Learn";
            } else if (val.includes("example")) {
              val = "Example";
            } else if (val.toLowerCase() == "no") {
              val = false;
            } else if (val.toLowerCase() == "yes") {
              val = true;
            } else if (!isNaN(val) && val != "") {
              val = Number(val);
            }
            rowObj[k.toLowerCase()] = val;
          }
          dataObj.data.push(rowObj);
        }
      }
      self.setGeneralResourceData(dataObj);
      console.log("general resource data", dataObj);
    });
  },
  methods: {
    isNumeric: function(str) {
      if (typeof str != "string") return false; // we only process strings!
      return (
        !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      ); // ...and ensure strings of whitespace fail
    },
    setResourceData: function(data) {
      this.$store.commit("setResourcesData", data);
    },
    setGeneralResourceData: function(data) {
      this.$store.commit("setGeneralResourceData", data);
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
          ref: "diagram",
          route: "/"
        },
        {
          name: "How Circular Is Your Project?",
          ref: "circular-evaluation",
          route: "/circular-evaluation"
        },
        {
          name: "List of Resources",
          ref: "resources",
          route: "/resources"
        },
        {
          name: "About",
          ref: "about",
          route: "/about"
        }
      ]
    };
  },
  computed: {
    ...mapState(["resourcesCsvPath", "generalResourcesCsvPath"])
  }
};
</script>

<style>
.v-application {
  font-family: roboto, sans-serif;
}
.v-toolbar__title {
  font-family: roboto mono;
  font-weight: 500;
}
h3 {
  font-family: roboto mono;
}
.h3 {
  font-family: roboto mono;
}
h5 {
  font-family: roboto mono;
  font-weight: bold;
}
.h5 {
  font-family: roboto mono;
  font-weight: bold;
}
.text-h5 {
  font-family: roboto mono;
  font-weight: bold;
}
.v-card__title {
  font-family: roboto mono !important;
  font-weight: bold;
}
/* #app {
  font-family: roboto, sans-serif;
} */
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
.roboto {
  font-family: roboto;
}
.roboto-mono {
  font-family: roboto mono;
}
</style>
