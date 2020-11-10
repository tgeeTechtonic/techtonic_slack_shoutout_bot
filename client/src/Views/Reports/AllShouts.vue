<template>
  <v-tab-item>
    <div class="all-reports">
      <Table :data="shoutouts" :all="true" class="all-reports__table" />
      <FillChart :data="shoutouts" class="all-reports__chart" />
    </div>
  </v-tab-item>
</template>

<script>
import Table from "./Table";
import FillChart from "./FillChart";
import { shoutoutFormatter } from "../../shared/formatters";

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
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  &__table {
    width: 60%;
    margin: 1rem;
  }
  &__chart {
    width: 50%;
    margin: 1rem, 1rem, 0, 1rem;
  }
}
</style>