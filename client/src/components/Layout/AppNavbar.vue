<template>
  <nav>
    <v-app-bar class="navbar">
      <router-link to="/">
        <img
          alt="Techtonic Logo"
          class="navbar__logo"
          src="@/assets/images/logo-techtonic.png"
        />
      </router-link>
      <span class="navbar__links">
        <router-link class="navbar__link" to="/">Home</router-link>
        <v-menu
          content-class="navbar__menu"
          open-on-hover
          close-delay="200"
          rounded="0"
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <router-link
                class="navbar__link navbar__link--menu-header"
                to="/reports"
                >Reports</router-link
              >
              <v-icon dark>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dark>
            <v-list-item>
              <router-link
                class="navbar__link navbar__link--menu-item"
                to="/reports"
                >Monthly</router-link
              >
            </v-list-item>
            <v-list-item>
              <router-link
                class="navbar__link navbar__link--menu-item"
                to="/reports"
                >Users</router-link
              >
            </v-list-item>
            <v-list-item>
              <router-link
                class="navbar__link navbar__link--menu-item"
                to="/reports"
                >All Shoutouts</router-link
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          content-class="navbar__menu"
          offset-y
          open-on-hover
          close-delay="200"
          close-on-content-click
          rounded="0"
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              <router-link
                class="navbar__link navbar__link--menu-header"
                to="/about"
                >About</router-link
              >
              <v-icon dark>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dark>
            <v-list-item>
              <router-link
                class="navbar__link navbar__link--menu-item"
                to="/company-values"
              >
                Company Values
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
      </span>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  methods: {},
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as v;
nav {
  position: fixed;
  width: 100%;
  z-index: 12;
}
.navbar {
  background-color: v.$main-bkgrnd !important;
  height: 70px !important;

  .v-btn {
    padding: 0 !important;
    text-transform: none;
    letter-spacing: 0;
    vertical-align: initial;

    .mdi-chevron-down::before {
      color: v.$main-white !important;
    }
  }

  .v-toolbar__content {
    height: 70px !important;
    justify-content: space-between;
  }
  &__logo {
    height: 40px;
  }

  &__links {
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    width: 270px;
  }

  &__link {
    color: v.$main-white !important;
    font-family: v.$navbar-font;
    font-size: 1.3rem;
    text-decoration: none;

    &--menu-item {
      width: 100%;
      text-align: left;
      font-size: 1.1em;
      padding: 10px 20px;
    }

    &--menu-header {
      margin-right: 2px;
    }
  }

  &__menu {
    top: 71px !important;

    .v-list-item {
      padding: 0;
      :hover {
        background-color: v.$main-grey-underlay !important;
      }
    }
  }
}
</style>
