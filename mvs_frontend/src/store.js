import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    videoList: [ ]

  },

  mutations: {

    setVideoList(state, videoList) {
      state.videoList = videoList
    }

  },

  actions: {

    uploadVideos(context, videosToUpload) {
      api.postFiles('videos', videosToUpload).then((resp) => {
        context.dispatch('listVideos')
      })
    },

    downloadVideo(context, filename) {
      api.getResource('video', filename).then((resp) => {
        return resp.data
      })
    },

    deleteVideo(context, filename) {
      api.deleteResource('video', filename).then((resp) => {
        context.dispatch('listVideos')
      })
    },

    listVideos(context) {
      api.listResource('videos').then((resp) => {
        context.commit('setVideoList', resp.data)
      })
    }

  }

})
