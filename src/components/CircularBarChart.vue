<template>
  <div
    class="ma-0 text-center pt-5"
    :id="ids.container"
    :style="styleContainer"
  >
    <svg :style="styleSvg" :id="ids.svg" class="elevation-2">
      <g :id="ids.ghostedBars" />
      <g :id="ids.bars" />
      <g :id="ids.axis" />
      <g :id="ids.barLabels" />
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapState } from "vuex";
export default {
  name: "CircularBarChart",
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
      container: "circular-bar-chart-container",
      svg: "circular-bar-chart-svg",
      axis: "circular-bar-chart-axis-group",
      ghostedBars: "circular-bar-chart-ghosted-bars-group",
      bars: "circular-bar-chart-bars-group",
      barLabels: "circular-bar-chart-bar-labels-group"
    },
    margin: 20,
    width: 400,
    height: 3000,
    maxDim: 700,
    chartPaddingPercent: 0.1,
    barWidth: 50,
    labelOffsetFromBar: 10
  }),
  computed: {
    ...mapState(["categories", "actors"]),
    categoryData() {
      let categoryData = [];
      let categoriesCopy = JSON.parse(JSON.stringify(this.categories));
      let categoryCount = categoriesCopy.length;
      let rotation = (-1 / 4) * Math.PI;
      for (let i in categoriesCopy) {
        let c = categoriesCopy[i];
        c.rotationStart = (i / categoryCount) * Math.PI * 2 + rotation;
        c.rotationEnd = c.rotationStart + (Math.PI * 2) / categoryCount;
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

        c.filledRotation =
          c.rotationStart +
          ((Math.PI * 2) / categoryCount) * (c.selectedPoints / c.totalPoints);
        categoryData.push(c);
      }
      return categoryData;
    },
    styleSvg() {
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
    labelRadius() {
      return this.outterRadius + this.labelOffsetFromBar;
    }
  },
  methods: {
    resize() {
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
      this.drawUpdate();
    },
    drawUpdate() {
      let self = this;
      d3.select("#" + self.ids.axis)
        .selectAll(".dividing-lines")
        .data(self.categoryData)
        .join("line")
        .classed("dividing-lines", true)
        .attr(
          "x1",
          d =>
            Math.cos(d.rotationStart) * (self.innerRadius - 2) + self.center.x
        )
        .attr(
          "x2",
          d =>
            Math.cos(d.rotationStart) * (self.outterRadius + 2) + self.center.x
        )
        .attr(
          "y1",
          d =>
            Math.sin(d.rotationStart) * (self.innerRadius - 2) + self.center.y
        )
        .attr(
          "y2",
          d =>
            Math.sin(d.rotationStart) * (self.outterRadius + 2) + self.center.y
        )
        .style("stroke", "white")
        .style("stroke-width", "9px");
      d3.select("#" + self.ids.ghostedBars)
        .selectAll(".ghosted-bars")
        .data(self.categoryData)
        .join("path")
        .classed("ghosted-bars", true)
        .style("fill", d => d.color)
        .style("opacity", 0.15)
        // .transition()
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

      d3.select("#" + self.ids.bars)
        .selectAll(".bars")
        .data(self.categoryData)
        .join("path")
        .classed("bars", true)
        .style("fill", d => d.color)
        // .transition()
        // .ease(d3.easeSinIn)
        // .duration(100)
        .attr("d", d =>
          self.circularBarGenerator(
            d.rotationStart,
            d.filledRotation,
            self.innerRadius,
            self.outterRadius,
            self.center.x,
            self.center.y
          )
        );

      d3.select("#" + self.ids.barLabels)
        .selectAll(".bar-label-paths")
        .data(self.categoryData)
        .join("path")
        .classed("bar-label-paths", true)
        .attr("id", d => {
          return (
            "bar-label-path-" +
            d.text
              .split(" ")
              .join("-")
              .toLowerCase()
          );
        })
        .attr("fill", "none")
        .attr("d", d =>
          self.textPathGenerator(
            d.rotationStart + 0.04,
            d.rotationEnd,
            self.labelRadius,
            self.center.x,
            self.center.y
          )
        );

      d3.select("#" + self.ids.barLabels)
        .selectAll(".bar-label-texts")
        .data(self.categoryData)
        .join(enter => enter.append("text").classed("bar-label-texts", true))
        .selectAll(".bar-label-text-pathed")
        .data(d => [d])
        .join(enter =>
          enter
            .append("textPath")
            .classed("bar-label-text-pathed", true)
            .attr("xlink:href", d => {
              return (
                "#bar-label-path-" +
                d.text
                  .split(" ")
                  .join("-")
                  .toLowerCase()
              );
            })
            .style("text-anchor", "start")
            .style("startOffset", "10%")
            .text(d => d.text.toUpperCase())
            .style("font-size", self.width * 0.03 + "px")
            .style("fill", d => d.color)
        );
    },
    textPathGenerator(startAngle, endAngle, radius, centerX, centerY) {
      let x1 = Math.cos(startAngle) * radius + centerX;
      let y1 = Math.sin(startAngle) * radius + centerY;
      let path = d3.path();
      path.moveTo(x1, y1);
      path.arc(centerX, centerY, radius, startAngle, endAngle);
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
      let x1 = Math.cos(startAngle) * innerRadius + centerX;
      let y1 = Math.sin(startAngle) * innerRadius + centerY;
      let x2 = Math.cos(endAngle) * innerRadius + centerX;
      let y2 = Math.sin(endAngle) * innerRadius + centerY;
      let path = d3.path();
      path.moveTo(x1, y1);
      path.arc(centerX, centerY, outterRadius, startAngle, endAngle);
      path.lineTo(x2, y2);
      path.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      return path.toString();
    }
  }
};
</script>

<style></style>
