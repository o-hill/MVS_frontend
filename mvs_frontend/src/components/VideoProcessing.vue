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
            <template v-for='(video, index) in availableVideoList'>
              <v-list-tile :key='index'
                @click='selectVideo(index)'>
                <v-list-tile-action>
                  <a target='_blank' :href='downloadVideoFromServer(video.filename)' download>
                    <v-btn icon small><v-icon>cloud_download</v-icon></v-btn>
                  </a>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ video.filename }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon small  @click='deleteVideoFromServer(video.filename)'><v-icon>delete</v-icon></v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider></v-divider>
            </template>
          </v-list>

        </v-card>
      </v-flex>


      <v-flex xs4>
        <v-card v-if='showProcessing' class='video-card'>
          <v-card-title id='top' class='white--text subheading'>{{ this.videoProcessingTitle }}</v-card-title>
          <v-expansion-panel>
            <v-expansion-panel-content v-for='(process, index) in processingOptions' :key='index' class='pt-0'>
              <div slot='header' style='float:left;'>
                <v-checkbox style='float:left;' v-model='process.use'></v-checkbox>
                <div id='exp-label'>{{ process.name }}</div>
              </div>
              <v-card>
                <template v-for='(option, i) in process.options'>
                  <v-card :key='i'>
                    <v-layout row wrap>
                      <v-flex xs4>
                        <v-card-title class='subheading'>{{ option.name }}</v-card-title>
                      </v-flex>
                      <v-flex xs6>

                        <template v-if='option.fields[0] === "DOUBLE"'>
                          <v-card-action>
                            <v-slider 
                              v-model='doubleModels[index][i]'
                              step='0.1'
                              thumb-label
                            ></v-slider>
                          </v-card-action>
                        </template>

                        <template v-if='option.fields[0] === "LIST"'>
                          <v-card-action>
                            <v-radio-group v-model='cellTypeRadio[index][i]'>
                              <v-radio
                                v-for='(listItem, ii) in option.fields[1]'
                                :key='ii'
                                :label='listItem'
                                :value='ii'
                              ></v-radio>
                            </v-radio-group>
                          </v-card-action>
                        </template>

                        <template v-if='option.fields[0] === "BOOLEAN"'>
                          <v-card-action>
                            <v-checkbox v-model='boolModels[index][i]'></v-checkbox>
                          </v-card-action>
                        </template>

                      </v-flex>
                    </v-layout>
                  </v-card>
                  <v-divider></v-divider>
                </template>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
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
        processingModels: [ ],
        processingTiles: [ ],
        cellTypeRadio: { },
        doubleModels: { },
        boolModels: { }
      }
    },

    computed: {

      availableVideoList() {
        return this.$store.state.videoList
      },

      videoProcessingTitle() {
        return 'Video processing options for ' + this.$store.state.videoList[this.activeVideo].filename
      },

      processingOptions() {
        this.populateOptionsStructures()
        return this.$store.state.videoList[this.activeVideo]['processing_options']
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
        //this.processingOptionsOne()
      },

      populateOptionsStructures() {
        let process = this.$store.state.videoList[this.activeVideo]['processing_options']
        console.log('Process ', process)
        this.cellTypeRadio = { }

        for (var i = 0; i < process.length; ++i) {
          for (var j = 0; j < process[i].options.length; ++j) {

            // We need a number to model the radio group for each list.
            if (process[i].options[j].fields[0] === 'LIST') {
              if (!(i in this.cellTypeRadio)) { this.cellTypeRadio[i] = { } }
              this.cellTypeRadio[i][j] = 1
            }

            if (process[i].options[j].fields[0] === 'DOUBLE') {
              if (!(i in this.doubleModels)) { this.doubleModels[i] = { } }
              this.doubleModels[i][j] = 0.0
            }

            if (process[i].options[j].fields[0] === 'BOOLEAN') {
              if (!(i in this.boolModels)) { this.boolModels[i] = { } }
              this.boolModels[i][j] = false
            }

          }
        }

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

  #exp-label {
    margin-top: 21px;
    margin-left: 25px;
  }

  .v-expansion-panel__header {
    padding-top: 0;
    padding-bottom: 0;
  }


</style>
