<template>
  <v-app>
    <v-toolbar
      color='#385a44'
      app>
      <v-toolbar-title class="headline text-uppercase">
        <v-toolbar-side-icon @click.stop='drawer = !drawer'></v-toolbar-side-icon>
        <router-link to='/'>
          <span class='white--text'>MVS</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <v-btn slot='activator' v-if='this.$route.path === "/video"' @click='showUploadDialog()' icon small>
          <v-icon class='white--text'>cloud_upload</v-icon>
        </v-btn>
        <span>Upload Videos</span>
      </v-tooltip>

    </v-toolbar>

    <v-navigation-drawer v-model='drawer'
      :mini-variant='mini'
      clipped
      absolute
      dark
      temporary
    >
    <v-list class='pa-1'>
        <v-list-tile v-if='mini' @click.stop='mini = !mini'>
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag='div'>
          <v-list-tile-avatar>
            <img src='./assets/profile.jpg'>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ loggedInUser.name }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop='mini = !mini'>
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class='pa-1'>
        <template v-for='tile in menuOptions'>
          <v-list-tile @click='navigate(tile.location)'>
            <v-list-tile-action>
              <v-icon>{{ tile.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>

    <upload-dialog></upload-dialog>
    <v-footer app inset color='#385a44' class='elevation-5'>
      <v-layout row wrap>
        <v-flex xs6 class='ml-2'>
          <span class="white--text">&copy; 2019 Michigan Aerospace Corporation</span>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>

  import Homepage from './components/Homepage'
  import UploadDialog from './components/UploadDialog'

  export default {

    name: 'App',

    components: {
      Homepage,
      UploadDialog
    },

    data () {
      return {
        drawer: false,
        mini: false,
        menuOptions: [
          { title: 'Video Processing', icon: 'videocam', location: 'video_processing' },
          { title: 'Contact', icon: 'mail_outline', location: 'contact' }
        ],
        loggedInUser: {
          name: 'Oliver Hill',
          avatar: '@/assets/profile.jpg'
        }
      }
    },

    methods: {

      navigate(location) {
        this.$router.push({ name: location })
      },

      showUploadDialog() {
        this.$store.commit('changeUploadDialog')
      }

    }

  }

</script>

<style>

  a {
    text-decoration: none;
  }



</style>
