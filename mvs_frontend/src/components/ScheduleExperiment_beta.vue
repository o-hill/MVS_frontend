<template>
  <v-container fluid id='video-container'>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-menu
          ref="startMenu"
          :close-on-content-click="false"
          v-model="startMenu"
          :nudge-right="40"
          :return-value.sync="startDate"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          >
          <v-text-field
            slot="activator"
            v-model="startDate"
            label="Start Date"
            prepend-icon="event"
            readonly
            ></v-text-field>
          <v-date-picker v-model="startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="startMenu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.startMenu.save(startDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>
        <v-menu
          ref="endMenu"
          :close-on-content-click="false"
          v-model="endMenu"
          :nudge-right="40"
          :return-value.sync="endDate"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
          >
          <v-text-field
            slot="activator"
            v-model="endDate"
            label="End Date"
            prepend-icon="event"
            readonly
            ></v-text-field>
          <v-date-picker v-model="endDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="endMenu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.endMenu.save(endDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>
        <v-flex xs12 sm6 d-flex>
          <v-select
            :items="listOfDishes"
            v-model="dishNumber"
            label="Dish Number">
          </v-select>
        </v-flex>
        <v-btn @click.native='addExperiment()'>Add Experiment</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    startDate: "",
    endDate: "",
    startMenu: false,
    modal: false,
    menu2: false,
    startMenu2: false,
    endMenu: false,
    modalEnd: false,
    endMenu2: false,
    dishNumber: [ ],
    dates: [],
  }),
  methods: {
    addExperiment () {
      var newExperiment = {startDate: this.startDate, endDate: this.endDate, dishNumber: this.dishNumber}
      this.$store.dispatch('scheduleExperiment', newExperiment)
      console.log(newExperiment)
    }
//    allowedDates: val =>
  },
  mounted() {
    //put call to server to get available times - create resource in api.js.
    this.$store.dispatch('getDishList')
  },
  computed: {
    listOfDishes() {
      return this.$store.state.dishList
    }
  }
}
</script>

<style>

#video-container {
  margin-top: 64px;
  background-color: white;
}

</style>
