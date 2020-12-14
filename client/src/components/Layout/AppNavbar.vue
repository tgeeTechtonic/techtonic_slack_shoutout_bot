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
          v-if="admin.firstName"
          :avatar="admin.avatar"
          :links="[
            { name: 'Profile', path: '/admin-profile' },
            { name: 'Company Values', path: '/company-values' },
            { name: 'Logout', path: '/logout' },
          ]"
          @logout="toggleLogin"
        />
        <router-link
          v-else
          class="navbar__link"
          to="login"
          @click.native="toggleLogin"
          >Login</router-link
        >
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
    toggleLogin() {
      this.$store.dispatch('toggleLogin');
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
      if (newValue.firstName) this.$router.go(-1);
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
}
</style>
