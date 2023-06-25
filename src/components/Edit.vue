<template>
  <div>
    <v-toolbar fixed app dark color="primary">
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/">Home</v-btn>
        <login-view @updatePassword="updatePassword"/>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout row v-if="password.length && wrongPassword">
          <v-alert value="password" type="error" transition="slide-y-transition">Wrong password</v-alert>
        </v-layout>
        <v-layout row v-else-if="password.length">
          <v-flex xs4>
            <edit-list :beers="beers" v-on:selected="select"/>
          </v-flex>
          <v-flex xs8>
            <router-view @loadBeers="loadBeers" :headers="headers"></router-view>
          </v-flex>
        </v-layout>
        <v-layout v-else>
          <v-alert
            value="password"
            type="warning"
            transition="slide-y-transition"
          >Enter password to start</v-alert>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import axios from 'axios'
import EditList from './EditList.vue'
import LoginView from './LoginView.vue'
export default {
  data: () => {
    return {
      beers: [],
      selected: undefined,
      title: 'Edit',
      password: '',
      wrongPassword: false,
      url: 'http://up.jamesnweber.com/_kegs/api/keg.php'
    }
  },
  components: { EditList, LoginView },
  created: function () {
    this.loadBeers()
  },
  computed: {
    selectedBeer: function () {
      if (this.selected >= 0) return this.beers[this.selected]
      else return {}
    },
    headers () {
      return { headers: { KegAuthorization: this.password } }
    }
  },
  methods: {
    select: function (beer) {
      this.selected = beer
    },
    loadBeers: function () {
      var vm = this
      axios
        .get(vm.url, vm.headers)
        .then(function (res) {
          vm.beers = res.data
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            vm.wrongPassword = true
          }
        })
    },
    updatePassword (val) {
      this.password = val
      this.wrongPassword = false
      this.loadBeers()
    }
  }
}; </script>

<style scoped>
</style>
