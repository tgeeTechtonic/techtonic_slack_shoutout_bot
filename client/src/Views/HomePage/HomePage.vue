<template>
  <article class="home">
    <section class="home__section">
      <HomeCarousel v-if="recentShouts.length" :recentShouts="recentShouts" />
    </section>
    <section class="home__section--blurb">
      <p class="home__blurb-quote">
        "Recognition is not a scarce resource. You can't use it up or run out of
        it." -Susan M. Heatherfield
      </p>
    </section>
    <section class="home__section--blurb">
      <p class="home__blurb-text home__blurb-about">
        All too often we tell people what they did wrong, and not nearly as
        often are we telling them what they've done right. Our primary goal is
        to create more awareness and participation in recoginizing how others
        enhance our lives, both personally and professionally, in a positive
        way.
      </p>
    </section>
    <section class="home__section--blurb">
      <p class="home__blurb-text home__blurb-action">
        Each shoutout in Slack will now be tracked and available here. Please
        check out the
        <router-link to="/reports" class="home__reports-link"
          >Reports</router-link
        >
        page for more details!
      </p>
    </section>
  </article>
</template>

<script>
import HomeCarousel from './HomeCarousel';

export default {
  name: 'Home',
  components: { HomeCarousel },
  created() {
    this.$store.dispatch('getRecentShoutouts');
  },
  computed: {
    recentShouts() {
      return this.$store.state.recentShoutouts;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/variables.scss" as v;

.home {
  &__section {
    height: 500px;
    margin: 0px 0px 110px 0px;
    padding: 0px 50px;
  }
  &__section--blurb {
    color: v.$main-white;
    background-color: v.$main-grey-underlay;
    margin: 0px 50px;
    padding: 0px 50px;
  }
  &__blurb-quote {
    background-color: v.$main-black-overlay;
    border-top: 10px solid v.$accent-blue;
    font-size: 2rem;
    padding: 60px 20px;
    margin: 0px -50px;
  }
  &__blurb-text {
    font-size: 1.5rem;
    margin: 0px -50px;
    padding: 100px 50px;
    text-align: left;
  }
  &__blurb-about {
    border-top: 10px solid v.$accent-green;
  }
  &__blurb-action {
    border-top: 10px solid v.$accent-red;
  }
  &__reports-link {
    color: v.$accent-red;
    text-decoration: none;

    &:hover {
      color: v.$accent-blue;
    }
  }
}
</style>
