<template>
  <div>
     <v-checkbox
      label="Ontap only"
      v-model="filterOnTap"
    ></v-checkbox>
    <router-link to="/edit/new">+
    </router-link>
   <v-list two-line>
    <template v-for="(item, index) in beerList">
      <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
      <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
        <v-list-tile v-else :key="index" avatar @click="selected(item.id)" :class="{'selected': isSelected(item.id)}">
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
      filterOnTap: false
    };
  },
  computed: {
    beerList: function(){
      var list = this.beers.sort((a,b)=>{
        var a = parseInt(a.keg_data.tap) || 50;
        var b = parseInt(b.keg_data.tap) || 50;
        return a <= b ? -1 : 1;
      })
      if(this.filterOnTap) return list.filter((b)=>b.keg_data.tap)
      return list;
    }
  },
  methods: {
    selected: function(data) {
      var path = '/edit/' + data;
      this.$router.push({path})
    },
    isSelected: function(data){
      return data === this.$route.params.beer;
    },
    icon: function(tap){
      if(!tap) return;
      var icons = ['',
        'looks_one',
        'looks_two',
        'looks_3',
        'looks_4',
      ]
      return icons[tap]
    }
  },
};
</script>

<style>
</style>
