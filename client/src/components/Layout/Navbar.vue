<template>
  <nav>
    <v-app-bar class="navbar">
      <router-link to="/">
        <img
          alt="Techtonic Logo"
          class="navbar__logo"
          src="../../assets/images/logo-techtonic.png"
        />
      </router-link>
      <span>
        <router-link class="navbar__link" to="/">Home</router-link>
        <router-link class="navbar__link" to="/reports">Reports</router-link>
        <router-link class="navbar__link" to="/about">About</router-link>
      </span>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {},
};
</script>

<style lang="scss">
@use "../../assets/styles/variables.scss" as v;

.navbar {
  background-color: v.$main-bkgrnd !important;
  height: 70px !important;

  .v-toolbar__content {
    height: 70px !important;
    justify-content: space-between;
  }
  &__logo {
    height: 40px;
  }
  &__link {
    color: v.$main-white !important;
    font-family: v.$navbar-font;
    font-size: 1.3rem;
    margin: auto 10px;
    text-decoration: none;

    &.router-link-exact-active {
      color: v.$accent-green !important;
    }
  }
}
</style>
