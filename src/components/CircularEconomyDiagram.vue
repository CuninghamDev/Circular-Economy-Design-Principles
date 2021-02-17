<template>
  <div id="svg-container">
    <div id="circular-economy-diagram-div" class="no-select"></div>
    <svg id="circular-economy-diagram-svg"></svg>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as d3 from "d3";

export default {
  name: "CircularEconomyDiagram",
  mounted() {
    let svgId = "circular-economy-diagram-svg";
    let divId = "circular-economy-diagram-div";
    let containerId = "svg-container";
    this.buildDiagram(this.combinedState, svgId, divId, containerId);
    window.addEventListener("resize", this.resizeDiagram);
  },
  watch: {},
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeDiagram);
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
      "title"
    ])
  },
  data() {
    return {
      diagram: {}
    };
  },
  methods: {
    buildDiagram(_data, _svgId, _divId, _containerId) {
      let diagram = this.diagram;

      console.log("building the circular economy diagram");
      diagram.data = _data;
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

      diagram.svg.append("g").attr("class", "diagram-title");
      diagram.svg.append("g").attr("class", "stage");
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
      let svg = diagram.svg;
      let div = diagram.div;
      diagram.containerBounds = diagram.container.getBoundingClientRect();
      let cb = diagram.containerBounds;
      diagram.width = cb.right - cb.left;
      diagram.height = cb.bottom - cb.top;
      this.getControllingDim();
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

      div
        .selectAll(".diagram-title")
        .data(titleData)
        .join("div")
        .classed("diagram-title", true)
        .text(function(d) {
          return d.toUpperCase();
        })
        .style("height", self.height + "px")
        .style("display", "flex")
        .style("justify-content", "center")
        .style("align-items", "center")
        .style("margin-left", "37%")
        .style("margin-right", "37%")
        .style("text-align", "center")
        .style("font-family", "Avenir, Helvetica, Arial, sans-serif")
        .style("font-weight", "bold")
        .style("font-size", function() {
          return self.controllingDim * 0.03 + "px";
        })
        .style("color", "gray")
        .classed("h2", true);

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
        .transition()
        .duration(self.rotationTime)
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
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////// THIS SECTION WILL CONTAIN CODE THAT IS CALLED BY VARIOUS EVENTS //////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      let categoryClick = function(d, e, selected) {
        let thisData = d;
        let thisEvent = e;
        let thisCategory = d3.select(selected);

        if (thisCategory.classed("selected-category")) {
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
  height: 95vmin;
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
</style>
