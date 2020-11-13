<template>
  <div class="table-container">
    <v-data-table
      class="elevation-1"
      @click:row="handleSelection"
      :footer-props="customFooter"
      :headers="headers"
      :hide-default-footer="hideFooter"
      :items="data"
      item-key="id"
      :items-per-page="5"
      :loading="loading"
      :search="search"
      :single-select="true"
      :sort-by="sortBy"
    >
      <template v-slot:top>
        <v-toolbar v-if="title" class="table-container__title">
          <v-toolbar-title>
            {{ title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-if="searchable"
            hide-details
            append-icon="mdi-magnify"
            label="Search"
            single-line
            v-model="search"
          />
          <v-switch
            v-if="toggleable"
            class="mt-5"
            :label="showingGiven ? 'Toggle To Received' : 'Toggle To Given'"
            v-model="handleToggle"
          ></v-switch>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { capitalizeWordFormatter } from '../../shared/formatters';

export default {
  name: 'Table',
  props: [
    'data', // DATA COMING IN TO BE DISPLAYED
    'loading', // STATE OF DATA RETRIEVAL
    'restricted', // LIMITING THE FUNCTIONALITY OF THE TABLE IN SOME WAY
    'searchable', // HAVING A SEARCH BAR INCLUDED IN THE TABLE
    'selectable', // BEING ABLE TO CLICK / SELECT ROWS IN THE TABLE (EX. USERS TABLE)
    'title', // TITLE FOR THE TABLE
    'toggleable', // HAVING A TOGGLE BUTTON ON THE TABLE TO SWITCH VIEWS
  ],
  data() {
    return {
      search: '',
      tableData: [],
      showingGiven: true,
    };
  },
  computed: {
    customFooter() {
      if (this.restricted?.footer === 'disable-items')
        return {
          'items-per-page-options': [10], // HOW MANY RESULTS PER PAGE TO SHOW
          'items-per-page-text': '', // REMOVES ROWS PER PAGE TEXT AND DROPDOWN SELECTOR
        };
      else return {};
    },
    headers() {
      return this.createHeaders(this.tableData[0]);
    },
    hideFooter() {
      return this.restricted?.footer === 'all';
    },
    sortBy() {
      return this.searchable ? 'first_name' : 'id';
    },
    handleToggle: {
      get() {
        return this.showingGiven;
      },
      set() {
        this.$emit('toggleView', this.showingGiven);
      },
    },
  },
  methods: {
    createHeaders(obj) {
      let headers = [];
      for (const key in obj) {
        if (key !== 'shoutId' && key !== 'id') {
          headers.push({
            text: capitalizeWordFormatter(key),
            value: key,
          });
        }
      }
      headers[0] = { ...headers[0], align: 'start' };
      return headers;
    },
    handleSelection(item, row) {
      if (this.selectable) {
        row.select(true);
        this.$emit('selectedUser', item.id);
      }
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
    background-color: v.$main-white;
  }
}
</style>
