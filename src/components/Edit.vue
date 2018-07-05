<template>
  <div>
    <v-toolbar fixed app dark color='primary'>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container><v-layout row>
      <v-flex xs4>
        <edit-list :beers='beers' v-on:selected="select"/>
      </v-flex>
      <v-flex xs8>
        <router-view @loadBeers="loadBeers"></router-view>
      </v-flex>
      </v-layout></v-container>
    </v-content>
  </div>
</template>

<script>
import axios from 'axios';
import EditList from './EditList';
import EditView from './EditView';
export default {
  data: () => {
    return {
      beers: [],
      selected: undefined,
      title: 'Edit',
      url: 'http://up.jamesnweber.com/_kegs/api/keg.php'
    };
  },
  components: { EditList, EditView },
  created: function() {
    this.loadBeers();
  },
  computed: {
    selectedBeer: function() {
      if (this.selected >= 0) return this.beers[this.selected];
    }
  },
  methods: {
    select: function(beer) {
      this.selected = beer;
    },
    loadBeers: function() {
      var vm = this;
      axios.get(vm.url).then(function(res) {
        vm.beers = res.data;
      });
    }
  }
};
</script>

<style scoped>
</style>