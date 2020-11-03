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
        <v-tab>Users</v-tab>
        <v-tab>All Shouts</v-tab>
      </v-tabs>
    </template>
    <div class="reports-container__main">
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-date-picker v-model="picker" type="month" color="green darken-1">
          </v-date-picker>
          <Table
            class="reports-container__table"
            :data="shoutsToDisplay"
            @toggleView="toggleView"
            :view="tableView"
            :dateObj="this.createDateObj()"
        /></v-tab-item>
        <v-tab-item> </v-tab-item>
        <v-tab-item>
          <Table class="reports-container__table" :data="shouts" />
          <FillChart :data="shouts" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import { getAllShouts, getRankedByMonth } from "../apiCall";
import {
  shoutoutFormatter,
  rankedShoutersFormatter,
} from "../shared/formatters";
import Table from "../components/Table";
import FillChart from "../components/FillChart";

export default {
  name: "Reports",
  components: { Table, FillChart },
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
  async created() {
    const { selectedMonth, selectedYear } = this.createDateObj();
    const formattedShouts = await getRankedByMonth(
      "shouter",
      selectedMonth,
      selectedYear
    );
    this.shoutsToDisplay = rankedShoutersFormatter(formattedShouts);
    this.shouts = shoutoutFormatter(await getAllShouts());
  },
  methods: {
    createDateObj: function () {
      return {
        selectedMonth: this.picker.split("-")[1],
        selectedYear: this.picker.split("-")[0],
      };
    },
    toggleView: function () {
      this.tableView = !this.tableView;
    },
    getRankedList: async function () {
      const { selectedMonth, selectedYear } = this.createDateObj();
      const formatedShouts = await getRankedByMonth(
        this.tableView ? "shouter" : "shoutee",
        selectedMonth,
        selectedYear
      );
      this.shoutsToDisplay = rankedShoutersFormatter(formatedShouts);
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
