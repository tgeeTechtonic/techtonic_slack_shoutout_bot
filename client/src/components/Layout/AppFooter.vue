<template>
  <footer class="footer" data-testid="footer">
    <p class="footer__copyright">
      Copyright © {{ getYear() }} Techtonic. All Rights Reserved. Privacy
      Policy.
    </p>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  methods: {
    getYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
<style lang="scss">
.footer {
  margin-bottom: 15px;

  &__copyright {
    font-family: 'Roboto', sans-serif;
    font-size: 1.3rem;
  }
}
</style>
