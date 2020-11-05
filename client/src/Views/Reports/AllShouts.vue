<template>
    <v-tab-item>
        <Table :data="shouts" class="reports-container__table"/>
        <FillChart :data="shouts" />
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