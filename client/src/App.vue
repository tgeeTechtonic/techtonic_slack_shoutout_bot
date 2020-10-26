<template>
  <div id="app">
    <v-app>
      <Navbar />
      <v-main>
        <router-view />
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: { Footer, Navbar },
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
}
</style>
