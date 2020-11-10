<template>
  <v-tab-item>
    <div class="item-container">
      <v-date-picker
        v-model="picker"
        type="month"
        class="item-container__picker"
      >
      </v-date-picker>
      <Table
        class="item-container__table"
        :data="rankedUsers"
        @toggleView="toggleView"
        :view="tableView"
        :loading="loading"
        :dateObj="this.createDateObj()"
      />
    </div>
    <RadarChart
      :data="shoutsToDisplay.slice(0, 7)"
      class="item-container__chart"
    />
  </v-tab-item>
</template>

<script>
import { rankedShoutersFormatter } from "../../shared/formatters";
import RadarChart from "./RadarChart";
import Table from "./Table";

export default {
  name: "MonthlyReports",
  components: { Table, RadarChart },
  data() {
    return {
      loading: false,
      picker: new Date().toISOString().substr(0, 7),
      shoutsToDisplay: [],
      tableView: true,
    };
  },
  created() {
    this.getRankedList();
  },
  methods: {
    toggleView: function () {
      this.tableView = !this.tableView;
    },
    getRankedList: function () {
      this.loading = true;
      const { selectedMonth, selectedYear } = this.createDateObj();
      this.$store.dispatch("getRankedUsersByMonth", {
        type: this.tableView ? "shouter" : "shoutee",
        month: selectedMonth,
        year: selectedYear,
      });

      this.loading = false;
    },
    createDateObj: function () {
      return {
        selectedMonth: this.picker.split("-")[1],
        selectedYear: this.picker.split("-")[0],
      };
    },
  },
  computed: {
    rankedUsers() {
      return rankedShoutersFormatter(this.$store.state.rankedUsers);
    },
  },
  watch: {
    picker() {
      this.getRankedList();
    },
    tableView() {
      this.getRankedList();
    },
  },
};
</script>

<style lang="scss">
@use "../../assets/styles/variables.scss" as v;
.item-container {
  display: flex;
  justify-content: space-evenly;
  background-color: v.$main-bkgrnd;

  &__picker {
    height: 300px;
    margin: 1rem;
    color: v.$accent-blue;
  }

  &__table {
    width: 700px;
    margin: 1rem;
  }

  &__chart {
    background-color: v.$main-bkgrnd;
  }
}
</style>
