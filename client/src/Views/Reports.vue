<template>
<div class='reports-container'>
  <h2>Reports</h2>
  <v-data-table
    :headers="tableHeaders"
    :items="recentShouts"
    item-key="shoutId"
    class="elevation-1"
    >
  </v-data-table>

</div>
</template>

<script>
import { mockGetData } from "../apiCall";

export default {
  name: "Reports",
  data() {
    return {
      tableHeaders: [
        {
          text: 'Shoutee',
          align: 'start',
          value: 'shoutee.first_name' },
        { text: 'Shouter', value: 'shouter.first_name' },
        { text: 'Company Value', value: 'values' },
        { text: 'Date', value: 'date' },
        { text: 'Slack ID', value: 'shouter.slack_handle' },
      ],
      recentShouts: [],
    }
  },
  async created () {
    this.recentShouts = await mockGetData();
  },
};
</script>

<style scoped>
</style>