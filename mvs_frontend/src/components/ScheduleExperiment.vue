<template>
  <v-container fluid id='video-container'>
    <v-layout row wrap>
      <v-flex xs12 sm6 d-flex>
        <v-select
          :items="listOfDishes"
          v-model="dishNumber"
          label="Dish Number">
        </v-select>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md4>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu"
          :nudge-right="40"
          :return-value.sync="dates"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          >
          <v-text-field slot="activator"
                        v-model="dates"
                        label="Dates Wanted"
                        prepend-icon="event"
                        readonly
                        ></v-text-field>
          <v-date-picker v-model="dates"
                         :allowed-dates="allowedDates"
                         multiple>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>
        <v-btn @click.native='addExperiment()'>Add Experiment</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    dishNumber: "1",
    dates: []
  }),

  methods: {
    addExperiment () {
      var newExperiment = {dates: this.dates, dishNumber: this.dishNumber}
      this.$store.dispatch('scheduleExperiment', newExperiment)
      console.log(newExperiment)
    },

    allowedDates (date) {
        return this.unavailableDates[this.dishNumber].indexOf(date) < 0
        // return !(date in this.unavailableDates[this.dishNumber])
  }
  },

  mounted() {
    this.$store.dispatch('getDishList')
    this.$store.dispatch('getUnavailableDates')
  },

  computed: {
    listOfDishes() {
      return this.$store.state.dishList
    },

    unavailableDates() {
      return this.$store.state.unavailableDates
    },

  }
}
</script>

<style>

#video-container {
  margin-top: 64px;
  background-color: white;
}

</style>
