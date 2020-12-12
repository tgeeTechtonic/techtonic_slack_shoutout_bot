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
        <router-link class="navbar__link navbar__link--heading" to="/"
          >Home</router-link
        >
        <v-menu
          content-class="navbar__menu rounded-b"
          rounded="0"
          open-on-hover
          close-delay="200"
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" :ripple="false">
              <span class="navbar__link navbar__link--menu-heading"
                >Reports</span
              >
              <v-icon dark>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dark>
            <v-list-item>
              <router-link class="navbar__link" to="/reports/monthly"
                >Monthly</router-link
              >
            </v-list-item>
            <v-list-item>
              <router-link class="navbar__link" to="/reports/users"
                >Users</router-link
              >
            </v-list-item>
            <v-list-item>
              <router-link class="navbar__link" to="/reports/all-shoutouts"
                >All Shoutouts</router-link
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu
          bottom
          offset-y
          open-on-hover
          rounded="0"
          close-delay="200"
          content-class="navbar__menu rounded-b"
          close-on-content-click
        >
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" :ripple="false">
              <span class="navbar__link navbar__link--menu-heading" to="/about"
                >About</span
              >
              <v-icon dark>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dark>
            <v-list-item>
              <router-link class="navbar__link" to="/about"
                >Overview</router-link
              >
            </v-list-item>
            <v-list-item>
              <router-link class="navbar__link" to="/company-values">
                Company Values
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <router-link class="navbar__link" to="login" @click.native="toggleLogin"
          >Login</router-link
        >
      </span>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  methods: {
    toggleLogin() {
      this.$store.dispatch('toggleLogin');
    },
  },
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
    letter-spacing: 0;
    padding: 0 3px !important;
    text-transform: none;
    vertical-align: initial;

    .mdi-chevron-down::before {
      color: v.$main-white !important;
      font-size: 1.75rem;
      margin-top: 0.12em;
    }
    .navbar__link {
      margin-right: 2px;
      padding: 0px;
      text-align: left;
      width: 100%;
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
    align-items: center;
    display: inline-flex;
    flex-wrap: nowrap;
  }
  &__link {
    color: v.$main-white !important;
    font-family: v.$navbar-font;
    font-size: 1.3rem;
    text-decoration: none;
    padding: 0 8px;
    margin-right: 5px;
  }
  &__menu {
    background-color: v.$accent-dark-grey !important;
    border-top: 2px solid v.$accent-green !important;
    top: 70px !important;

    .v-list {
      padding: 0;
    }
    .v-list-item {
      min-height: unset;
      padding: 0;

      .navbar__link {
        font-size: 1.1em;
        margin: 0;
        padding: 10px 20px;
        text-align: left;
        width: 100%;
      }
      :active {
        background-color: v.$main-black-overlay;
        color: v.$main-white;
      }
      :hover {
        background-color: v.$accent-green !important;
        color: v.$accent-dark-grey !important;
      }
    }
  }
}
</style>
