<template>
  <Carousel v-if="recentShouts.length" :recentShouts="recentShouts"/>
</template>

<script>
import { mockGetData } from "../apiCall";
import Carousel from "../components/Carousel.vue";

export default {
  name: "Home",
  components: { Carousel },
  data () {
    return {
      recentShouts: [],
    };
  },
  async created() {
    this.recentShouts = await mockGetData();
  },
};
</script>
