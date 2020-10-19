<template>
  <nav>
    <v-app-bar class="navbar" fade-img-on-scroll>
      <router-link class="navbar__link" to="/">Home</router-link> |
      <router-link class="navbar__link" to="/reports">Reports</router-link>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {},
};
</script>

<style lang="scss" scoped>
.navbar {
  &__link {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>