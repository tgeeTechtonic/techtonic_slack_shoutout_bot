<template>
  <div class="reports-container">
    <h2 @click="createHeaders(recentShouts[0])">Reports</h2>
    <Table :data="recentShouts" />
  </div>
</template>

<script>
import { mockGetData } from "../apiCall";
import { shoutsFormatter } from "../shared/formatters";
import Table from "../components/Table";

export default {
  name: "Reports",
  components: { Table },
  data() {
    return {
      recentShouts: [],
    };
  },
  computed: {
    headers() {
      return this.createHeaders(this.recentShouts);
    },
    formattedShoutouts() {
      return 1;
    },
  },
  async created() {
    this.recentShouts = shoutsFormatter(await mockGetData());
  },
};
</script>

<style scoped>
</style>