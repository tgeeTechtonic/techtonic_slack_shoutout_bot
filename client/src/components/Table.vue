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
        <v-toolbar-title>Table Title</v-toolbar-title>
      </v-toolbar>
    </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["data"],
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    headers() {
      return this.createHeaders(this.tableData[0]);
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