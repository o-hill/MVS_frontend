<template>
  <v-container fluid id='landing-container'>

    <div id='backround-image'>
      <img id='background' :src='require("../assets/front_page.jpeg")' width='100%' height='100%'>
    </div>

  </v-container>
</template>



<script>

  export default {

    name: 'Homepage',
  
    data() {
      return {
      }
    }



  }



</script>

<style>

  #landing-container {
    margin: 0;
    padding: 0;
  }

  /*#background-image {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }*/

  html, body {
    overflow: hidden;
  }



</style>
