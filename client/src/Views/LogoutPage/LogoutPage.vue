<template>
  <v-container class="logout-page">
    <div>
      <v-row>
        <h2>Logging Out</h2>
      </v-row>
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-progress-circular
          color="grey lighten-5"
          indeterminate
          :size="70"
          :width="7"
        ></v-progress-circular>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'LogoutPage',
  created() {
    setTimeout(() => {
      this.$router.push('/');
    }, 2000);
  },
};
</script>

<style scoped lang="scss">
.logout-page {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  .row {
    margin: 50px 0;
  }
}
</style>
