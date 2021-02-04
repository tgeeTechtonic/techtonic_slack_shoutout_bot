<template>
  <v-card v-if="user.id" :key="user.id" class="mx-auto profile-card" flat>
    <v-expansion-panels v-model="panel" single class="profile-card__panels">
      <v-expansion-panel key="0">
        <v-expansion-panel-header
          >{{ user.first_name }} {{ user.last_name }} Shoutouts
          Summary</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-card-text>
            <v-avatar size="88" class="profile-card__avatar">
              <v-img :src="user.avatar"></v-img>
            </v-avatar>
            <h3 class="headline mb-2">
              {{ user.first_name }}
              {{ user.last_name }}
            </h3>
            <div class="blue--text mb-2">
              <a class=profile-card__email-link :href="emailLink" target="_blank">{{ user.email }}</a>
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
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel key="1">
        <v-expansion-panel-header
          >Shoutouts Given by {{ user.first_name }}</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <DataTable
            :data="user.shoutoutsGiven"
            class="profile-card__table"
            :loading="loading"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel key="2">
        <v-expansion-panel-header
          >Shoutouts Received by {{ user.first_name }}</v-expansion-panel-header
        >
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
  data() {
    return {
      panel: 0,
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading.user;
    },
    emailLink() {
      return "https://mail.google.com/mail/?view=cm&to=" + this.user.email;
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
  watch: {
    user() {
      this.panel = 0;
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
  background-color: v.$accent-green;
  font-weight: 600;
}
.profile-card {
  height: 585px;
  max-width: 850px;
  overflow: auto;
  width: calc(100vw - 440px);

  &__avatar {
    margin: 0 0 10px;
  }
  &__panels {
    .v-data-table__wrapper {
      max-height: 333px;
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

  &__email-link {
    text-decoration: none;
  }
}
</style>
