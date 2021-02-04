<template>
  <div class="table-container">
    <v-data-table
      class="elevation-1"
      @click:row="handleSelection"
      :disable-sort="disableSort"
      :expanded.sync="expanded"
      :footer-props="customFooter"
      :headers="headers"
      :hide-default-footer="hideFooter"
      :items="data"
      item-key="id"
      :items-per-page="5"
      :loading="loading"
      ref="dataTableRef"
      :search="search"
      :show-expand="showExpand"
      :single-expand="true"
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
            clearable
            hide-details
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
          <v-btn
            @click="handleExport"
            class="ml-3 mr-1 primary--text"
            depressed
            icon
            plain
            large
            v-if="exportable"
          >
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:[`item.avatar`]="{ item }">
        <v-avatar icon> <v-img :src="item.avatar"> </v-img></v-avatar>
      </template>
      <template v-if="expandable" v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          {{ expandableRowContent(item) }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { capitalizeWordFormatter } from '@/shared/formatters';

export default {
  name: 'DataTable',
  props: [
    'data', // DATA COMING IN TO BE DISPLAYED
    'expandable', // BEING ABLE TO HAVE EXPANDABLE ROWS ON THE TABLE
    'exportable', // ADDS AN EXPORT BUTTON TO TABLE TOOLBAR
    'loading', // STATE OF DATA RETRIEVAL
    'restricted', // LIMITING THE FUNCTIONALITY OF THE TABLE IN SOME WAY
    'searchable', // HAVING A SEARCH BAR INCLUDED IN THE TABLE
    'selectable', // BEING ABLE TO CLICK / SELECT ROWS IN THE TABLE (EX. USERS TABLE)
    'title', // TITLE FOR THE TABLE
    'toggleable', // HAVING A TOGGLE BUTTON ON THE TABLE TO SWITCH VIEWS
  ],
  data() {
    return {
      expanded: [],
      search: '',
      showingGiven: true,
      tableData: [],
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
    disableSort() {
      return this.restricted?.disableSort;
    },
    headers() {
      return this.createHeaders(this.tableData[0]);
    },
    hideFooter() {
      return this.restricted?.footer === 'all';
    },
    showExpand() {
      return this.expandable?.type?.length > 0;
    },
    sortBy() {
      return this.searchable ? 'first_name' : 'id';
    },
    handleToggle: {
      get() {
        return this.showingGiven;
      },
      set() {
        this.showingGiven = !this.showingGiven;
        this.$emit('toggleView', this.showingGiven);
      },
    },
  },
  methods: {
    createHeaders(obj) {
      let headers = [];
      for (const key in obj) {
        if (key !== 'shoutId' && key !== 'id' && key !== 'avatar') {
          headers.push({
            text: capitalizeWordFormatter(key),
            value: key,
          });
        } else if (key === 'avatar') {
          headers.push({
            text: '',
            value: key,
            filter: () => {
              if (!this.avatar) return true; // REMOVES THE AVATAR COLUMN FROM THE SEARCH RESULTS
            },
            sort: () => {
              return -1; // ALTERS SORTING IN THE AVATAR COLUMN TO ALIGN WITH FIRST NAME COLUMN
            },
          });
        }
      }
      if (this.$props.expandable) {
        headers.push({
          text: '',
          sortable: false,
          width: '1px',
          value: 'data-table-expand',
        });
      }

      headers[0] = { ...headers[0], align: 'start' };
      return headers;
    },
    expandableRowContent(item) {
      const { content, row } = this.expandable;
      return row.find((el) => el.id === item.id)[content];
    },
    handleSelection(item, row) {
      if (this.$props.expandable) {
        this.expanded = item === this.expanded[0] ? [] : [item];
      } else if (this.selectable) {
        row.select(true);
        this.$emit('selectedUser', item.id);
      }
    },
    handleExport() {
      console.log('table data', this.$refs.dataTableRef.selectableItems);
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
@use "@/assets/styles/variables.scss" as v;

tr.v-data-table__selected {
  background: v.$accent-green !important;
}
.table-container {
  .v-input__icon--clear button {
    visibility: visible;
  }
  .v-data-table__selected {
    color: v.$main-white;
    font-weight: 600;
  }
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
