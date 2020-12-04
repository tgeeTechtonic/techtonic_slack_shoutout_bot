<template>
  <v-tab-item class="all-container">
    <v-row>
      <v-col />
      <v-col cols="10" xl="6">
        <div class="all-reports">
          <FillChart :data="shoutouts" class="all-reports__chart" />
          <MonthRangePicker @dateRange="handleDateRange" />
          <v-dialog v-model="dateRange.invalidDate" width="500">
            <v-card class="error-card">
              <v-card-title class="headline error-card__title lighten-2">
                Invalid Date Range Selected
              </v-card-title>
              <v-card-text>
                The dates you have chosen are not valid, please check your
                selection and try again.
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="dateRange.invalidDate = false"
                >
                  Ok
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <DataTable
            class="all-reports__table"
            :data="shoutouts"
            :loading="loading"
            :searchable="true"
            title="All Shoutouts"
          />
        </div>
      </v-col>
      <v-col />
    </v-row>
  </v-tab-item>
</template>

<script>
import DataTable from '@/components/common/DataTable';
import FillChart from './Charts/FillChart';
import MonthRangePicker from '@/components/common/MonthRangePicker';

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
      return this.$store.state.loading.shoutouts;
    },
    shoutouts() {
      return this.$store.state.shoutouts.map(
        ({ date, shoutee, shouter, shoutout, value }) => ({
          date,
          shoutee,
          shouter,
          shoutout,
          value,
        })
      );
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
@use "@/assets/styles/variables.scss" as v;

.row-container {
  background-color: v.$table-white !important;
  border-radius: 5px 5px 0 0;
  margin-bottom: 0;
  width: 100%;
  height: 90px;

  .col-sm-3,
  .col-11 {
    flex: 0 0 33%;
    max-width: 200px;
    padding: 20px 0;
  }
}

.error-card {
  &__title {
    background-color: v.$accent-blue;
    color: v.$main-white;
  }
  .v-card__text {
    margin: 20px 0 0;
  }
}

.all-container {
  background-color: v.$main-bkgrnd;
}

.all-reports {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

  &__table {
    width: 100%;
  }
  &__chart {
    margin: 1rem 1rem 0 1rem;
    width: 100%;
  }

  .v-data-table__wrapper {
    height: 287px;
    overflow-y: scroll !important;

    &::-webkit-scrollbar {
      width: 11px;
    }
    &::-webkit-scrollbar-track {
      background: v.$main-white;
    }
    &::-webkit-scrollbar-thumb {
      background-color: v.$main-grey;
      border-radius: 6px;
      border: 3px solid v.$main-white;
    }
  }
}
</style>
