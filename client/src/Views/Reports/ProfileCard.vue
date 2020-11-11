<template>
  <v-card v-if="user.id" :key="user.id" class="pt-6 mx-auto profile-card" flat>
    <v-card-text>
      <v-avatar size="88">
        <v-img :src="user.avatar" class="mb-6"></v-img>
      </v-avatar>
      <h3 class="headline mb-2">
        {{ user.first_name }}
        {{ user.last_name }}
      </h3>
      <div class="blue--text mb-2">
        {{ user.email }}
      </div>
      <div class="blue--text subheading font-weight-bold">
        {{ user.slack_handle }}
        {{ user.job_title ? `  |  ${user.job_title}` : '' }}
      </div>
    </v-card-text>
    <v-divider></v-divider>
  </v-card>
  <v-card v-else class="profile-card__placeholder"></v-card>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: ['user'],
};
</script>

<style lang="scss" scoped>
@use "../../assets/styles/variables.scss" as v;

.profile-card {
  width: calc(100vw - 550px);
  &__placeholder {
    background-color: v.$main-bkgrnd;
  }
}
</style>
