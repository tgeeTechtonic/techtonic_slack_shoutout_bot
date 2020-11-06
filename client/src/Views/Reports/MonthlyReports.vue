<template>
  <v-tab-item>
    <v-date-picker v-model="picker" type="month" color="green darken-1">
    </v-date-picker>
    <Table
      :data="shoutsToDisplay"
      :dateObj="this.createDateObj()"
      class="reports-container__table"
      :loading="loading"
      @toggleView="toggleView"
      :view="tableView"
    />
    <RadarChart :data="shoutsToDisplay.slice(0, 7)" />
  </v-tab-item>
</template>

<script>
import { getRankedByMonth } from '../../shared/apiCalls';
import { rankedShoutersFormatter } from '../../shared/formatters';
import RadarChart from './RadarChart';
import Table from './Table';

export default {
  name: 'MontlyReports',
  components: { Table, RadarChart },
  data() {
    return {
      loading: false,
      picker: new Date().toISOString().substr(0, 7),
      shoutsToDisplay: [],
      tableView: true,
    };
  },
  async created() {
    this.getRankedList();
  },
  methods: {
    toggleView: function() {
      this.tableView = !this.tableView;
    },
    getRankedList: async function() {
      this.loading = true;
      const { selectedMonth, selectedYear } = this.createDateObj();
      const formattedShouts = await getRankedByMonth(
        this.tableView ? 'shouter' : 'shoutee',
        selectedMonth,
        selectedYear
      );
      this.loading = false;
      
      if (formattedShouts.length) {
        this.shoutsToDisplay = rankedShoutersFormatter(formattedShouts);
      } else this.shoutsToDisplay = [];
    },
    createDateObj: function() {
      return {
        selectedMonth: this.picker.split('-')[1],
        selectedYear: this.picker.split('-')[0],
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
};
</script>

<style lang="scss"></style>
