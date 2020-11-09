<template>
  <v-tab-item class="user-container">
    <div class="user-container__table">
      <Table
        :data="shouts"
        :searchable="true"
      />
    </div>
  </v-tab-item>
</template>

<script>
  import Table from "./Table";
  import { getAllUsers } from "../../shared/apiCalls";

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

<style lang="scss">
@use "../../assets/styles/variables.scss" as v;

.user-container {
  background-color: v.$main-bkgrnd;
  width: 100%;
  display: flex;
  justify-content: center;
  
  &__table {
    align-self: center;
    width: 700px;
  }
}
</style>