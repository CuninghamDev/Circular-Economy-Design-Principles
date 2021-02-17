<template>
  <div
    id="actor-data-container"
    class="container-fluid p-0 m-0 no-select"
    style="vertical-align: 50%; height: 75%"
  >
    <!-- <div class="h2 row mt-5">
      Circular Economy in the Built Environment (envr.)
    </div> -->
    <div
      v-if="selectedActor.actor == ''"
      class="ml-3 mr-1 row align-items-center h-100 p-0"
      style="color: gray; height: 400px"
    >
      <div class="col m-0 p-0">
        <p class="h4">
          <b><em>Where is your project in its life-cycle? </em></b>
        </p>
        <p class="h6" style="color:gray">
          Select a phase in the diagram to explore various strategies your
          project can use to engage a circular economy.
        </p>
      </div>
    </div>
    <div
      v-if="selectedActor.actor != ''"
      class="row align-items-center h-100 p-0 m-2"
    >
      <div class="col m-0 p-0">
        <p class="h7 my-0" style="color:rgb(200,200,200)">
          <em>{{ selectedActor.category }}</em>
        </p>
        <p class="h4" style="color:Gray">
          <b>{{ selectedActor.actor.toUpperCase() }}</b>
        </p>
        <div
          :style="{ background: selectedActorColor, color: 'white' }"
          class="rounded-text-box px-3 py-3"
          v-if="selectedActor.actor != ''"
        >
          <b> {{ selectedActor.details }}</b>
        </div>
        <div class="ml-7">
          <div
            class="row p-0 mx-0 my-2 rounded-text-box"
            v-for="(button, index) in getButtons"
            :key="index"
            :style="{ background: button.color, color: 'white' }"
          >
            <div
              class="col-2 col-sm-3 col-md-2 col-lg-3 col-xl-2 m-0 p-0 align-self-center"
            >
              <img :src="button.whiteIconPath" class="m-0 p-0 pl-1 " />
            </div>
            <div class="col px-1 py-2">
              <b> {{ button.details }} </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "ActorData",
  computed: {
    ...mapState(["selectedActor"]),
    ...mapGetters(["selectedActorColor", "getButtons"]),
    titleDataObj() {
      return {
        background: this.selectedActorColor,
        color: "white",
        borderRadius: "14px"
      };
    }
  }
};
</script>

<style>
.rounded-text-box {
  border-radius: 14px;
}
.ml-7 {
  margin-left: 6rem;
}
</style>
