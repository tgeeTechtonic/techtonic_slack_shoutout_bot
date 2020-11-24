<template>
  <v-tab-item>
    <MonthRangePicker @dateRange="handleDateRange" />
    <v-dialog v-model="dateRange.invalidDate" width="500">
      <v-card class="error-card">
        <v-card-title class="headline error-card__title lighten-2">
          Invalid Date Range Selected
        </v-card-title>
        <v-card-text>
          The dates you have chosen are not valid, please check your selection
          and try again.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dateRange.invalidDate = false">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="all-reports">
      <DataTable
        class="all-reports__table"
        :data="shoutouts"
        :loading="loading"
        :searchable="true"
        title="All Shoutouts"
      />
      <FillChart :data="shoutouts" class="all-reports__chart" />
    </div>
  </v-tab-item>
</template>

<script>
import { shoutoutFormatter } from '../../shared/formatters';
import DataTable from '../../components/common/DataTable';
import FillChart from './Charts/FillChart';
import MonthRangePicker from '../../components/common/MonthRangePicker';

export default {
  name: 'AllShouts',
  components: { DataTable, FillChart, MonthRangePicker },
  data() {
    return {
      dateRange: {
        invalidDate: false,
        startDate: new Date().toISOString().substr(0, 4) + '-01',
        endDate: new Date().toISOString().substr(0, 7),
      },
    };
  },
  created() {
    this.getShoutouts();
  },
  computed: {
    loading() {
      return this.$store.state.loading.shoutouts
    },
    shoutouts() {
      return shoutoutFormatter(this.$store.state.shoutouts);
    },
  },
  methods: {
    getShoutouts() {
      this.$store.dispatch('getShouts', {
        startDate: this.dateRange.startDate,
        endDate: this.dateRange.endDate,
      });
    },
    handleDateRange(date) {
      this.dateRange = date;
    },
  },
  watch: {
    dateRange() {
      this.getShoutouts();
    },
  },
};
</script>

<style lang="scss">
@use "../../assets/styles/variables.scss" as v;

.error-card {
  &__title {
    background-color: v.$accent-blue;
    color: v.$main-white;
  }
  .v-card__text {
    margin: 20px 0 0;
  }
}

.all-reports {
  background-color: v.$main-bkgrnd;
  display: flex;
  justify-content: space-evenly;
  width: 100%;

  &__table {
    margin: 1rem;
    width: 60%;
  }
  &__chart {
    margin: 1rem, 1rem, 0, 1rem;
    width: 50%;
  }
}
</style>
