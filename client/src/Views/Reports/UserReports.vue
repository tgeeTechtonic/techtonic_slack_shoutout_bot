<template>
  <v-tab-item class="user-container">
    <div class="user-container__table">
      <Table
        class="user-container__users-list"
        :data="usersList"
        :searchable="true"
        @selectedUser="handleSelectedUser"
      />
      <div class="user-container__placeholder">{{ selectedUserId }}</div>
    </div>
  </v-tab-item>
</template>

<script>
import Table from './Table';

export default {
  name: 'UserReports',
  components: { Table },
  created() {
    this.$store.dispatch('getUsers');
  },
  data() {
    return {
      selectedUserId: -1,
    };
  },
  computed: {
    usersList() {
      return this.$store.state.users.map(({ id, first_name, last_name }) => ({
        id,
        first_name,
        last_name,
      }));
    },
  },
  methods: {
    handleSelectedUser(userId) {
      this.selectedUserId = userId;
    },
  },
};
</script>

<style lang="scss">
@use "../../assets/styles/variables.scss" as v;

.user-container {
  background-color: v.$main-bkgrnd;
  width: 100%;
  display: flex;
  justify-content: center;

  &__table {
    align-self: center;
    display: flex;
    flex-direction: row;
  }
  &__users-list {
    margin-right: 10px;
    width: 400px !important;
  }
  &__placeholder {
    margin-left: 10px;
    width: 700px;
  }
}
</style>
