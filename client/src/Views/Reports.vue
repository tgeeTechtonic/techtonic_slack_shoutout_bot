<template>
  <div class="reports-container">
    <h2 @click="createHeaders(shoutsToDisplay[0])">Reports</h2>
    <v-tabs
      fixed-tabs
      background-color="green lighten-1"
      light
      >
      <v-tab 
        >Monthly Reports</v-tab>
      <v-tab
        >Users</v-tab>
      <v-tab
        >All Shouts</v-tab>
    </v-tabs>
    <div class="reports-container__main">
      <v-date-picker
        v-model="picker"
        type="month"
        color="green darken-1"
        >
      </v-date-picker>
      <Table class="reports-container__table" :data="shoutsToDisplay" @rankView="toggleView" :type="rankView" :dateObj="this.createDateObj()"/>
    </div>
  </div>
</template>

<script>
import { getRankedByMonth } from "../apiCall";
import { rankedShoutersFormatter} from "../shared/formatters";
import Table from "../components/Table";

export default {
  name: "Reports",
  components: { Table },
  data() {
    return {
      shouts: [],
      shoutsToDisplay: [],
      currentView: 'monthly',
      picker: new Date().toISOString().substr(0, 7),
      rankView: true,
    };
  },
  computed: {
    headers() {
      return this.createHeaders(this.shoutsToDisplay);
    },
    formattedShoutouts() {
      return 1;
    },
  },
  async created() {
    const { selectedMonth, selectedYear } = this.createDateObj();
    const formattedShouts = await getRankedByMonth('shouter', selectedMonth, selectedYear);
    this.shoutsToDisplay = rankedShoutersFormatter(formattedShouts);
  },
  methods: {
    changeReport: function (view) {
      this.currentView = view;
    },
    createDateObj: function () {
      return {
        selectedMonth: this.picker.split('-')[1],
        selectedYear: this.picker.split('-')[0]
      }
    },
    toggleView: function () {
      this.rankView = !this.rankView;
    }, 
    getRankedList: async function () {
      const { selectedMonth, selectedYear } = this.createDateObj();
      const formatedShouts = await getRankedByMonth(this.rankView ? 'shouter' : 'shoutee', selectedMonth, selectedYear);
      this.shoutsToDisplay = rankedShoutersFormatter(formatedShouts);
    }
  },
  watch: {
    async picker() {
     await this.getRankedList();
    }, 
   async rankView() {
     await this.getRankedList();
    }
  }

};
</script>

<style lang="scss">
.active {
  color: red;
}
.reports-container {
  &__active {
    color: red;
  }
  &__table {
    
  }
  &__filter-btns {
    color: red;
    margin-top: 1rem;
  }
  &__main {
    display: flex;
    justify-content: space-evenly;
    margin-top: 2rem;
  }
}
</style>