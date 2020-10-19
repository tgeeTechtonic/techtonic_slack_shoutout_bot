<template>
  <Carousel />
</template>

<script>
import Carousel from "../components/Carousel.vue";
import { mockShoutData } from "../shared/mockData";

export default {
  name: "Home",
  components: { Carousel },
  methods: {
    async getLatestShouts() {},
  },
};
</script>
