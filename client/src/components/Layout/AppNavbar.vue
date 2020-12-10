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
          <router-link class="navbar__link navbar__link--heading" to="/">Home</router-link>
          <v-menu
            content-class="navbar__menu rounded-b"
            rounded="0"
            open-on-hover
            close-delay="200"
            bottom
          >
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" :ripple="false">
              <span
                class="navbar__link navbar__link--menu-heading"
                >Reports</span
              >
              <v-icon dark>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dark>
            <v-list-item>
              <router-link
                class="navbar__link"
                to="/reports/monthly"
                >Monthly</router-link
              >
            </v-list-item>
            <v-list-item>
              <router-link
                class="navbar__link"
                to="/reports/users"
                >Users</router-link
              >
            </v-list-item>
            <v-list-item>
              <router-link
                class="navbar__link"
                to="/reports/all-shoutouts"
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
              <span
                class="navbar__link navbar__link--menu-heading"
                to="/about"
                >About</span
              >
              <v-icon dark>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list dark>
            <v-list-item>
              <router-link
                class="navbar__link"
                to="/about"
                >Overview</router-link
              >
            </v-list-item>
            <v-list-item>
              <router-link
                class="navbar__link"
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
    padding: 0 3px !important;
    text-transform: none;
    letter-spacing: 0;
    vertical-align: initial;

    .mdi-chevron-down::before {
      color: v.$main-white !important;
      margin-top: 0.12em;
      font-size: 1.75rem;
    }

    .navbar__link {
      width: 100%;
      text-align: left;
      padding: 0px;
      margin-right: 2px;
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
    margin-right: 60px;
  }

  &__link {
    color: v.$main-white !important;
    font-family: v.$navbar-font;
    font-size: 1.3rem;
    text-decoration: none;
    padding: 0 18px;
    margin-right: 5px;
  }

  &__menu {
    top: 70px !important;
    background-color: v.$accent-dark-grey !important;
    border-top: 2px solid v.$accent-green !important;    

    .v-list {
      padding: 0;
    }

    .v-list-item {
      padding: 0;
      min-height: unset;
      
      .navbar__link {
        width: 100%;
        text-align: left;
        font-size: 1.1em;
        padding: 10px 20px;
        margin: 0;
      }

      :active: {
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
