<template>
  <article class="carousel-display">
    <Carousel v-if="recentShouts.length" :recentShouts="recentShouts" />
  </article>
</template>

<script>
import { getRecentShouts } from '../apiCall';
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
    let recents = await getRecentShouts();
    this.recentShouts = recents;
    console.log('created Shouts', this.recentShouts)
  },
};
</script>

<style lang="scss" scoped>
.carousel-display {
  padding: 50px;
}
</style>
