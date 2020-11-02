<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      item-key="shoutId"
      class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title v-if="type">Most Shoutouts Given In {{selectedMonth}}</v-toolbar-title>
        <v-toolbar-title v-else>Most Shoutouts Received In {{selectedMonth}}</v-toolbar-title>
      </v-toolbar>
      <v-switch
          v-model="handleToggle"
          :label="type ? 'Toggle To Received' : 'Toggle To Given'"
          class="mt-2"
      ></v-switch>
    </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["data", "type", "dateObj"],
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
        return this.type;
      },
      set(type) {
        this.$emit('rankView', type)
      }
    },
    selectedMonth() {
      const month = new Date(this.dateObj.selectedYear, this.dateObj.selectedMonth - 1, 1 )
      const monthName = month.toLocaleString("default", { month: "long" })
      return monthName;
    }
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