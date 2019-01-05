<template>

  <v-container fluid id='video-container'>
    <v-card class='video-card'>
      <v-card-text>Hello!</v-card-text>
    </v-card>

    <v-layout row wrap>

      <v-flex xs4>
        <v-card class='video-card'>

          <v-list class='pa-0'>
            <v-list-tile id='top'>
              <v-list-tile-title class='white--text'>Available Videos</v-list-tile-title>
            </v-list-tile>
            <v-divider></v-divider>
            <template v-for='(videoFilename, index) in availableVideoList'>
              <v-list-tile :key='index'
                @click='selectVideo(index)'>
                <v-list-tile-action>
                  <a target='_blank' :href='downloadVideoFromServer(videoFilename)' download>
                    <v-btn icon small><v-icon>cloud_download</v-icon></v-btn>
                  </a>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ videoFilename }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon small  @click='deleteVideoFromServer(videoFilename)'><v-icon>delete</v-icon></v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
            </template>
          </v-list>

        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card v-if='showProcessing' class='video-card'>
          <v-list class='pa-0'>
            <v-list-tile id='top'>
              <v-list-tile-title class='white--text'>{{ this.videoProcessingTitle }}</v-list-tile-title>
            </v-list-tile>
            <v-divider></v-divider>
            <template v-for='(process, index) in processingOptions'>
              <v-list-tile :key='index'>
                <v-list-tile-action>
                  <v-checkbox v-model='process.use'></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ process.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>

    </v-layout>

  </v-container>

</template>




<script>

  export default {

    name: 'VideoProcessing',

    data() {
      return {
        videosToUpload: [ ],
        activeVideo: 0,
        showProcessing: false,
        processingOptions: [
          { name: 'Crop', use: false },
          { name: 'Cluster', use: false },
          { name: 'Clarify', use: false }
        ]
      }
    },

    computed: {

      availableVideoList() {
        return this.$store.state.videoList
      },

      videoProcessingTitle() {
        return 'Video processing options for ' + this.$store.state.videoList[this.activeVideo]
      }

    },

    mounted() {
      this.$store.dispatch('listVideos')
      this.$store.dispatch('getVideoServer')
    },

    methods: {

      downloadVideo(filename) {
        let video = this.$store.dispatch('downloadVideo', filename)
        debugger;
      },

      deleteVideoFromServer(filename) {
        this.$store.dispatch('deleteVideo', filename)
      },

      downloadVideoFromServer(videoFilename) {
        return this.$store.state.videoServer + '/' + videoFilename
      },

      selectVideo(index) {
        this.activeVideo = index
        this.showProcessing = true
      }

    }

  }

</script>


<style>

  #video-container {
    position: relative;
    margin-top: 64px;
    /*background-color: #CFD8DC;*/
    background-color: #384e5a;
  }

  .video-card {
    margin: 10px;
  }

  #top {
    background-color: #5a4338; /*#818F95;*/ /*#758A94;*/
  }


</style>
