<template>
  <div class="container-fluid mt-4 mx-0 pl-0 no-select">
    <div class="row">
      <div
        class="col-xl-12 col-lg-3 col-md-3 col-sm-3 col-xs-3 col-6"
        v-for="d in categoryData"
        :key="d.text"
      >
        <div class="container ma-0 ">
          <div class="row">
            <div class="col h6 mb-0 pb-0" :style="{ color: d.color }">
              {{ d.text }}
            </div>
          </div>
          <div class="row">
            <div class="col">
              <b>{{ Math.round(d.percentSelected * 100) }}%</b> of Points
              Selected
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CircularStackedBarChartSummary",
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
    }
  }
};
</script>

<style></style>
