<template>
  <v-carousel
    v-model="model"
    cycle
    interval="4000"
    height="300"
    :show-arrows="false"
  >
    <v-carousel-item v-for="(shout, i) in mockData" :key="i">
      <v-sheet height="100%" tile>
        <v-row align="center" justify="center">
          <div class="display-4">Shoutout: {{ shout.shoutout }}</div>
        </v-row>
        <v-row align="center" justify="center" class="things">
          <div class="display-2">Shouter: {{ shout.shouter }}</div>
          <div class="display-2">Shoutee: {{ shout.shoutee }}</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "Carousel",
  data: () => ({
    model: 0,
    shouts: null,
  }),
};
</script>

<style>
</style>