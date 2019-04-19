import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './components/Homepage.vue'
import VideoProcessing from './components/VideoProcessing.vue'
import Contact from './components/Contact.vue'
import ScheduleExperiment from './components/ScheduleExperiment.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/video',
      name: 'video_processing',
      component: VideoProcessing
    },
    {
      path: '/experiments',
      name: 'schedule_experiment',
      component: ScheduleExperiment
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    }
  ]
})
