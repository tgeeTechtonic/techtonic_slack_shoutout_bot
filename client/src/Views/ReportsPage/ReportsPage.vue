<template>
  <div class="reports-container">
    <template class="reports-container__v-tabs">
      <v-tabs fixed-tabs v-model="activeTab" :slider-color="tabBarColoring">
        <v-tab
          v-for="tab in tabs"
          :exact-active-class="tab.activeClass"
          :key="tab.name"
          :to="tab.route"
          exact
          >{{ tab.name }}</v-tab
        >
      </v-tabs>
    </template>
    <div class="reports-container__main">
      <router-view />
    </div>
  </div>
</template>

<script>
import {
  accentGreen,
  accentBlue,
  accentYellow,
} from '../../assets/styles/variables.scss';

export default {
  name: 'Reports',
  data() {
    return {
      activeTab: '/reports/monthly',
      tabs: [
        {
          name: 'Monthly Reports',
          route: '/reports/monthly',
          activeClass: 'v-tab-1--active',
          color: accentBlue,
        },
        {
          name: 'Users',
          route: '/reports/users',
          activeClass: 'v-tab-2--active',
          color: accentGreen,
        },
        {
          name: 'All Shouts',
          route: '/reports/all-shoutouts',
          activeClass: 'v-tab-3--active',
          color: accentYellow,
        },
      ],
    };
  },
  computed: {
    tabBarColoring() {
      const activeTab = this.activeTab;
      const tab = this.tabs.find((tab) => tab.route === activeTab);
      return tab.color;
    },
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as v;

.reports-container {
  .v-tabs {
    position: fixed;
    top: 70px;
    z-index: 12;
  }
  .v-tabs-bar {
    background-color: v.$accent-dark-grey !important;
  }
  .v-tab:not(.v-tab--active) {
    color: v.$main-white !important;
  }
  .v-tab-1--active {
    color: v.$accent-blue !important;
  }
  .v-tab-2--active {
    color: v.$accent-green !important;
  }
  .v-tab-3--active {
    color: v.$accent-yellow !important;
  }
  &__main {
    background-color: v.$main-bkgrnd;
    width: 100%;
  }
  &__v-tabs {
    color: v.$main-white;
  }
}
</style>
