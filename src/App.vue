<template>
  <div>
    <v-toolbar fixed app dark color="purple darken-3">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-xs>
        <h1 class="display-3 grey--text text--darken-1 text-xs-center">
          On tap
        </h1>
        <v-layout row wrap>
          <batch-view v-for="batch in ontap" :key="batch.name" :batch="batch" />
        </v-layout>
        <h1 class="display-3 grey--text text--darken-1 text-xs-center">
          On deck
        </h1>
        <v-layout row wrap>
          <batch-view
            v-for="(batch, i) in upcoming"
            :key="batch.name"
            :index="i"
            :batch="batch"
          />
        </v-layout>
        <h2
          class="display-1 grey--text text--darken-1 mt-2 pt-3 text-xs-center"
        >
          Recently kicked
        </h2>
        <v-layout class="ml-1" wrap>
          <kicked-view
            v-for="(batch, i) in sortedKicked"
            :key="i"
            :batch="batch"
          />
        </v-layout>
        <abv-graph :all-beers="allBeers" />
      </v-container>
      <v-footer fixed app>
        <span>Updated: {{ updated }}</span>
        <v-spacer></v-spacer>
        <span>&copy; {{ copyright }}</span>
      </v-footer> </v-content
    >
  </div>
</template>

<script>
import BatchView from './components/BatchView.vue';
import KickedView from './components/KickedView.vue';
import AbvGraph from './components/AbvGraph.vue';
import kegData from './api/dynamic';
export default {
  data() {
    return {
      title: 'What to Brewery Pipeline',
      ontap: [],
      allBeers: [],
      upcoming: [],
      kicked: [],
      copyright: new Date().getFullYear(),
      data: kegData,
    };
  },
  created: function () {
    var vm = this;
    var { beers, ontap, upcoming, kicked } = kegData;
    vm.allBeers = beers;
    vm.ontap = ontap;
    vm.upcoming = upcoming;
    vm.kicked = kicked;
  },
  computed: {
    updated() {
      return new Date(BUILD_TIMESTAMP).toLocaleString();
    },
    sortedKicked() {
      return this.kicked.concat().sort((a, b) => {
        let aD = new Date(a.empty);
        let bD = new Date(b.empty);
        return aD > bD ? -1 : 1;
      });
    },
  },
  components: {
    BatchView,
    KickedView,
    AbvGraph,
  },
};
</script>
