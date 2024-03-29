<template>
  <div
    class="ma-0 text-center pt-5"
    :id="ids.container"
    :style="styleContainer"
  >
    <svg
      :style="{ width: svgWidth, height: svgHeight }"
      :id="ids.svg"
      class="elevation-2"
    >
      <g :id="ids.primaryAxis" />

      <g :id="ids.labelAxes" />
      <g :id="ids.dividingLines" />
      <g :id="ids.labels" />

      <g :id="ids.bars" />
      <g :id="ids.overlay" />
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapState } from "vuex";
export default {
  name: "CircularStackedBarChart",
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  watch: {
    actors() {
      this.drawUpdate();
    }
  },
  data: () => ({
    ids: {
      container: "circular-stacked-bar-chart-container",
      svg: "circular-stacked-bar-chart-svg",
      primaryAxis: "circular-stacked-bar-chart-primary-axis-group",
      labelAxes: "circular-stacked-bar-chart-label-axes-group",
      dividingLines: "circular-stacked-bar-chart-dividing-lines-group",
      bars: "circular-stacked-bar-chart-bars-group",
      labels: "circular-stacked-bar-chart-labels-group",
      overlay: "circular-stacked-bar-chart-overlay-group"
    },
    margin: 20,
    width: 400,
    height: 3000,
    maxDim: 700,
    chartPaddingPercent: 0.15,
    barWidth: 30,
    labelOffsetFromBar: 10,
    labelAxisLength: 90,
    labelAxisInset: 30,
    angularExtension: Math.PI * (1 / 50),
    labelAxisData: [
      {
        name: "Conventional",
        rotation: Math.PI / -2,
        textAnchor: "start"
      },
      {
        name: "Better",
        rotation: 0,
        textAnchor: "start"
      },
      {
        name: "Excellent",
        rotation: Math.PI / 2,
        textAnchor: "start"
      },
      {
        name: "Circular",
        rotation: Math.PI,
        textAnchor: "end"
      }
    ],
    svgWidth: 400,
    svgHeight: 400
  }),
  computed: {
    ...mapState(["categories", "actors"]),
    categoryData() {
      let categoryData = [];
      let categoriesCopy = JSON.parse(JSON.stringify(this.categories));
      // let categoryCount = categoriesCopy.length;
      // let rotation = (-1 / 4) * Math.PI;
      for (let i in categoriesCopy) {
        let c = categoriesCopy[i];
        if (i == 0) {
          c.rotationStart = Math.PI / -2;
        } else {
          c.rotationStart = categoriesCopy[i - 1].rotationEnd;
        }
        let relevantActors = this.actors.filter(a => a.category == c.text);
        c.totalPoints = 0;
        c.selectedPoints = 0;
        for (let a of relevantActors) {
          if (a.evalPoints) {
            c.totalPoints += a.evalPoints;
            if (a.evalSelected) {
              c.selectedPoints += a.evalPoints;
            }
          }
        }
        c.percentSelected = c.selectedPoints / c.totalPoints;
        c.rotationEnd = c.rotationStart + c.percentSelected * Math.PI * 0.5;
        categoryData.push(c);
      }
      return categoryData;
    },
    categoryBarData() {
      let categoryBarData = this.categoryData.filter(c => {
        if (c.percentSelected > 0) {
          return true;
        } else {
          return false;
        }
      });
      return categoryBarData.reverse();
    },
    styleSvg() {
      console.log("svg style updated");
      let svgStyleObj = {};
      svgStyleObj.width = this.width;
      svgStyleObj.height = this.height;
      return svgStyleObj;
    },
    styleContainer() {
      let containerStyleObj = {};
      containerStyleObj.height = this.height + this.margin * 2 + "px";
      return containerStyleObj;
    },
    center() {
      let centerObj = {};
      centerObj.x = this.width / 2;
      centerObj.y = this.height / 2;
      return centerObj;
    },
    chartPadding() {
      return this.width * this.chartPaddingPercent;
    },
    outterRadius() {
      return this.width / 2 - this.chartPadding;
    },
    innerRadius() {
      return this.outterRadius - this.barWidth;
    },
    labelAxisInteriorRadius() {
      return this.halfRadius - this.labelAxisInset;
    },
    halfRadius() {
      return this.outterRadius - this.barWidth / 2;
    },
    labelRadius() {
      return this.outterRadius + this.labelOffsetFromBar;
    }
  },
  methods: {
    resize() {
      console.log("resize called");
      console.log(this);
      let calculatedDim;
      let containerWidth = document.getElementById(this.ids.container)
        .clientWidth;
      if (containerWidth > this.maxDim) {
        calculatedDim = this.maxDim;
      } else {
        calculatedDim = containerWidth;
      }
      this.width = calculatedDim - this.margin * 2;
      this.height = calculatedDim - this.margin * 2;
      let svg = d3.select("#" + this.ids.svg);
      svg.attr("height", this.height);
      svg.attr("width", this.width);
      this.svgWidth = this.width;
      this.svgHeight = this.height;
      this.drawUpdate();
    },
    drawUpdate() {
      console.log("draw update called");
      let self = this;

      let arrowData = [
        {
          startRotation: Math.PI / -2,
          endRotation: Math.PI * 1.95 + Math.PI / -2,
          arrowHeadWidth: 22,
          arrowHeadRadians:
            Math.PI * 1.95 + Math.PI / -2 - self.angularExtension
        }
      ];
      d3.select("#" + self.ids.primaryAxis)
        .selectAll(".axis-main-path")
        .data(arrowData)
        .join("path")
        .classed("axis-main-path", true)
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "3px")
        .attr("d", d => {
          return self.arcPathGenerator(
            d.startRotation,
            d.endRotation,
            self.halfRadius,
            self.center.x,
            self.center.y
          );
        });
      d3.select("#" + self.ids.primaryAxis)
        .selectAll(".axis-main-path-arrow-head")
        .data(arrowData)
        .join("path")
        .classed("axis-main-path-arrow-head", true)
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "3px")
        .attr("d", d => {
          return self.arrowHeadGenerator(
            d.endRotation,
            d.arrowHeadRadians,
            self.halfRadius,
            d.arrowHeadWidth,
            self.center.x,
            self.center.y
          );
        });

      d3.select("#" + self.ids.labelAxes)
        .selectAll("line")
        .data(self.labelAxisData)
        .join("line")
        .style("stroke", "black")
        .style("stroke-width", "2px")
        .attr("x1", d => {
          return (
            Math.cos(d.rotation) * self.labelAxisInteriorRadius + self.center.x
          );
        })
        .attr("y1", d => {
          return (
            Math.sin(d.rotation) * self.labelAxisInteriorRadius + self.center.y
          );
        })
        .attr("x2", d => {
          return (
            Math.cos(d.rotation) *
              (self.labelAxisInteriorRadius + self.labelAxisLength) +
            self.center.x
          );
        })
        .attr("y2", d => {
          return (
            Math.sin(d.rotation) *
              (self.labelAxisInteriorRadius + self.labelAxisLength) +
            self.center.x
          );
        });

      d3.select("#" + self.ids.labels)
        .selectAll(".category-label-paths")
        .data(self.labelAxisData)
        .join("path")
        .classed("category-label-paths", true)
        .attr("id", d => {
          return (
            "category-label-path-" +
            d.name
              .split(" ")
              .join("-")
              .toLowerCase()
          );
        })
        .attr("fill", "none")
        .attr("d", d =>
          self.arcPathGenerator(
            d.rotation + Math.PI / 70,
            d.rotation + Math.PI / 2,
            self.labelAxisInteriorRadius + (self.labelAxisLength / 3) * 2,
            self.center.x,
            self.center.y
          )
        );

      d3.select("#" + self.ids.labels)
        .selectAll(".category-label-texts")
        .data(self.labelAxisData)
        .join(enter =>
          enter.append("text").classed("category-label-texts", true)
        )
        .selectAll(".category-label-text-pathed")
        .data(d => [d])
        .join(enter =>
          enter
            .append("textPath")
            .classed("category-label-text-pathed", true)
            .classed("no-select", true)
            .attr("xlink:href", d => {
              return (
                "#category-label-path-" +
                d.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()
              );
            })
            .style("text-anchor", "start")
            .text(d => d.name)
            .style("font-size", self.width * 0.035 + "px")
        );

      d3.select("#" + self.ids.bars)
        .selectAll(".bars")
        .data(self.categoryBarData)
        .join("path")
        .classed("bars", true)
        .style("fill", d => d.color)
        .style("stroke", "white")
        .style("stroke-width", "2px")
        .attr("d", d =>
          self.circularBarGenerator(
            d.rotationStart,
            d.rotationEnd,
            self.innerRadius,
            self.outterRadius,
            self.center.x,
            self.center.y
          )
        );

      d3.select("#" + self.ids.dividingLines);

      let circleData = [
        {
          cx: self.center.x,
          cy: self.center.y - self.halfRadius,
          r: self.barWidth / 2
        }
      ];
      d3.select("#" + self.ids.overlay)
        .selectAll("circle")
        .data(circleData)
        .join("circle")
        .attr("cx", d => d.cx)
        .attr("cy", d => d.cy)
        .attr("r", d => d.r)
        .style("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", "3px");
    },
    arcPathGenerator(startAngle, endAngle, radius, centerX, centerY) {
      let x1 = Math.cos(startAngle) * radius + centerX;
      let y1 = Math.sin(startAngle) * radius + centerY;
      let path = d3.path();
      path.moveTo(x1, y1);
      path.arc(centerX, centerY, radius, startAngle, endAngle);
      return path.toString();
    },
    arrowHeadGenerator(
      radialPoint,
      radialTailEnd,
      centerRadius,
      arrowWidth,
      centerX,
      centerY
    ) {
      let x1 =
        Math.cos(radialTailEnd) * (centerRadius + arrowWidth / 2) + centerX;
      let y1 =
        Math.sin(radialTailEnd) * (centerRadius + arrowWidth / 2) + centerY;
      let x2 = Math.cos(radialPoint) * centerRadius + centerX;
      let y2 = Math.sin(radialPoint) * centerRadius + centerY;
      let x3 =
        Math.cos(radialTailEnd) * (centerRadius - arrowWidth / 2) + centerX;
      let y3 =
        Math.sin(radialTailEnd) * (centerRadius - arrowWidth / 2) + centerY;
      let path = d3.path();
      path.moveTo(x1, y1);
      path.lineTo(x2, y2);
      path.lineTo(x3, y3);
      return path.toString();
    },
    circularBarGenerator(
      startAngle,
      endAngle,
      innerRadius,
      outterRadius,
      centerX,
      centerY
    ) {
      let self = this;
      let angularExtension = self.angularExtension;
      let x1 = Math.cos(startAngle) * innerRadius + centerX;
      let y1 = Math.sin(startAngle) * innerRadius + centerY;
      let x2 = Math.cos(endAngle) * innerRadius + centerX;
      let y2 = Math.sin(endAngle) * innerRadius + centerY;
      let arrowPointX =
        Math.cos(endAngle + angularExtension) *
          (innerRadius + self.barWidth / 2) +
        centerX;
      let arrowPointY =
        Math.sin(endAngle + angularExtension) *
          (innerRadius + self.barWidth / 2) +
        centerY;
      let path = d3.path();
      path.moveTo(x1, y1);
      path.arc(centerX, centerY, outterRadius, startAngle, endAngle);
      path.lineTo(arrowPointX, arrowPointY);
      path.lineTo(x2, y2);
      path.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      return path.toString();
    }
  }
};
</script>

<style></style>
