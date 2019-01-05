<template>
  <v-layout row justify-center>
    <v-dialog v-model='showUploadDialog' max-width='50%'>
      <v-card class='video-card'>
        <v-card-title>Upload a video here...</v-card-title>
        <v-divider></v-divider>

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
            <v-divider></v-divider>
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
    </v-dialog>

  </v-layout>
</template>


<script>

  export default {

    name: 'UploadDialog',

    data() {
      return {
        videosToUpload: [ ]
      }
    },

    computed: {

      showUploadDialog: {
        get() {
          return this.$store.state.showUploadDialog
        },
        set() {
          this.$store.commit('changeUploadDialog')
        }
      }

    },

    methods: {

      clickInput() {
        document.getElementById('fileInput').click()
      },

      addVideo(event) {
        this.videosToUpload.push(event.target.files[0])
      },

      removeVideo(index) {
        this.videosToUpload.splice(index, 1)
      },

      uploadVideos() {
        this.$store.dispatch('uploadVideos', this.videosToUpload)
        this.$store.commit('changeUploadDialog')
        this.videosToUpload = [ ]
      }

    }


  }



</script>





