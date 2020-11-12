<template>
  <v-tab-item class="user-container">
    <div class="user-container__table">
      <Table
        class="user-container__users-list"
        :data="usersList"
        :restricted="true"
        :searchable="true"
        :selectable="true"
        @selectedUser="handleSelectedUser"
        title="Users"
      />
      <div v-if="selectedUser.id">
        <ProfileCard :user="selectedUser" />
      </div>
    </div>
  </v-tab-item>
</template>

<script>
import ProfileCard from './ProfileCard';
import Table from './Table';

export default {
  name: 'UserReports',
  components: { ProfileCard, Table },
  created() {
    this.$store.dispatch('getUsers');
  },
  data() {
    return {
      selectedUser: {},
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
      this.selectedUser = this.$store.state.users
        .filter((user) => user.id === userId)
        .pop();
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
    width: 90%;
  }
  &__users-list {
    margin-right: 10px;
    width: 400px !important;
  }
}
</style>
