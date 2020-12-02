<template>
  <main>
    <section class="not-found-info">
      <p class="not-found-info__error">404 - Page Not Found</p>
      <p class="not-found-info__subtext">Sorry, we couldn't find the page you were looking for.</p>
      <p class="not-found-info__subtext">¯\_(ツ)_/¯</p>
    </section>
  </main>  
</template>

<script>
export default {
  name: 'Not Found',
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as v;

.not-found-info {
  &__error {
    color: v.$main-white;
    font-size: 5rem;
    font-weight: 800;
  }

  &__subtext  {
    color: v.$accent-grey;
  }
}
</style>