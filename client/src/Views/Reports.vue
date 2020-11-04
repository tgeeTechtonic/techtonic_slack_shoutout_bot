<template>
  <div class="reports-container">
    <h2 @click="createHeaders(shoutsToDisplay[0])">Reports</h2>
    <template>
      <v-tabs
        fixed-tabs
        background-color="green lighten-1"
        light
        v-model="tabs"
      >
        <v-tab>Monthly Reports</v-tab>
        <v-tab @click="handleUserViewData">Users</v-tab>
        <v-tab @click="handleAllShoutsViewData">All Shouts</v-tab>
      </v-tabs>
    </template>
    <div class="reports-container__main">
      <v-tabs-items v-model="tabs">
        <MonthlyReports />

        <v-tab-item
          ><Table
            class="reports-container__table"
            :data="shouts"
            searchable="searchable"
        /></v-tab-item>
        <v-tab-item>
          <Table class="reports-container__table" :data="shouts" />
          <FillChart :data="shouts" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import { getAllShouts, getAllUsers } from "../apiCall";
import {
  shoutoutFormatter,
  
} from "../shared/formatters";
import Table from "../components/Table";
import FillChart from "../components/FillChart";
import MonthlyReports from "../components/MonthlyReports";

export default {
  name: "Reports",
  components: { Table, FillChart, MonthlyReports },
  data() {
    return {
      tabs: null,
      shouts: [],
      shoutsToDisplay: [],
      picker: new Date().toISOString().substr(0, 7),
      tableView: true,
    };
  },
  computed: {
    headers() {
      return this.createHeaders(this.shoutsToDisplay);
    },
  },
  methods: {
    handleUserViewData: async function () {
      this.shouts = await getAllUsers();
    },
    handleAllShoutsViewData: async function () {
      this.shouts = shoutoutFormatter(await getAllShouts());
    },
  },
  watch: {
    async picker() {
      await this.getRankedList();
    },
    async tableView() {
      await this.getRankedList();
    },
  },
};
</script>

<style lang="scss">
.active {
  color: red;
}
.reports-container {
  &__active {
    color: red;
  }
  &__table {
  }
  &__filter-btns {
    color: red;
    margin-top: 1rem;
  }
  &__main {
    display: flex;
    justify-content: space-evenly;
    margin-top: 2rem;
  }
}
</style>
