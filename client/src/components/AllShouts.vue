<template>
    <v-tab-item>
        <Table :data="shouts" class="reports-container__table"/>
        <FillChart :data="shouts" />
    </v-tab-item>
</template>

<script>
    import Table from "../components/Table";
    import FillChart from "../components/FillChart";
    import { getAllShouts } from "../apiCalls";
    import { shoutoutFormatter } from "../shared/formatters";

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