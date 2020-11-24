<template>
  <v-row class="row-container">
    <v-col cols="11" sm="3">
      <v-menu
        transition="scale-transition"
        offset-y
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="startDate"
            label="Date Range Start"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          >
          </v-text-field>
        </template>
        <v-date-picker v-model="startDate" type="month" scrollable>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="11" sm="3">
      <v-menu
        transition="scale-transition"
        offset-y
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="endDate"
            label="Date Range End"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="endDate" type="month" scrollable>
        </v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      startDate: new Date().toISOString().substr(0, 4) + '-01',
      endDate: new Date().toISOString().substr(0, 7),
      validDate: true,
    };
  },
  methods: {
    verifyDateRange() {
      const invalidDate =
        this.endDate.replace(/-/g, ' ') < this.startDate.replace(/-/g, ' ');

      this.validDate = invalidDate;
      this.$emit('dateRange', {
        invalidDate,
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
  },
  watch: {
    startDate() {
      this.verifyDateRange();
    },
    endDate() {
      this.verifyDateRange();
    },
  },
};
</script>

<style lang="scss">
@use "../../assets/styles/variables.scss" as v;

.row-container {
  background-color: v.$main-white;
  display: flex;
  justify-content: space-evenly;
  height: 10vh;
  margin: 1rem;
}
</style>
