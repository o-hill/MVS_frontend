import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    videoList: [ ],
    videoServer: '',
    showUploadDialog: false,
    experiment: [],
    dishList: []

  },

  mutations: {

    setVideoList(state, videoList) {
      state.videoList = videoList
    },

    setVideoServer(state, videoServer) {
      state.videoServer = videoServer
    },

    changeUploadDialog(state) {
      state.showUploadDialog = !state.showUploadDialog
    },

    setSchedule(state, schedule) {
      state.schedule = schedule
    },

    setDishList(state, dishes) {
      state.dishList = dishes
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
    },

    getVideoServer(context) {
      api.listResource('video_server').then((resp) => {
        context.commit('setVideoServer', resp.data)
      })
    },

    scheduleExperiment(context, newExperiment) {
      api.postResource('experiments', newExperiment).then((resp) => {
        context.commit('setSchedule', resp.data)
      })
    },

    getDishList (context) {
      api.listResource('dishes').then((resp) => {
        context.commit('setDishList', resp.data)
      })
    }


  }

})
