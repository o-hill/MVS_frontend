<template>
  <v-app>
    <v-toolbar
      color='blue-grey darken-2'
      app>
      <v-toolbar-title class="headline text-uppercase">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <span class='white--text'>MVS</span>
        <!-- <span class="font-weight-light">urveillance</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <router-link :to='{name: "video_processing"}'>
        <v-btn
          flat
          color='white'
        >
          <span class="mr-2">Video Processing</span>
        </v-btn>
      </router-link>
    </v-toolbar>

    <router-view></router-view>
  </v-app>
</template>

<script>

  import HelloWorld from './components/HelloWorld'
  import Homepage from './components/Homepage'

  export default {
    name: 'App',
    components: {
      Homepage
    },
    data () {
      return {
        //
      }
    }
  }

</script>

<style>

  a {
    text-decoration: none;
  }



</style>
