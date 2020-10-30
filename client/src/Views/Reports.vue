<template>
  <div class="reports-container">
    <h2 @click="createHeaders(recentShouts[0])">Reports</h2>
    <Table :data="recentShouts" />
    <FillChart :data="recentShouts" />
  </div>
</template>

<script>
import { getAllShouts } from "../apiCall";
import { shoutsFormatter } from "../shared/formatters";
import Table from "../components/Table";
import FillChart from "../components/FillChart";

export default {
  name: "Reports",
  components: { Table, FillChart },
  data() {
    return {
      recentShouts: [],
    };
  },
  computed: {
    headers() {
      return this.createHeaders(this.recentShouts);
    },
  },
  async created() {
    this.recentShouts = shoutsFormatter(await getAllShouts());
  },
};
</script>

<style scoped>
</style>