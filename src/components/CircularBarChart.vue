<template>
  <div class="ma-0 pa-0">
    <svg :style="styleSvg"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "CircularBarChart",
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  data: () => ({
    width: 400,
    height: 3000,
    maxHeight: 700
  }),
  computed: {
    styleSvg() {
      let svgStyleObj = {};
      svgStyleObj.width = this.width;
      svgStyleObj.height = this.height;
      return svgStyleObj;
    }
  },
  methods: {
    resize() {
      this.drawUpdate();
    },
    drawUpdate() {}
  }
};
</script>

<style></style>
