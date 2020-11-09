<template>
  <v-tab-item>
    <div class="all-reports">
      <Table :data="shouts" :all="true" class="all-reports__table" />
      <FillChart :data="shouts" class="all-reports__chart"/>
    </div>
  </v-tab-item>
</template>

<script>
    import Table from "./Table";
    import FillChart from "./FillChart";
    import { getAllShouts } from "../../shared/apiCalls";
    import { shoutoutFormatter } from "../../shared/formatters";

    export default {
        name: "AllShouts",
        components: { Table, FillChart },
        data() {
          return {
            shouts: [],
          }
        },
        async created() {
          this.shouts = shoutoutFormatter(await getAllShouts());
        },
    }
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