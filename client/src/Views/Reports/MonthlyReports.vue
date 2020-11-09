<template>
    <v-tab-item>
      <div class="item-container">
        <v-date-picker v-model="picker" type="month" class="item-container__picker">
        </v-date-picker>
        <Table
          class="item-container__table"
          :data="shoutsToDisplay"
          @toggleView="toggleView"
          :view="tableView"
          :dateObj="this.createDateObj()"
      />
      </div>
        <RadarChart :data="shoutsToDisplay.slice(0, 7)" class="item-container__chart"/>
    </v-tab-item>
</template>

<script>
import { rankedShoutersFormatter, } from "../../shared/formatters";
import { getRankedByMonth } from "../../shared/apiCalls";
import Table from "./Table";
import RadarChart from "./RadarChart";

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