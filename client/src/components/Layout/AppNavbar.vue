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
      <span v-if="admin.firstName" class="navbar__links">
        <NavDropdown
          title="Reports"
          :links="[
            { name: 'Monthly', path: '/reports/monthly' },
            { name: 'Users', path: '/reports/users' },
            { name: 'All Shoutouts', path: '/reports/all-shoutouts' },
          ]"
        />
        <NavDropdown
          title="About"
          :links="[
            { name: 'Overview', path: '/about' },
            { name: 'Company Values', path: '/company-values' },
          ]"
        />
        <NavDropdown
          :avatar="admin.avatar"
          :links="[{ name: 'Logout', path: '/logout' }]"
          @logout="logout"
        />
      </span>
    </v-app-bar>
  </nav>
</template>

<script>
import NavDropdown from './NavDropdown';

export default {
  name: 'AppNavbar',
  components: { NavDropdown },
  methods: {
    logout() {
      if (this.admin.firstName) this.$store.dispatch('logoutAdmin');
    },
  },
  computed: {
    admin() {
      return this.$store.state.admin;
    },
  },
  watch: {
    admin(newValue) {
      if (newValue.firstName) this.$router.push('/home');
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
  &__btn {
    background-color: v.$accent-green;
    font-family: v.$navbar-font;
    color: v.$main-grey-underlay;
    padding: 8px 7px;
    border-radius: 4px;

    &:hover {
      cursor: unset;
    }
  }
}
</style>
