<template>
  <v-card v-if="user.id" :key="user.id" class="pt-6 mx-auto profile-card" flat>
    <v-card-text>
      <v-avatar size="88" class="profile-card__avatar">
        <v-img :src="user.avatar"></v-img>
      </v-avatar>
      <h3 class="headline mb-2">
        {{ user.first_name }}
        {{ user.last_name }}
      </h3>
      <div class="blue--text mb-2">
        {{ user.email }}
      </div>
      <div class="blue--text subheading font-weight-bold">
        @{{ user.slack_handle }}
        {{ user.job_title ? `  |  ${user.job_title}` : '' }}
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <h3 class="headline mb-2">
        <Table
          class="profile-card__table"
          :data="selectedUser.summary"
          :restricted="{ footer: 'all', disableSort: true }"
        />
      </h3>
    </v-card-text>
    <v-divider></v-divider>
    <v-expansion-panels multiple class="profile-card__summary">
      <v-expansion-panel>
        <v-expansion-panel-header>Shoutouts Given</v-expansion-panel-header>
        <v-expansion-panel-content>
          <Table
            :data="selectedUser.shoutoutsGiven"
            :all="true"
            class="profile-card__table"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Shoutouts Received</v-expansion-panel-header>
        <v-expansion-panel-content>
          <Table
            :data="selectedUser.shoutoutsReceived"
            :all="true"
            class="profile-card__table"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { userShoutoutsFormatter } from '../../shared/formatters';
import Table from './Table';

export default {
  name: 'ProfileCard',
  components: { Table },
  props: ['user', 'date'],
  created() {
    this.getShoutouts();
  },
  computed: {
    selectedUser() {
      return userShoutoutsFormatter(this.$store.state.user);
    },
  },
  methods: {
    getShoutouts() {
      this.$store.dispatch('getUserShoutoutsByType', {
        userId: this.user.id,
        type: 'shoutee',
        startDate: this.date.startDate,
        endDate: this.date.endDate,
      });
      this.$store.dispatch('getUserShoutoutsByType', {
        userId: this.user.id,
        type: 'shouter',
        startDate: this.date.startDate,
        endDate: this.date.endDate,
      });
    },
  },
  watch: {
    user() {
      this.getShoutouts();
    },
    date() {
      this.getShoutouts();
    },
  },
};
</script>

<style lang="scss">
@use "../../assets/styles/variables.scss" as v;

.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
.v-expansion-panel--active > .v-expansion-panel-header {
  color: v.$main-white;
  background-color: v.$accent-blue;
}
.profile-card {
  width: calc(100vw - 440px);

  &__avatar {
    margin: 0 0 10px;
  }
  &__summary {
    margin: 0px 0 35px;
  }
}
</style>
