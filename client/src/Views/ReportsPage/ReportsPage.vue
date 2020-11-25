<template>
  <div class="reports-container">
    <template class="reports-container__v-tabs">
      <v-tabs fixed-tabs v-model="tabs">
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
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as v;

.reports-container {
  &__main {
    margin-top: 2rem;
    width: 100%;
    background-color: v.$main-bkgrnd;
  }
  &__v-tabs {
    background-color: v.$accent-blue;
    color: v.$main-white;
  }
}
</style>
