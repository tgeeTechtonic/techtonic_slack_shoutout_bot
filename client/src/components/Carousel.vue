<template>
  <v-carousel
    v-model="model"
    cycle
    interval="4000"
    height="300"
    :show-arrows="false"
  >
    <v-carousel-item v-for="(shout, i) in shouts" :key="i">
      <v-sheet height="100%" tile>
        <v-row align="center" justify="center">
          <div class="display-4">Shoutout: {{ shout.shoutout }}</div>
        </v-row>
        <v-row align="center" justify="center" class="things">
          <div class="display-2">Shouter: {{ shout.shouter.first_name }}</div>
          <div class="display-2">Shoutee: {{ shout.shoutee.first_name }}</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Carousel",
  props: ["recentShouts"],
  data() {
    return {
      model: 0,
      shouts: null,
    }
  },
  mounted () {
    this.shouts = this.$props.recentShouts;
  },
};
</script>

<style>
</style>