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
        <button
          v-for="(button, index) in getButtons"
          :key="index"
          type="button"
          :style="{
            background: button.color,
            color: 'white',
            borderRadius: '14px'
          }"
          class="row ml-0 mt-2 p-2 btn w-75"
        >
          <b> {{ button.details }} </b>
        </button>
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

<style scoped></style>
