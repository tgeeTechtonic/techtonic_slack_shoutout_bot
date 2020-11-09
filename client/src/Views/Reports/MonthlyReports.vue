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
          :loading="loading"
          :dateObj="this.createDateObj()"
      />
      </div>
        <RadarChart :data="shoutsToDisplay.slice(0, 7)" class="item-container__chart"/>
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
