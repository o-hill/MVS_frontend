<template>

  <v-container fluid class='pa-0' id='contact-cont'>
    <!-- <v-parallax src='require("../assets/medresearch.jpeg")' style='opacity:1' height='100%'> -->
      <!-- <img id='contact-background' :src='require("../assets/medresearch.jpeg")' width='100%' height='100%'> -->
    <!-- </div> -->

      <v-layout row wrap id='base' class='justify-center'>
        <!-- class='align-center justify-center fill-height'> -->

          <v-flex xs4>
            <v-card class='elevation-5'>
              <div id='contact-text' class='subheading pa-4'>
                CONTACT
              </div>
              <div id='black-bar'></div>
              <div id='info' style='margin-top: 10px;'>
                <v-list> 
                  <v-list-tile>
                    <v-list-tile-content>
                      Alexis Donneys
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      109 Zina Pitcher Place
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      2638 Biomedical Science Research Building
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>
                      Ann Arbor, MI 48109 <br/>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-icon>call</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      215-219-8748
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-icon>email</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      alexisd@med.umich.edu
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>
            </v-card>
          </v-flex>

        </v-layout>

    <!-- </v-parallax> -->
  </v-container>

</template>


<script>

</script>


<style>

  #contact-cont {
    background-color: #384e5a;
  }

  #black-bar {
    height: 2px;
    width: 100%;
    background-color: black;
  }

  #contact-background {
    opacity: 0.5;
  }

  #base {
    margin-top: 15%;
    z-index: 1;
  }

</style>
