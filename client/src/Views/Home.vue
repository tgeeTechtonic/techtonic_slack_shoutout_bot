<template>
  <article class="carousel-display">
    <Carousel v-if="recentShouts.length" :recentShouts="recentShouts" />
  </article>
</template>

<script>
import { mockGetData } from '../apiCall';
import Carousel from '../components/Carousel.vue';

export default {
  name: 'Home',
  components: { Carousel },
  data() {
    return {
      recentShouts: [],
    };
  },
  async created() {
    this.recentShouts = await mockGetData();
  },
};
</script>

<style lang="scss" scoped>
.carousel-display {
  padding: 50px;
}
</style>
