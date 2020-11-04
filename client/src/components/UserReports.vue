<template>
  <v-tab-item>
    <Table
      class="reports-container__table"
      :data="shouts"
      searchable="searchable"
    />
  </v-tab-item>
</template>

<script>
  import Table from "../components/Table";
  import { getAllUsers } from "../apiCalls";

  export default {
      name: "UserReports",
      components: { Table },
      data() {
          return {
              shouts: [],
          }
      },
      async created() {
          this.shouts = await getAllUsers();
      },
  }
</script>