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
        <DataTable
          class="profile-card__table"
          :data="userSummary"
          :loading="loading"
          :restricted="{ footer: 'all', disableSort: true }"
        />
      </h3>
    </v-card-text>
    <v-divider></v-divider>
    <v-expansion-panels multiple class="profile-card__summary">
      <v-expansion-panel>
        <v-expansion-panel-header>Shoutouts Given</v-expansion-panel-header>
        <v-expansion-panel-content>
          <DataTable
            :data="user.shoutoutsGiven"
            class="profile-card__table"
            :loading="loading"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Shoutouts Received</v-expansion-panel-header>
        <v-expansion-panel-content>
          <DataTable
            :data="user.shoutoutsReceived"
            class="profile-card__table"
            :loading="loading"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import DataTable from '@/components/common/DataTable';

export default {
  name: 'ProfileCard',
  components: { DataTable },
  props: ['user'],
  computed: {
    loading() {
      return this.$store.state.loading.user;
    },
    userSummary() {
      const {
        most_company_value_given,
        most_company_value_received,
        shoutoutsGiven,
        shoutoutsReceived,
      } = this.user;
      return [
        {
          num_shoutouts_given: shoutoutsGiven.length,
          num_shoutouts_received: shoutoutsReceived.length,
          most_company_value_given,
          most_company_value_received,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as v;

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
