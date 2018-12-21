<template>

  <v-container fluid id='video-container'>
    <v-card class='video-card'>
      <v-card-text>Hello!</v-card-text>
    </v-card>

    <v-layout row wrap>

      <v-flex xs4>
        <v-card class='video-card'>
          <v-card-title>Upload a video here...</v-card-title>

          <v-list>
            <template v-for='(item, index) in videosToUpload'>
              <v-list-tile :key='item.name' class='ma-2'>
                <v-list-tile-action>
                  <v-btn icon small color='deep-orange lighten-1' @click='removeVideo(index)'><v-icon>remove</v-icon></v-btn>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>

          <v-card-actions class='justify-center'>
            <input id="fileInput" type="file" style="display:none" v-on:change="addVideo($event)"/>
            <v-btn icon @click='clickInput()'>
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn icon @click='uploadVideos()' class='ml-5'><v-icon>cloud_upload</v-icon></v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card class='video-card'>
          <v-card-title>Available Videos</v-card-title>

          <v-list>
            <template v-for='(videoFilename, index) in availableVideoList'>
              <v-list-tile :key='videoFilename' class='ma-2'>
                <v-list-tile-action>
                  <v-btn icon small @click='downloadVideo(index)'><v-icon>cloud_download</v-icon></v-btn>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ videoFilename }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon small  @click='deleteVideoFromServer(videoFilename)'><v-icon>delete</v-icon></v-btn>
                </v-list-tile-action>
              </v-list-tile>
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
        videosToUpload: [
          { name: 'some_video.mpg' }
        ]
      }
    },

    computed: {

      availableVideoList() {
        return this.$store.state.videoList
      }

    },

    mounted() {
      this.$store.dispatch('listVideos')
    },

    methods: {

      clickInput() {
        document.getElementById("fileInput").click()
      },

      addVideo(event) {
        this.videosToUpload.push(event.target.files[0])
      },

      removeVideo(index) {
        this.videosToUpload.splice(index, 1)
      },

      uploadVideos() {
        this.$store.dispatch('uploadVideos', this.videosToUpload)
        this.videosToUpload = [ ]
      },

      downloadVideo(filename) {
        let video = this.$store.dispatch('downloadVideo', filename)
        debugger;
      },

      deleteVideoFromServer(filename) {
        this.$store.dispatch('deleteVideo', filename)
      }
    }


  }

</script>


<style>

  #video-container {
    position: relative;
    margin-top: 64px;
    background-color: #CFD8DC;
  }

  .video-card {
    margin: 10px;
  }


</style>
