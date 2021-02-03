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
    ...mapGetters(["selectedActorColor"]),
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
