<template>
  <v-row class="row-container">
    <v-col cols="11" sm="3">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
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
        <v-date-picker
          v-model="startDate"
          type="month"
          no-title
          scrollable
        >
          
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(startDate)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col
      cols="11"
      sm="3"
    >
      <v-dialog
        ref="dialog"
        v-model="modal"
        persistent
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
        <v-date-picker
          v-model="endDate"
          type="month"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(endDate)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
    startDate: new Date().toISOString().substr(0, 4) + "-01",
    endDate: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false,
    }
  },
  methods: {
    verifyDateRange() {
      if (this.endDate.replace(/-/g, " ") > this.startDate.replace(/-/g, " ")) {
        this.$emit('dateRange', { startDate: this.startDate, endDate: this.endDate })
      } else {
        this.$emit('dateRange', false)
        this.startDate = this.endDate;
      }
    return;
    }
  },
  watch: {
    startDate() {
      this.verifyDateRange();
    },
    endDate() {
      this.verifyDateRange();
    }
  }
}
</script>

<style lang="scss" scoped>
    .row-container {
      display: flex;
      justify-content: space-evenly;
      height: 10vh;
      margin: 1rem;
    }
   
</style>