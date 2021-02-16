<template>
  <div
    id="actor-data-container"
    class="container-fluid h-100 p-0 m-0 no-select"
    style="vertical-align: 50%"
  >
    <div class="row align-items-center h-100 p-0 m-2">
      <div class="col m-0 p-0">
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
