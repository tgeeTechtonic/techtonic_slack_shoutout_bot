<template>
  <v-menu
    bottom
    close-delay="200"
    content-class="navbar__menu rounded-b"
    open-on-hover
    rounded="0"
  >
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on" :ripple="false">
        <span v-if="title" class="navbar__link navbar__link--menu-heading">{{
          title
        }}</span>
        <v-avatar v-else size="42" class="navbar__avatar">
          <v-img :src="avatar"></v-img>
        </v-avatar>
        <v-icon dark>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list dark>
      <v-list-item v-for="(link, index) in links" :key="index">
        <router-link
          class="navbar__link"
          @click.native="(e) => handleLogout(link.path)"
          :to="link.path"
          >{{ link.name }}</router-link
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'NavDropdown',
  props: ['avatar', 'title', 'links'],
  methods: {
    handleLogout(path) {
      if (path === '/logout') this.$emit('logout');
    },
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as v;

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
