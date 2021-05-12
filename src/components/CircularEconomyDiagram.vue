<template>
  <div id="svg-container" class="hide-scrollbar">
    <svg id="circular-economy-background-svg"></svg>
    <div id="circular-economy-diagram-div" class="no-select"></div>
    <svg id="circular-economy-diagram-svg"></svg>

    <v-dialog v-model="dialog" width="950">
      <v-card>
        <v-card-title
          class=" text-white pa-2 ma-0 elevation-3 brown lighten-5 bordered-bottom"
          style="z-index:1000"
        >
          <table class="table table-borderless ma-4">
            <tbody class="ma-0 pa-0">
              <tr class="ma-0 pa-0">
                <td class="align-bottom text-left ma-0 pa-0">
                  <p
                    class="h5 ma-0 pa-0 text-gray"
                    style="overflow-wrap:break-word; hyphens: auto"
                  >
                    CIRCULAR ECONOMY IN THE BUILT ENVIRONMENT
                  </p>
                </td>
              </tr>
              <tr class="ma-0 pa-0">
                <td class="ma-0 pa-0 align-top">
                  <p class="ma-0 pa-0 text-gray">
                    General Resources to Learn More About the Circular Economy
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
            'max-height:' + this.windowHeight * 0.5 + 'px; overflow-y: auto'
          "
        >
          <v-row class="py-1">
            <v-col
              v-for="resource in generalResources"
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
                            v-else-if="resource['read time'] == '10 min'"
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
            <v-spacer></v-spacer>
            <v-btn color="teal darken-3" text @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as d3 from "d3";

export default {
  name: "CircularEconomyDiagram",
  created() {
    this.recordWindowHeight();
    window.addEventListener("resize", this.recordWindowHeight);
  },
  mounted() {
    let backgroundSvgId = "circular-economy-background-svg";
    let svgId = "circular-economy-diagram-svg";
    let divId = "circular-economy-diagram-div";
    let containerId = "svg-container";
    this.buildDiagram(
      this.combinedState,
      backgroundSvgId,
      svgId,
      divId,
      containerId
    );
    window.addEventListener("resize", this.resizeDiagram);
  },
  watch: {},
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeDiagram);
  },
  destroyed() {
    window.removeEventListener("resize", this.recordWindowHeight);
  },
  computed: {
    combinedState() {
      return {
        actors: this.actors,
        buttons: this.buttons,
        categories: this.categories,
        activities: this.activities,
        outterRing: this.outterRing,
        geometry: this.geometry,
        title: this.title
      };
    },
    ...mapState([
      "actors",
      "buttons",
      "categories",
      "activities",
      "outterRing",
      "geometry",
      "blankActor",
      "title",
      "generalResourceData"
    ]),
    generalResources() {
      if (this.generalResourceData) {
        return this.generalResourceData.data;
      } else {
        return [];
      }
    }
  },
  data() {
    return {
      diagram: {},
      dialog: false,
      windowHeight: undefined
    };
  },
  methods: {
    recordWindowHeight() {
      let windowHeight = window.innerHeight;
      this.windowHeight = windowHeight;
    },

    toggleDialog() {
      this.dialog ? (this.dialog = false) : (this.dialog = true);
    },

    buildDiagram(_data, _backgroundId, _svgId, _divId, _containerId) {
      let diagram = this.diagram;

      console.log("building the circular economy diagram");
      diagram.data = _data;
      diagram.background = d3.select("#" + _backgroundId);
      diagram.svg = d3.select("#" + _svgId);
      diagram.div = d3.select("#" + _divId);
      diagram.container = document.getElementById(_containerId);
      diagram.padding = 10;
      diagram.categoryOffset = 20;

      diagram.width = d3.select(diagram.container).attr("width");
      diagram.height = d3.select(diagram.container).attr("height");

      this.structureData();
      this.resizeDiagram(diagram.width, diagram.height);
      this.calcGeoms();

      diagram.rotationTracker = diagram.data.geometry.startRotation;
      diagram.previousRotation = diagram.data.geometry.startRotation;
      diagram.rotationTime = 100;

      diagram.svg.append("g").attr("class", "stage");
      diagram.svg.append("g").attr("class", "diagram-title");

      diagram.svg.append("g").attr("class", "outter-ring");
      diagram.svg.append("g").attr("class", "activities-ring");
      diagram.svg.append("g").attr("class", "activities-text");
      diagram.svg.append("g").attr("class", "category-ring");
      diagram.svg.append("g").attr("class", "category-text");
      diagram.svg.append("g").attr("class", "category-icons");
      diagram.svg.append("g").attr("class", "actors-group");

      diagram.svg.append("defs");

      this.createDropShadowFilter();
      this.generalUpdatePattern();
    },

    ////////////////////////////////////////////////////////////////////////////////////////////
    //////////// BUILDING OUT THE DATA FOR THE DIAGRAM ////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    createDropShadowFilter() {
      let svg = this.diagram.svg;
      let dropShadowFilter = svg
        .select("defs")
        .append("filter")
        .attr("id", "dropshadow")
        .attr("y", "-100%")
        .attr("height", "300%")
        .attr("x", "-100%")
        .attr("width", "300%");
      dropShadowFilter
        .append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 4)
        .attr("result", "blur");
      dropShadowFilter
        .append("feOffset")
        .attr("in", "blur")
        .attr("dx", 5)
        .attr("dy", 8)
        .attr("result", "offsetBlur");
      dropShadowFilter
        .append("feFlood")
        .attr("in", "offsetBlur")
        .attr("flood-opacity", "0.5")
        .attr("result", "offsetColor");
      dropShadowFilter
        .append("feComposite")
        .attr("in", "offsetColor")
        .attr("in2", "offsetBlur")
        .attr("operator", "in")
        .attr("result", "offsetBlur");

      let feMerge = dropShadowFilter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "offsetBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    },

    structureData() {
      let diagram = this.diagram;
      let raw = diagram.data;
      diagram.structuredData = {};
      let structData = diagram.structuredData;
      structData.title = raw.title;
      structData.geometry = {};
      structData.geometry.startRotation = raw.geometry.startRotation;
      structData.geometry.arrowRotation = raw.geometry.arrowRotation;
      structData.geometry.catRotArc = (Math.PI * 2) / raw.categories.length;
      structData.geometry.outterRingArc = (Math.PI * 2) / raw.outterRing.length;
      structData.geometry.halfCatArc = structData.geometry.catRotArc / 2;
      structData.categories = [];
      for (let i in raw.categories) {
        let cat = raw.categories[i];
        cat.startAngle = structData.geometry.catRotArc * i;
        cat.endAngle = cat.startAngle + structData.geometry.catRotArc;
        structData.categories.push(cat);
      }
      structData.activities = [];
      for (let i in raw.activities) {
        let act = raw.activities[i];
        act.startAngle = structData.geometry.catRotArc * i;
        act.endAngle = act.startAngle + structData.geometry.catRotArc;
        structData.activities.push(act);
      }
      let categorizedActorData = [];
      for (let cat of structData.categories) {
        let catAct = {};
        catAct.category = cat.text;
        catAct.actorCount = 0;
        catAct.actors = [];
        catAct.startAngle = cat.startAngle;
        catAct.endAngle = cat.endAngle;
        for (let i in raw.actors) {
          let actorData = raw.actors[i];
          if (actorData.category == catAct.category) {
            let actorObj = {
              actor: actorData.actor,
              short: actorData.short,
              "actor data": actorData
            };
            catAct.actors.push(actorObj);
            catAct.actorCount++;
          }
        }
        categorizedActorData.push(catAct);
      }
      structData.actors = [];
      for (let catAct of categorizedActorData) {
        let radialStep =
          (catAct.endAngle - catAct.startAngle) / catAct.actorCount;
        let firstStep = radialStep / 2;
        for (let i in catAct.actors) {
          let actor = catAct.actors[i];
          actor.actorAngle = catAct.startAngle + firstStep + radialStep * i;
          structData.actors.push(actor);
        }
      }
      structData.outterRing = [];
      for (let i in raw.outterRing) {
        let ringData = raw.outterRing[i];
        ringData.startAngle =
          structData.geometry.startRotation +
          structData.geometry.outterRingArc * i -
          Math.PI / 4;
        ringData.endAngle =
          ringData.startAngle + structData.geometry.outterRingArc;
        structData.outterRing.push(ringData);
      }
      console.log("diagram data structured");
    },

    calcGeoms() {
      let diagram = this.diagram;
      let geo = diagram.structuredData.geometry;

      geo.lineWeight = diagram.controllingDim / 500;
      geo.heavyLineWeight = diagram.controllingDim / 300;
      geo.actorSelectRadiusIncrease = 20;
      geo.stagePadding = 1;
      geo.activitiesPadding = 5;
      geo.radius = (diagram.controllingDim / 2) * (6 / 16);
      geo.radiusWidth = (diagram.controllingDim / 2) * (5 / 22);
      geo.categoryTextInset = (geo.radiusWidth * 4) / 7;

      geo.outterRingWidth = (diagram.controllingDim / 2) * (1 / 14);
      geo.outterRingOffset = (diagram.controllingDim / 2) * (1 / 75);
      geo.stageRadius = (diagram.controllingDim / 2) * (1 / 5);

      geo.iconDims = (diagram.controllingDim / 2) * (1 / 5);
      // geo.iconRadius = (diagram.controllingDim / 2) * (1 / 8);
      geo.iconRadius = geo.radius + geo.radiusWidth / 2;
      geo.actorArrow = {};
      geo.actorArrow.radius = geo.radius + geo.radiusWidth;
      geo.actorArrow.width = diagram.controllingDim / 2 - geo.actorArrow.radius;
      geo.actorArrow.height = diagram.controllingDim / 33;
      geo.actorArrow.growWidth = diagram.controllingDim / 75;
      geo.actorArrow.inset = diagram.controllingDim / 85;
      geo.actorArrow.growHeight = diagram.controllingDim / 100;

      geo.centerX = diagram.controllingDim / 2;
      geo.centerY = diagram.height / 2;
    },

    ////////////////////////////////////////////////////////////////////////////////////////////
    //////////// MODIFICATIONS TO THE DIAGRAM ////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    rotate(_rotation) {
      let diagram = this.diagram;
      diagram.previousRotation = diagram.rotationTracker;
      diagram.rotationTracker += _rotation;
      diagram.rotationTime = 800;
      this.generalUpdatePattern();
    },

    resizeDiagram() {
      console.log("diagram resized");
      let diagram = this.diagram;
      let background = diagram.background;
      let svg = diagram.svg;
      let div = diagram.div;
      diagram.containerBounds = diagram.container.getBoundingClientRect();
      let cb = diagram.containerBounds;
      diagram.width = cb.right - cb.left;
      diagram.height = cb.bottom - cb.top;
      this.getControllingDim();
      background.style("position", "absolute");
      background.attr("width", diagram.controllingDim);
      background.attr("height", diagram.height);
      background.style("left", function() {
        return diagram.width - diagram.controllingDim + "px";
      });
      background.style("top", "0px");
      svg.style("position", "absolute");
      svg.attr("width", diagram.controllingDim);
      svg.attr("height", diagram.height);
      svg.style("left", function() {
        return diagram.width - diagram.controllingDim + "px";
      });
      svg.style("top", "0px");
      div.style("position", "absolute");
      div.style("right", "0px");
      div.style("top", "0px");
      div.style("width", function() {
        return diagram.controllingDim + "px";
      });
      div.style("height", diagram.height);
      this.calcGeoms();
      this.generalUpdatePattern();
    },

    getControllingDim() {
      let diagram = this.diagram;
      if (diagram.width < diagram.height) {
        diagram.controllingDim = diagram.width;
      } else {
        diagram.controllingDim = diagram.height;
      }
    },

    ////////////////////////////////////////////////////////////////////////////////////////////
    //////////// STARTING THE GENERAL UPDATE PATTERN ////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////

    generalUpdatePattern() {
      console.log("general update pattern run");

      let component = this;
      let self = this.diagram;
      let background = self.background;
      let svg = self.svg;
      let div = self.div;
      let data = self.structuredData;
      // console.log("structured diagram data", data);
      let geomData = data.geometry;
      let catData = data.categories;
      let actorData = data.actors;
      let activityData = data.activities;
      let titleData = [data.title];
      // console.log("title data", self);

      // console.log("category data to images", catData);

      svg
        .select(".category-icons")
        .attr(
          "transform",
          "translate(" + geomData.centerX + "," + geomData.centerY + ")"
        );
      let iconGroups = svg
        .select(".category-icons")
        .selectAll(".icon-groups")
        .data(catData)
        .join("g")
        .classed("icon-groups", true);
      iconGroups
        .transition()
        .duration(self.rotationTime)
        .attr(
          "transform",
          "rotate(" + (self.rotationTracker * 180) / Math.PI + ")"
        );

      let iconPlacementGroups = iconGroups
        .selectAll(".icon-rotation-groups")
        .data(d => [d])
        .join("g")
        .classed("icon-rotation-groups", true)
        .attr("transform", d => {
          let rotationAngle = d.endAngle - Math.PI * 0.04;
          return "rotate(" + (rotationAngle * 180) / Math.PI + ")";
        });

      let iconImages = iconPlacementGroups
        .selectAll(".category-icon-images")
        .data(d => [d])
        .join(enter =>
          enter
            .append("image")
            .attr("xlink:href", d => d.whiteIconPath)
            .classed("category-icon-images", true)
        )
        .attr("x", geomData.iconRadius + (geomData.iconDims * -1) / 2)

        .attr("y", (geomData.iconDims * -1) / 2)
        .attr("width", geomData.iconDims)
        .attr("height", geomData.iconDims);
      iconImages
        // .transition()
        // .delay(self.rotationTime)
        // .duration(1)
        .attr("transform", d => {
          let rotationAngle = d.endAngle - Math.PI * 0.04;
          let counterRotation = rotationAngle * -1 - self.rotationTracker;
          return (
            "rotate(" +
            (counterRotation * 180) / Math.PI +
            "," +
            geomData.iconRadius +
            ",0)"
          );
        });

      svg
        .select(".diagram-title")
        .attr(
          "transform",
          "translate(" + geomData.centerX + "," + geomData.centerY + ")"
        );
      let diagramData = ["CIRCULAR ECONOMY", "IN THE BUILT", "ENVIRONMENT"];
      let diagramTitle = svg
        .select(".diagram-title")
        .selectAll(".diagram-title-text")
        .data(diagramData)
        .join("text")
        .classed("diagram-title-text", true)
        .classed("no-select", true)
        .text(d => d)
        .style("text-anchor", "middle")
        .attr("startOffset", "50%")
        .style("font-family", "Arial, Helvetica, sans-serif")
        .style("dominant-baseline", "middle")
        .style("fill", "gray")
        .style("font-size", function() {
          return self.controllingDim * 0.026 + "px";
        })
        .style("font-weight", "bold")
        .style("cursor", "pointer")
        .attr("filter", "none")
        .attr("transform", (d, i) => {
          let stepSize = self.controllingDim * 0.026;
          let startStep = stepSize * -1;
          let yTransform = startStep + stepSize * i;
          return "translate(0," + yTransform + ")";
        });
      diagramTitle.on("mouseover", function() {
        d3.select(this.parentNode)
          .selectAll(".diagram-title-text")
          .transition()
          .duration(150)
          .style("fill", "#303030")
          .style("font-weight", "bolder");
      });
      diagramTitle.on("mouseout", function() {
        d3.select(this.parentNode)
          .selectAll(".diagram-title-text")
          .transition()
          .duration(150)
          .style("fill", "gray")
          .style("font-weight", "bold");
      });

      diagramTitle.on("click", function() {
        component.toggleDialog();
        console.log("diagram title clicked");
      });

      //////////////////
      // OUTTER RING
      svg
        .select(".outter-ring")
        .attr(
          "transform",
          "translate(" + geomData.centerX + "," + geomData.centerY + ")"
        );
      let outterRingGroups = svg
        .select(".outter-ring")
        .selectAll(".outter-ring-rotation-groups")
        .data(data.outterRing)
        .join("g")
        .classed("outter-ring-rotation-groups", true);
      outterRingGroups
        .transition()
        .duration(self.rotationTime)
        .attr(
          "transform",
          "rotate(" + (self.rotationTracker * 180) / Math.PI + ")"
        );
      let outterRingShapeGenerator = function(ringData) {
        let startAngle = ringData.startAngle;
        let endAngle = ringData.endAngle;
        let innerRadius =
          geomData.radius + geomData.radiusWidth + geomData.outterRingOffset;
        let outterRadius = innerRadius + geomData.outterRingWidth;
        let centerX = 0;
        let centerY = 0;
        let x1 = Math.cos(startAngle) * innerRadius + centerX;
        let y1 = Math.sin(startAngle) * innerRadius + centerY;
        // let x2 = Math.cos(startAngle) * outterRadius + centerX
        // let y2 = Math.sin(startAngle) * outterRadius + centerY
        let x2 = Math.cos(endAngle) * innerRadius + centerX;
        let y2 = Math.sin(endAngle) * innerRadius + centerY;
        let path = d3.path();
        path.moveTo(x1, y1);
        // path.lineTo(x2,y2)
        path.arc(centerX, centerY, outterRadius, startAngle, endAngle);
        path.lineTo(x2, y2);
        path.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        let pathData = path.toString();
        return pathData;
      };
      let outterRingShapes = outterRingGroups
        .selectAll(".outter-ring-shapes")
        .data(d => [d])
        .join(enter =>
          enter
            .append("path")
            .attr("fill", d => d.color)
            .attr("opacity", 0.3)
            .classed("outter-ring-shapes", true)
        )
        .attr("d", d => outterRingShapeGenerator(d));
      let outterRingTextPathGenerator = function(ringData) {
        let startAngle = ringData.startAngle;
        let endAngle = ringData.endAngle;
        let radius =
          geomData.radius +
          geomData.radiusWidth +
          geomData.outterRingOffset +
          geomData.outterRingWidth / 2;
        let centerX = 0;
        let centerY = 0;
        let startX = Math.cos(startAngle) * radius + centerX;
        let startY = Math.sin(startAngle) * radius + centerY;
        let path = d3.path();
        path.moveTo(startX, startY);
        path.arc(centerX, centerY, radius, startAngle, endAngle);
        let pathData = path.toString();
        return pathData;
      };
      let outterRingTextGroups = outterRingGroups
        .selectAll(".outter-ring-text-paths")
        .data(d => [d])
        .join(
          enter =>
            enter
              .append("path")
              .classed("outter-ring-text-paths", true)
              .attr("fill", "none")
              .attr("id", d => {
                let idTag = d.text.split(" ").join("-");
                let lowerCaseId = idTag.toLowerCase();
                return "outter-ring-text-path-" + lowerCaseId;
              })
              .attr("d", d => outterRingTextPathGenerator(d)),
          update => update.attr("d", d => outterRingTextPathGenerator(d))
        );

      let outterRingText = outterRingGroups
        .selectAll(".outter-ring-text")
        .data(d => [d])
        .join(enter => enter.append("text").classed("outter-ring-text", true))
        .selectAll(".outter-ring-text-pathed")
        .data(d => [d])
        .join(enter =>
          enter
            .append("textPath")
            .classed("outter-ring-text-pathed", true)
            .classed("no-select", true)
            .attr("xlink:href", d => {
              let idTag = d.text.split(" ").join("-");
              let lowerCaseId = idTag.toLowerCase();
              return "#outter-ring-text-path-" + lowerCaseId;
            })
            .style("text-anchor", "middle")
            .attr("startOffset", "50%")
            .text(d => d.text.toUpperCase())
            .style("font-family", "Arial, Helvetica, sans-serif")
            .style("fill", "white")
            .style("dominant-baseline", "middle")

            .style("opacity", 1)
        )
        .style("font-size", function() {
          return self.controllingDim * 0.02 + "px";
        });
      let categoryTextPathGenerator = function(catData) {
        let startAngle = catData.startAngle;
        let endAngle = catData.endAngle;
        let radius =
          geomData.radius +
          geomData.categoryTextInset -
          self.controllingDim * 0.028 * catData.index;
        let centerX = 0;
        let centerY = 0;
        let startX = Math.cos(startAngle) * radius + centerX;
        let startY = Math.sin(startAngle) * radius + centerY;
        let path = d3.path();
        path.moveTo(startX, startY);
        path.arc(centerX, centerY, radius, startAngle, endAngle);
        let pathData = path.toString();
        return pathData;
      };

      //////////////////
      // CATEGORIES AND PRIMARY RING
      console.log("category data", catData);
      let categoryTextData = [];
      for (let d of catData) {
        for (let i in d.ringText) {
          let t = d.ringText[i];
          let dataCopy = JSON.parse(JSON.stringify(d));
          dataCopy.ringLineText = t;
          dataCopy.index = parseInt(i);
          categoryTextData.push(dataCopy);
        }
      }

      console.log("category text data", categoryTextData);
      svg
        .select(".category-text")
        .attr(
          "transform",
          "translate(" + geomData.centerX + "," + geomData.centerY + ")"
        );

      let categoryTextGroups = svg
        .select(".category-text")
        .selectAll("g")
        .data(categoryTextData)
        .join("g");
      categoryTextGroups
        .transition()
        .duration(self.rotationTime)
        .attr(
          "transform",
          "rotate(" + (self.rotationTracker * 180) / Math.PI + ")"
        );

      let categoryTextPath = categoryTextGroups
        .selectAll(".category-text-paths")
        .data(d => [d])
        .join(enter =>
          enter
            .append("path")
            .classed("category-text-paths", true)
            .attr("id", d => {
              let idTag = d.ringLineText.split(" ").join("-");
              let lowerCaseId = idTag.toLowerCase();
              return "cat-text-path-" + lowerCaseId;
            })
            .style("fill", "none")
        )
        .attr("d", d => categoryTextPathGenerator(d));

      let categoryText = categoryTextGroups
        .selectAll(".category-text")
        .data(d => [d])
        .join(enter => enter.append("text").classed("category-text", true))
        .selectAll(".category-text-to-path")
        .data(d => [d])
        .join(enter =>
          enter
            .append("textPath")
            .classed("category-text-to-path", true)
            .classed("pointer", true)
            .classed("no-select", true)
            .classed("category-hover", true)
            .attr("xlink:href", d => {
              let idTag = d.ringLineText.split(" ").join("-");
              let lowerCaseId = idTag.toLowerCase();
              let id = "#cat-text-path-" + lowerCaseId;
              return id;
            })
            .style("text-anchor", "middle")
            .attr("startOffset", "45%")
            .text(d => d.ringLineText.toUpperCase())
            .style("font-family", "Arial, Helvetica, sans-serif")
            .style("fill", "white")
            .style("dominant-baseline", "middle")

            .style("opacity", 1)
        )
        .style("font-size", function() {
          return self.controllingDim * 0.024 + "px";
        });
      categoryText.on("click", function(e, d) {
        categoryClick(d, e, this);
      });

      let buildCategoryPath = function(catData) {
        let startAngle = catData.startAngle;
        let endAngle = catData.endAngle;
        let arrowRotation = geomData.arrowRotation;
        let radius = geomData.radius;
        let exteriorRadius = radius + geomData.radiusWidth;
        let centerX = 0;
        let centerY = 0;
        let x1 = Math.cos(startAngle) * radius + centerX;
        let y1 = Math.sin(startAngle) * radius + centerY;
        let x2 =
          Math.cos(startAngle + arrowRotation) *
            (radius + (exteriorRadius - radius) / 2) +
          centerX;
        let y2 =
          Math.sin(startAngle + arrowRotation) *
            (radius + (exteriorRadius - radius) / 2) +
          centerY;
        let x3 =
          Math.cos(endAngle + arrowRotation) *
            (radius + (exteriorRadius - radius) / 2) +
          centerX;
        let y3 =
          Math.sin(endAngle + arrowRotation) *
            (radius + (exteriorRadius - radius) / 2) +
          centerY;

        let path = d3.path();
        path.moveTo(x1, y1);
        path.lineTo(x2, y2);
        path.arc(centerX, centerY, exteriorRadius, startAngle, endAngle);
        path.lineTo(x3, y3);
        path.arc(centerX, centerY, radius, endAngle, startAngle, true);
        let pathData = path.toString();

        return pathData;
      };

      svg
        .select(".category-ring")
        .attr(
          "transform",
          "translate(" + geomData.centerX + "," + geomData.centerY + ")"
        );
      let categoryGroups = svg
        .select(".category-ring")
        .selectAll("g")
        .data(catData)
        .join("g");
      categoryGroups
        .transition()
        .duration(self.rotationTime)
        .attr(
          "transform",
          "rotate(" + (self.rotationTracker * 180) / Math.PI + ")"
        );
      let categoryShapes = categoryGroups
        .selectAll(".category-shapes")
        .data(d => [d])
        .join(enter =>
          enter
            .append("path")
            .classed("category-shapes", true)
            .classed("category-hover", true)
            .classed("pointer", true)

            .attr("fill", function(d) {
              return d.color;
            })

            .attr("stroke", "white")
            .attr("filter", "none")
            .attr("transform", "translate(0,0)")
            .attr("opacity", 1)
        )
        .attr("stroke-width", () => geomData.heavyLineWeight)
        .attr("d", d => buildCategoryPath(d));

      categoryShapes.on("click", function(e, d) {
        categoryClick(d, e, this);
      });

      //////////////////
      // ACTOR OBJECTS

      svg
        .select(".actors-group")
        .attr(
          "transform",
          "translate(" + geomData.centerX + "," + geomData.centerY + ")"
        );
      let actorCenteringGroup = svg
        .select(".actors-group")
        .selectAll(".actor-centering-groups")
        .data(actorData)
        .join("g")
        .classed("actor-centering-groups", true);
      actorCenteringGroup
        .transition()
        .duration(self.rotationTime)
        .attr(
          "transform",
          "rotate(" + (self.rotationTracker * 180) / Math.PI + ")"
        );

      let actorGroups = actorCenteringGroup
        .selectAll(".actor-rotation-groups")
        .data(d => [d])
        .join(enter =>
          enter
            .append("g")
            .classed("actor-rotation-groups", true)
            .classed("pointer", false)
            .attr("transform", function(d) {
              return "rotate(" + d.actorAngle * (180 / Math.PI) + ")";
            })
            .attr("opacity", 0)
            .classed("actor-selected", false)
        );

      actorGroups.on("click", function(e, d) {
        actorClick(d, e, this);
        console.log("actor clicked");
      });

      let actorShapeGenerator = function(selected) {
        let arrowAdjust = 10;
        if (selected) {
          arrowAdjust =
            (geomData.actorArrow.growHeight + geomData.actorArrow.growWidth) /
              2 +
            arrowAdjust / 2;
        }
        let centerY = 0;
        let topY = geomData.actorArrow.height / 2;
        let bottomY = geomData.actorArrow.height / -2;

        let centerX = geomData.actorArrow.radius - geomData.actorArrow.inset;
        let tailX = centerX;
        let pointX = centerX + geomData.actorArrow.width;
        let edgeX = pointX - arrowAdjust;

        let growY = geomData.actorArrow.growHeight;
        let growX = geomData.actorArrow.growWidth;

        // pointX -= growX;
        // edgeX -= growX;

        if (selected) {
          topY += growY;
          bottomY -= growY;
          centerX -= growX;
          tailX -= growX;
          // pointX += growX;
          // edgeX += growX;
        }

        let path = d3.path();
        //path.moveTo(centerX, centerY);
        path.moveTo(tailX, bottomY);
        path.lineTo(edgeX, bottomY);
        path.lineTo(pointX, centerY);
        path.lineTo(edgeX, topY);
        path.lineTo(tailX, topY);
        path.lineTo(tailX, bottomY);
        let pathData = path.toString();
        return pathData;
      };

      let actorShapes = actorGroups
        .selectAll("path")
        .data(d => [d])
        .join(enter =>
          enter
            .append("path")
            .style("stroke", "white")

            .style("fill", d => {
              for (let cat of catData) {
                if (cat.text == d["actor data"].category) {
                  return cat.color;
                }
              }
              return "gray";
            })
        )
        .style("stroke-width", () => geomData.lineWeight)
        .attr("filter", function(d) {
          let selected = d3.select(this).classed("actor-selected");
          if (selected) {
            return "url(#dropshadow)";
          } else {
            return "none";
          }
        })
        .transition()
        .attr("d", function() {
          let selected = d3.select(this).classed("actor-selected");
          if (selected) {
            return actorShapeGenerator(true);
          } else {
            return actorShapeGenerator(false);
          }
        });

      let actorText = actorGroups
        .selectAll("text")
        .data(d => [d])
        .join(enter =>
          enter
            .append("text")
            .classed("no-select", true)
            .style("font-family", "Arial, Helvetica, sans-serif")
            .style("font-size", "1.4vmin")
            .style("fill", "white")

            .attr("y", 0)
            .text(d => d.short)

            .attr("dominant-baseline", "middle")
        )
        .attr("transform", function(d) {
          let testAngle =
            (d.actorAngle + self.rotationTracker + Math.PI * 2) % (Math.PI * 2);
          if (testAngle < Math.PI * 1.5 && testAngle > Math.PI * 0.5) {
            return "rotate(180," + (self.controllingDim / 2 - 10) + ",0)";
          } else {
            return "rotate(0)";
          }
        })
        .attr("x", function(d) {
          let testAngle =
            (d.actorAngle + self.rotationTracker + Math.PI * 2) % (Math.PI * 2);
          if (testAngle < Math.PI * 1.5 && testAngle > Math.PI * 0.5) {
            return self.controllingDim / 2 + self.controllingDim * 0.001;
          } else {
            return geomData.actorArrow.radius + self.controllingDim * 0.003;
          }
        })
        .transition()
        .style("font-size", function(d) {
          let selected = d3
            .select(this.parentNode)
            .select("path")
            .classed("actor-selected");
          if (selected) {
            return self.controllingDim * 0.0172 + "px";
          } else {
            return self.controllingDim * 0.015 + "px";
          }
        })
        .attr("x", function(d) {
          let selected = d3
            .select(this.parentNode)
            .select("path")
            .classed("actor-selected");
          let testAngle =
            (d.actorAngle + self.rotationTracker + Math.PI * 2) % (Math.PI * 2);
          if (testAngle < Math.PI * 1.5 && testAngle > Math.PI * 0.5) {
            return self.controllingDim / 2 + self.controllingDim * 0.001;
          } else if (selected) {
            return geomData.actorArrow.radius - self.controllingDim * 0.015;
          } else {
            return geomData.actorArrow.radius + self.controllingDim * 0.003;
          }
        });

      // let rectData = [{ w: self.controllingDim, h: self.height, x: 0, y: 0 }];
      // svg
      //   .select(".stage")
      //   .selectAll("rect")
      //   .data(rectData)
      //   .join("rect")
      //   .attr("width", d => d.w)
      //   .attr("height", d => d.h)
      //   .attr("x", d => d.x)
      //   .attr("y", d => d.y)
      //   .attr("fill", "none")
      //   .on("click", function() {
      //     whiteSpaceClick();
      //   });
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////// THIS SECTION WILL CONTAIN CODE THAT IS CALLED BY VARIOUS EVENTS //////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // let whiteSpaceClick = function() {
      //   console.log("white space clicked");
      // };

      let categoryClick = function(d, e, selected) {
        let thisData = d;
        let thisEvent = e;
        let thisCategory = d3.select(selected);

        if (thisCategory.classed("selected-category")) {
          component.$store.commit("selectCategory", false);
          d3.selectAll(".actor-rotation-groups")
            .classed("category-selected-actors", false)
            .classed("temp-category-selected-actors", false)
            .transition()
            .style("opacity", "0");

          d3.selectAll(".category-hover")
            .classed("selected-category", false)
            .classed("receding-category", false)
            .attr("opacity", 1)
            .filter(".category-shapes")
            .transition()
            .attr("filter", "none")
            .attr("transform", "translate(0,0)");
        } else {
          component.$store.commit("selectCategory", true);
          d3.selectAll(".actor-rotation-groups")
            .classed("category-selected-actors", d => {
              if (d["actor data"].category == thisData.text) {
                return true;
              } else {
                return false;
              }
            })
            .classed("pointer", d => {
              if (d["actor data"].category == thisData.text) {
                return true;
              } else {
                return false;
              }
            })
            .classed("temp-category-selected-actors", false);

          d3.selectAll(".category-hover")
            .classed("selected-category", function(d) {
              if (thisData.text == d.text) {
                return true;
              } else {
                return false;
              }
            })
            .classed("receding-category", function(d) {
              if (thisData.text == d.text) {
                return false;
              } else {
                return true;
              }
            });
        }
        d3.selectAll(".receding-category")
          .transition()
          .attr("filter", "none")
          .attr("transform", "translate(0,0)")
          .attr("opacity", 0.9);

        d3.selectAll(".selected-category")
          .filter(".category-shapes")
          .transition()
          .attr("filter", "url(#dropshadow)")
          .attr("transform", "translate(1,-4)")
          .attr("opacity", 1);
        let allActors = d3
          .selectAll(".actor-rotation-groups")
          .transition()
          .style("opacity", function(d) {
            let loopActor = d3.select(this);
            let isSelected = loopActor.classed("category-selected-actors");
            if (isSelected) {
              return 1;
            } else {
              return 0;
            }
          });
      };

      let actorClick = function(d, e, selected) {
        let thisActor = d3.select(selected);
        let thisActorActive = thisActor.classed("category-selected-actors");
        let thisActorSelected = thisActor
          .select("path")
          .classed("actor-selected");
        if (thisActorActive) {
          if (thisActorSelected) {
            console.log("actor is already selected");
            component.$store.commit("selectActor", component.blankActor);
            d3.selectAll(".actor-rotation-groups")
              .selectAll("path")
              .classed("actor-selected", false);
            component.rotate(0);
          } else {
            component.$store.commit("selectActor", d["actor data"]);
            let thisData = d;
            let thisEvent = e;
            let rotateDiagram =
              Math.PI * 2 -
              ((d.actorAngle + self.rotationTracker) % (Math.PI * 2));

            let actorShapes = d3
              .selectAll(".actor-rotation-groups")
              .selectAll("path")
              .classed("actor-selected", false);
            thisActor.selectAll("path").classed("actor-selected", true);
            component.rotate(rotateDiagram);
          }
        }
      };
    }
  }
};
</script>

<style>
#svg-container {
  height: 92vmin;
}
.body-class {
  padding: 0;
  margin: 0;
}
.circular-economy-bubble {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  overflow: hidden;
  padding: 10px;
}
.circular-economy-square {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  /* overflow: hidden; */
  line-height: 95%;
  padding: 10px;
}
.stage-description {
  border-radius: 8%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: rgb(55, 55, 55);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.small-text {
  font-size: x-small;
}
.medium-text {
  font-size: large;
}
.stroked {
  border: solid white;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
