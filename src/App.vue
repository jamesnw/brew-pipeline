<template>
<div>
  <v-toolbar fixed app dark color='primary'>
    <v-toolbar-title v-text="title"></v-toolbar-title>
  </v-toolbar>
  <v-content>
      <v-container fluid grid-list-xs>
        <h1 class="display-3 grey--text text--darken-1 text-xs-center">On tap</h1>
        <v-layout row wrap>
          <batch-view
            v-for="batch in ontap"
            :key="batch.name"
            :batch="batch"
          />
        </v-layout>
        <h1 class="display-3 grey--text text--darken-1 text-xs-center">On deck</h1>
        <v-layout row wrap >
          <batch-view
            v-for="(batch, i) in upcoming"
            :key="batch.name"
            :index="i"
            :batch="batch"
          />
        </v-layout>
        <h2 class="display-1 grey--text text--darken-1 mt-2 pt-3 text-xs-center">Recently kicked</h2>
        <v-layout class="ml-1"  wrap>
            <kicked-view v-for="(batch,i) in sortedKicked" :key="i" :batch="batch" />
        </v-layout>
      </v-container>
       <v-footer fixed app>
      <span>Updated: {{updated}}</span>
      <v-spacer></v-spacer>
      <span>&copy; {{copyright}}</span>
    </v-footer>
  </v-content>>
</div>
</template>

<script>
import BatchView from './components/BatchView'
import KickedView from './components/KickedView'
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
      url: 'http://up.jamesnweber.com/_kegs/api/model.php'
    }
  },
  created: function () {
    var vm = this
    axios.get(vm.url).then(function (res) {
      var beers = res.data.beers
      vm.ontap = beers
        .filter(function (o) {
          return o.status === 'ontap'
        })
        .sort(function (o, p) {
          return o.tap > p.tap ? 1 : -1
        })
      vm.upcoming = beers.filter(function (o) {
        var upcoming = ['fermenting', 'planned', 'kegged']
        return upcoming.includes(o.status)
      })
      vm.kicked = beers.filter(function (o) {
        return ['kicked'].includes(o.status)
      })

      var y = new Date(res.data.updated)
      vm.updated = y.toLocaleString()
    })
  },
  computed: {
    sortedKicked () {
      return this.kicked.concat().sort((a, b) => {
        let aD = new Date(a.empty)
        let bD = new Date(b.empty)
        return aD > bD ? -1 : 1
      })
    }
  },
  components: {
    BatchView,
    KickedView
  }
}
</script>
