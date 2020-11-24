<template>
  <v-tab-item class="user-container">
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
      <Table
        class="user-container__users-list"
        :data="usersList"
        :loading="loading"
        :restricted="{ footer: 'disable-items' }"
        :searchable="true"
        :selectable="true"
        @selectedUser="handleSelectedUser"
        title="Users"
      />
      <div v-if="selectedUser.id">
        <ProfileCard :user="selectedUser" :date="dateRange" />
      </div>
    </div>
  </v-tab-item>
</template>

<script>
import MonthRangePicker from './MonthRangePicker';
import ProfileCard from './ProfileCard';
import Table from '../../components/common/Table';

export default {
  name: 'UserReports',
  components: { ProfileCard, Table, MonthRangePicker },
  created() {
    this.$store.dispatch('getUsers');
  },
  data() {
    return {
      selectedUser: {},
      dateRange: {
        invalidDate: false,
        startDate: new Date().toISOString().substr(0, 4) + '-01',
        endDate: new Date().toISOString().substr(0, 7),
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading.users
    },
    usersList() {
      return this.$store.state.users.map(({ id, avatar, first_name, last_name }) => ({
        id,
        avatar,
        first_name,
        last_name,
      }));
    },
  },
  methods: {
    handleSelectedUser(userId) {
      this.selectedUser = this.$store.state.users
        .filter((user) => user.id === userId)
        .pop();
    },
    handleDateRange(date) {
      this.dateRange = date;
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

.user-container {
  background-color: v.$main-bkgrnd;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  &__table {
    align-self: center;
    display: flex;
    flex-direction: row;
    padding: 0 16px;
    width: 100%;
  }
  &__users-list {
    margin-right: 10px;
    width: 400px !important;
  }
}
</style>
