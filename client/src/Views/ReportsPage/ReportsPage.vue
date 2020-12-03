<template>
  <div class="reports-container">
    <template class="reports-container__v-tabs">
      <v-tabs fixed-tabs v-model="tabs" :class="tabBarColoring">
        <v-tab>Monthly Reports</v-tab>
        <v-tab>Users</v-tab>
        <v-tab>All Shouts</v-tab>
      </v-tabs>
    </template>
    <div class="reports-container__main">
      <v-tabs-items v-model="tabs">
        <MonthlyReports />
        <UserReports />
        <AllShouts />
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import MonthlyReports from './MonthlyReports';
import UserReports from './UserReports';
import AllShouts from './AllShouts';

export default {
  name: 'Reports',
  components: { MonthlyReports, UserReports, AllShouts },
  data() {
    return {
      tabs: null,
    };
  },
  computed: {
    tabBarColoring() {
      if (this.tabs === 0) return 'v-tab-1--active';
      else if (this.tabs === 1) return 'v-tab-2-active';
      else return 'v-tab-3--active';
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
  .v-tab-1--active .v-item-group {
    color: v.$accent-blue !important;
  }
  .v-tab-2-active .v-item-group {
    color: v.$accent-green !important;
  }
  .v-tab-3--active .v-item-group {
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
