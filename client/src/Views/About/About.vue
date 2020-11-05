<template>
  <article class="about">
    <section class="about__section about__intro">
      <p class="about__section-text about__intro-text">
        The year 2020 has been extraordinary in many ways. The values, teamwork,
        and desire to overcome whatever may happen has been the battle cry
        throughout the year. Because of this, we wanted to be more aware of
        recognizing those wins and celebrating those successes.
        <br />
        <br />
        What that means to you is a way to see our team, including you,
        differently by having access to each of those successes and wins that
        are recognized.
      </p>
    </section>
    <section class="about__section about__blurb">
      <p class="about__section-text about__blurb-text">
        INSERT MORE INFORMATION FROM JONATHAN HERE --
        <br />
        <br />
        What we are hoping to achive
        <br />
        Rewards
        <br />
        Goals
        <br />
        ETC
      </p>
    </section>
  </article>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables.scss' as v;

.about {
  margin: 0 0 100px 0;

  &__section {
    color: white;
    background-color: v.$main-grey-underlay;
    padding: 0px 50px;
  }
  &__section-text {
    font-size: 1.5rem;
    margin: 0px -50px;
    padding: 100px 50px;
    text-align: left;
  }
  &__intro {
    margin: 50px 50px 0px;
  }
  &__intro-text {
    border-bottom: 10px solid v.$accent-blue;
  }
  &__blurb {
    margin: 0px 50px;
  }
  &__blurb-text {
    border-bottom: 10px solid v.$accent-yellow;
  }
}
</style>
