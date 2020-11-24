<template>
  <div id="app">
    <v-app>
      <AppNavbar />
      <v-main>
        <router-view />
      </v-main>
      <AppFooter />
    </v-app>
  </div>
</template>

<script>
import AppFooter from './components/Layout/AppFooter';
import AppNavbar from './components/Layout/AppNavbar';

export default {
  name: 'App',
  components: { AppFooter, AppNavbar },
};
</script>

<style lang="scss">
@use './assets/styles/variables.scss' as v;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: v.$main-bkgrnd;
  color: v.$main-white;

  .v-main {
    margin: 120px 0 80px;
  }
}
</style>
