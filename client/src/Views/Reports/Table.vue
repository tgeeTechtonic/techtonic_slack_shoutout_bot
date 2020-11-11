<template>
  <div class="table-container">
    <v-data-table
      class="elevation-1"
      @click:row="handleSelection"
      :footer-props="searchable ? {
        'items-per-page-options': [10],
        'items-per-page-text': '',
      } : {}"
      :headers="headers"
      :height="searchable ? '528' : ''"
      :items="data"
      item-key="id"
      :items-per-page="5"
      :loading="loading"
      :search="search"
      :single-select="true"
      :sort-by="searchable ? 'first_name' : 'id'"
    >
      <template v-slot:top>
        <v-toolbar v-if="searchable">
          <v-toolbar-title class="table-container__title">
            Users
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-toolbar>

        <v-toolbar v-if="dateObj" class="table-container__title">
          <v-toolbar-title v-if="view">
            Most Shoutouts Given In {{ selectedDate.month }},
            {{ selectedDate.year }}
          </v-toolbar-title>
          <v-toolbar-title v-else>
            Most Shoutouts Received In {{ selectedDate.month }},
            {{ selectedDate.year }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch
            v-model="handleToggle"
            class="mt-5"
            :label="view ? 'Toggle To Recieved' : 'Toggle To Given'"
          ></v-switch>
        </v-toolbar>

        <v-toolbar v-if="all" class="table-container__title">
          <v-toolbar-title>
            All Shoutouts
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: ['data', 'view', 'dateObj', 'searchable', 'all', 'loading'],
  data() {
    return {
      search: '',
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
        this.$emit('toggleView', view);
      },
    },
    selectedDate() {
      const month = new Date(
        this.dateObj.selectedYear,
        this.dateObj.selectedMonth - 1,
        1
      );
      const monthName = month.toLocaleString('default', { month: 'long' });
      return {
        month: monthName,
        year: this.dateObj.selectedYear,
      };
    },
  },
  methods: {
    createHeaders(obj) {
      let headers = [];
      for (const key in obj) {
        if (key !== 'shoutId' && key !== 'id') {
          headers.push({
            text: this.capitalize(key),
            value: key,
          });
        }
      }
      headers[0] = { ...headers[0], align: 'start' };
      return headers;
    },
    capitalize(str) {
      return str
        .split('_')
        .map((s) => s[0].toUpperCase() + s.substring(1))
        .join(' ');
    },
    handleSelection(item, row) {
      row.select(true);
      this.selectedId = item.id;
      this.$emit('selectedUser', item.id)
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

<style lang="scss">
@use "../../assets/styles/variables.scss" as v;

tr.v-data-table__selected {
  background: v.$accent-green !important;
}
.table-container {
  &__title {
    padding: 0;
  }
  &__toggle-text {
    margin-left: 2rem;
  }
  &__search-bar {
    background-color: white;
  }
}
</style>
