<template>
    <v-tab-item>
          <v-date-picker v-model="picker" type="month" color="green darken-1">
          </v-date-picker>
          <Table
            class="reports-container__table"
            :data="shoutsToDisplay"
            @toggleView="toggleView"
            :view="tableView"
            :dateObj="this.createDateObj()"
    />
    <RadarChart :data="shoutsToDisplay.slice(0, 7)" />
    </v-tab-item>
</template>

<script>
import { rankedShoutersFormatter, } from "../shared/formatters";
import { getRankedByMonth } from "../apiCalls";
import Table from "../components/Table";
import RadarChart from "../components/RadarChart";

    export default {
      name: "MontlyReports",
      components: { Table, RadarChart },
      data () {
          return {
              tableView: true,
              picker: new Date().toISOString().substr(0, 7),
              shoutsToDisplay: [],
          }
      },
      async created() {
        const { selectedMonth, selectedYear } = this.createDateObj();
        const formattedShouts = await getRankedByMonth(
        "shouter",
        selectedMonth,
        selectedYear
        );
        this.shoutsToDisplay = rankedShoutersFormatter(formattedShouts);
      },
      methods: {
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
        createDateObj: function () {
          return {
            selectedMonth: this.picker.split("-")[1],
            selectedYear: this.picker.split("-")[0],
          };
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
  }
</script>

<style lang="scss">
</style>