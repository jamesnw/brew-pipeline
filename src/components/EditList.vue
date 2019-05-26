<template>
  <div>
    <v-text-field v-model="search" label="search"/>
    <v-checkbox label="Ontap only" v-model="filterOnTap"></v-checkbox>
    <router-link to="/edit/new">+</router-link>
    <v-list two-line>
      <template v-for="(item, index) in beerList">
        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
        <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
        <v-list-tile
          v-else
          :key="index"
          avatar
          @click="selected(item.id)"
          :class="{'selected': isSelected(item.id)}"
        >
          <v-list-tile-avatar>
            <v-icon class="active">{{icon(item.keg_data.tap)}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="item.keg_data.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.keg_data.style"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="red lighten-1"></v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  props: ['beers'],
  data: function() {
    return {
      filterOnTap: false,
      search: ''
    };
  },
  computed: {
    beerList: function() {
      var list = this.beers;
      var search = this.search.toLowerCase();
      if (search.length) {
        list = list.filter(item => {
          let haystack = item.keg_data.name + item.keg_data.style;
          haystack = haystack.toLowerCase();
          return haystack.indexOf(search) >= 0;
        });
      }
      list = list.sort((a, b) => {
        // First sort by on tap
        var aT = parseInt(a.keg_data.tap) || 50;
        var bT = parseInt(b.keg_data.tap) || 50;
        if (aT !== 50 || bT !== 50) {
          return aT <= bT ? -1 : 1;
        }
        // Then sort by updated
        else {
          var aU = new Date(a.updated) || new Date(0);
          var bU = new Date(b.updated) || new Date(0);
          return aU <= bU ? -1 : 1;
        }
      });
      if (this.filterOnTap) return list.filter(b => b.keg_data.tap);
      return list;
    }
  },
  methods: {
    selected: function(data) {
      var path = '/edit/' + data;
      this.$router.push({ path });
    },
    isSelected: function(data) {
      return data === this.$route.params.beer;
    },
    icon: function(tap) {
      if (!tap) return;
      var icons = [
        '',
        'looks_one',
        'looks_two',
        'looks_3',
        'looks_4',
        'looks_5',
        'looks_6'
      ];
      return icons[tap];
    }
  }
};</script>

<style>
</style>
