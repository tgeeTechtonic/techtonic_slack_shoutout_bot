<template>
  <div class="table">
    <v-data-table
      :headers="headers"
      :items="data"
      item-key="shoutId"
      class="elevation-1"
    >
      <template v-if="dateObj" v-slot:top>
        <v-toolbar>
          <v-toolbar-title v-if="view" class="table__title">
            Most Shoutouts Given In {{ selectedDate.month }}, {{ selectedDate.year }}
          </v-toolbar-title>
          <v-toolbar-title v-else>
            Most Shoutouts Received In {{ selectedDate.month }}, {{ selectedDate.year }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch
            v-model="handleToggle"
            :label="view ? 'Toggle To Received' : 'Toggle To Given'"
            class="mt-5"
          ></v-switch>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["data", "view", "dateObj"],
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    headers() {
      return this.createHeaders(this.tableData[0]);
    },
    handleToggle: {
      get() {
        return this.view;
      },
      set(view) {
        this.$emit("toggleView", view);
      },
    },
    selectedDate() {
      const month = new Date(
        this.dateObj.selectedYear,
        this.dateObj.selectedMonth - 1,
        1
      );
      return {
        month: month.toLocaleString("default", { month: "long" }),
        year: this.dateObj.selectedYear
      }
    },
  },
  methods: {
    createHeaders(obj) {
      let headers = [];
      for (const key in obj) {
        if (key !== "shoutId") {
          headers.push({
            text: this.capitalize(key),
            value: key,
          });
        }
      }
      headers[0] = { ...headers[0], align: "start" };
      return headers;
    },
    capitalize(str) {
      return str
        .split("_")
        .map((s) => s[0].toUpperCase() + s.substring(1))
        .join(" ");
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(newValue) {
        this.tableData = newValue;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  &__title {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
}
</style>
