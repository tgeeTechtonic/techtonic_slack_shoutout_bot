<template>
  <div class="user-container">
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

    <div class="user-container__table">
      <DataTable
        class="user-container__users-list"
        :data="usersList"
        :loading="loading"
        :searchable="true"
        :selectable="true"
        @selectedUser="handleSelectedUser"
        title="Users"
      />
      <div v-if="user.id" class="user-container__profile-card">
        <UserProfileCard :user="user" />
      </div>
      <div v-else class="user-container__profile-card--placeholder"></div>
    </div>
  </div>
</template>

<script>
import MonthRangePicker from '@/components/common/MonthRangePicker';
import DataTable from '@/components/common/DataTable';
import UserProfileCard from './UserProfileCard';

export default {
  name: 'UserReports',
  components: { DataTable, UserProfileCard, MonthRangePicker },
  created() {
    this.$store.dispatch('getUsers');
  },
  data() {
    return {
      dateRange: {
        invalidDate: false,
        startDate: new Date().toISOString().substr(0, 4) + '-01',
        endDate: new Date().toISOString().substr(0, 7),
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading.users;
    },
    usersList() {
      return this.$store.state.users.map(
        ({ id, avatar, first_name, last_name }) => ({
          id,
          avatar,
          first_name,
          last_name,
        })
      );
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    handleSelectedUser(userId) {
      this.$store.dispatch('getUser', { userId, ...this.dateRange });
    },
    handleDateRange(date) {
      this.dateRange = date;
    },
  },
  watch: {
    dateRange() {
      this.$store.dispatch('getUser', {
        userId: this.user.id,
        ...this.dateRange,
      });
    },
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as v;

.error-card {
  &__title {
    background-color: v.$accent-blue;
    color: v.$main-white;
  }
  .v-card__text {
    margin: 20px 0 0;
  }
}
.user-container {
  background-color: v.$main-bkgrnd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  .row-container {
    background-color: v.$table-white !important;
    border-radius: 5px 5px 0 0;
    height: 100px;
    margin-bottom: 0;
    padding-right: 10px;
    width: 400px;

    .col-sm-3,
    .col-11 {
      flex: 0 0 40%;
      max-width: 200px;
      padding: 20px 0;
    }
  }
  .table-container__title {
    border-radius: 0;
    height: 64px !important;
  }

  &__table {
    align-self: center;
    display: flex;
    flex-direction: row;
    margin-bottom: -20px;
    max-height: 485px;
    padding: 0 14px 0 16px;
    width: 100%;
  }
  &__users-list {
    margin-right: 5px;
    width: 400px !important;

    .v-data-table {
      line-height: 4.4;
    }
    .v-data-table__wrapper {
      height: 362px;
      overflow-y: scroll !important;

      &::-webkit-scrollbar {
        width: 11px;
      }
      &::-webkit-scrollbar-track {
        background: v.$main-white;
      }
      &::-webkit-scrollbar-thumb {
        background-color: v.$main-grey;
        border: 3px solid v.$main-white;
        border-radius: 6px;
      }
    }
  }
  &__profile-card {
    margin-left: 5px;
    position: relative;
    top: -100px;
  }
}

@media (min-width: 1290px) {
  .user-container {
    &__table {
      width: unset;
    }
    &__profile-card--placeholder {
      margin-left: 10px;
      width: 845px;
    }
    .row-container {
      position: relative;
      right: calc(-50% + 645px);
    }
  }
}
</style>
