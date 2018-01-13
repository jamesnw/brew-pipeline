<template>
  <v-app>
    <v-toolbar fixed app dark color="primary">
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-xs>
        <h1 class="display-3 grey--text text--darken-1">On tap</h1>
        <v-layout row wrap>
          <batch-view
            v-for="batch in ontap"
            :key="batch.name"
            :batch="batch"
          />
        </v-layout>
        <h1 class="display-3 grey--text text--darken-1">On deck</h1>
        <v-layout row wrap >
          <batch-view
            v-for="batch, i in upcoming"
            :key="batch.name"
            :index="i"
            :batch="batch"
          />
        </v-layout>
        <h2 class="display-1 grey--text text--darken-1 mt-2 pt-3">Recently kicked</h2>
        <v-layout class="ml-1">
          <ul>
            <li v-for="batch,i in kicked" :key="i">
              <strong>{{batch.name}}</strong> <em>{{batch.style}}</em>
            </li>
          </ul>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>Updated: {{updated}}</span>
      <v-spacer></v-spacer>
      <span>&copy; {{copyright}}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import BatchView from './components/BatchView'
  import axios from 'axios'

  export default {
    data () {
      return {
        title: 'What to Brewery Pipeline',
        ontap: [],
        upcoming: [],
        kicked: [],
        updated: '',
        copyright: new Date().getFullYear(),
        url: '/static/pipeline.json'
      }
    },
    created: function () {
      var vm = this
      axios.get(vm.url).then(function (res) {
        var beers = res.data.beers
        vm.ontap = beers.filter(function (o) {
          return o.status === 'ontap'
        }).sort(function (o, p) {
          return o.tap > p.tap ? 1 : -1
        })
        vm.upcoming = beers.filter(function (o) {
          var upcoming = ['fermenting', 'planned']
          return upcoming.includes(o.status)
        })
        vm.kicked = beers.filter(function (o) {
          return ['kicked'].includes(o.status)
        })

        var y = new Date(res.data.updated)
        vm.updated = y.toLocaleString()
      })
    },
    components: {
      BatchView
    }
  }
</script>
