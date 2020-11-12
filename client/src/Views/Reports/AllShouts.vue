<template>
  <v-tab-item>
    <div class="all-reports">
      <Table :data="shoutouts" class="all-reports__table" title="All Shoutouts"/>
      <FillChart :data="shoutouts" class="all-reports__chart" />
    </div>
  </v-tab-item>
</template>

<script>
import { shoutoutFormatter } from "../../shared/formatters";
import FillChart from "./FillChart";
import Table from "./Table";

export default {
  name: "AllShouts",
  components: { Table, FillChart },
  created() {
    this.$store.dispatch("getShouts");
  },
  computed: {
    shoutouts() {
      return shoutoutFormatter(this.$store.state.shoutouts);
    },
  },
};
</script>

<style lang="scss">
@use "../../assets/styles/variables.scss" as v;

.all-reports {
  background-color: v.$main-bkgrnd;
  display: flex;
  justify-content: space-evenly;
  width: 100%;

  &__table {
    margin: 1rem;
    width: 60%;
  }
  &__chart {
    margin: 1rem, 1rem, 0, 1rem;
    width: 50%;
  }
}
</style>