<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      item-key="shoutId"
      class="elevation-1"
    >
      <template v-if="dateObj" v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title v-if="view"
            >Most Shoutouts Given In {{ selectedMonth }}</v-toolbar-title
          >
          <v-toolbar-title v-else
            >Most Shoutouts Received In {{ selectedMonth }}</v-toolbar-title
          >
        </v-toolbar>
        <v-switch
          v-model="handleToggle"
          :label="view ? 'Toggle To Received' : 'Toggle To Given'"
          class="mt-2"
        ></v-switch>
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
    selectedMonth() {
      const month = new Date(
        this.dateObj.selectedYear,
        this.dateObj.selectedMonth - 1,
        1
      );
      const monthName = month.toLocaleString("default", { month: "long" });
      return monthName;
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
</style>
