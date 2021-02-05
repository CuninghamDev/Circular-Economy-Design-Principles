<template>
  <div
    id="actor-data-container"
    class="container-fluid h-100"
    style="vertical-align: 50%"
  >
    <div class="row align-items-center h-100">
      <div class="col">
        <p class="h4" style="color:Gray">
          <b>{{ selectedActor.actor.toUpperCase() }}</b>
        </p>
        <button
          type="button"
          :style="titleDataObj"
          class="p-2 btn"
          v-if="selectedActor.actor != ''"
        >
          <b> {{ selectedActor.details }}</b>
        </button>
        <div class="row p-2" v-for="(button, index) in getButtons" :key="index">
          <div class="col-3 m-0 p-0">
            <img :src="button.iconPath" class="m-0 p-0" />
          </div>
          <div class="col px-1">
            <div
              class="rounded-text-box p-2 text-center"
              :style="{ background: button.color, color: 'white' }"
            >
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
</style>
