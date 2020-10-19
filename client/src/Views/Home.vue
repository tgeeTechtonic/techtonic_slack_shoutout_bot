<template>
  <Carousel />
</template>

<script>
import { mockGetData } from "../apiCall";
import Carousel from "../components/Carousel.vue";
import { mockShoutData } from "../shared/mockData";

export default {
  name: "Home",
  components: { Carousel },
  data: () => {
    return {
      recentShouts: null,
    };
  },
  created: async () => {
    this.recentShouts = await mockGetData();
    console.log("shit-tastic");
  },
};
</script>
