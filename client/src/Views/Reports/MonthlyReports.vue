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
        :loading="loading"
        :title="tableTitle"
        :toggleable="true"
        @toggleView="toggleView"
      />
    </div>
    <RadarChart
      :data="shoutsToDisplay.slice(0, 7)"
      class="item-container__chart"
    />
  </v-tab-item>
</template>

<script>
import { rankedShoutersFormatter } from '../../shared/formatters';
import RadarChart from './RadarChart';
import Table from './Table';

export default {
  name: 'MonthlyReports',
  components: { Table, RadarChart },
  data() {
    return {
      picker: new Date().toISOString().substr(0, 7),
      shoutsToDisplay: [],
      tableView: true,
    };
  },
  created() {
    this.getRankedList();
  },
  methods: {
    createDateObj() {
      return {
        selectedMonth: this.picker.split('-')[1],
        selectedYear: this.picker.split('-')[0],
      };
    },
    getRankedList() {
      const { selectedMonth, selectedYear } = this.createDateObj();
      this.$store.dispatch('getRankedUsersByMonth', {
        type: this.tableView ? 'shouter' : 'shoutee',
        month: selectedMonth,
        year: selectedYear,
      });
    },
    selectedDate() {
      const selectedDate = new Date(
        this.picker.split('-')[0],
        this.picker.split('-')[1] - 1,
        1
      );

      return {
        month: selectedDate.toLocaleString('default', { month: 'long' }),
        year: selectedDate.toLocaleString('default', { year: 'numeric' }),
      };
    },
    toggleView() {
      this.tableView = !this.tableView;
    },
  },
  computed: {
    tableTitle() {
      const { month, year } = this.selectedDate();
      if (this.tableView)
        return `Most Shoutouts Given In ${month},
            ${year}`;
      else
        return `Most Shoutouts Received In ${month},
            ${year}`;
    },
    rankedUsers() {
      return rankedShoutersFormatter(this.$store.state.rankedUsers);
    },
    loading() {
      return this.$store.state.loading.rankedUsers;
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
  background-color: v.$main-bkgrnd;
  display: flex;
  justify-content: space-evenly;

  &__picker {
    color: v.$accent-blue;
    height: 380px;
    margin: 1rem;
  }
  &__table {
    margin: 1rem;
    width: 700px;
  }
  &__chart {
    background-color: v.$main-bkgrnd;
  }
}
</style>
