<template>
  <footer>
    <p class="footer__copyright">
      Copyright © {{ getYear() }} Techtonic. All Rights Reserved. Privacy
      Policy.
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    getYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
<style lang="scss">
.footer {
  &__copyright {
    font-family: 'Roboto', sans-serif;
    font-size: 1.3rem;
  }
}
</style>
