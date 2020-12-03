<template>
  <main class="content">
    <h1 class="not-found-heading">Not Found</h1>
    <section class="not-found-info">
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

.content {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.not-found-heading {
  margin: 0.67em 0 0.10em;
  color: v.$main-white;
  font-size: 5rem;
  font-weight: 800;
  font-family: v.$main-font;
}

.not-found-info {
  &__subtext  {
    color: v.$accent-grey;
    font-size: 1.2rem;
  }
}
</style>