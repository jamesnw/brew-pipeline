<template>
   <v-container v-if="name">
    <h1>{{name}}</h1>
    <keg-form 
      :kegData="kegData"
      v-on:save="save"
      v-on:delete="deleteKeg"
    />
     <div>
        <v-alert :value="showSuccess" type="success" transition="slide-y-transition">
          Saved successfully
        </v-alert>
        <v-alert :value="showDeleteSuccess" type="warning" transition="slide-y-transition">
          Deleted successfully
        </v-alert>
      </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import KegForm from './KegForm';

export default {
  components: { KegForm },
  props: ['headers'],
  data: function() {
    return {
      id: undefined,
      kegData: undefined,
      saving: false,
      showSuccess: false,
      showDeleteSuccess: false,
      name: undefined,
      valid: true,
      beer: {}
    };
  },
  watch: {
    beer: function(keg) {
      if (keg && keg.keg_data) this.setKeg(keg);
    },
    $route: function(to, from) {
      this.load();
    }
  },
  computed: {
    url: function() {
      return 'http://up.jamesnweber.com/_kegs/api/keg.php?id=' + this.id;
    },
    showForm: function() {
      return this.id === 'new' || this.beer;
    }
  },
  created: function() {
    this.load();
  },
  methods: {
    load: function() {
      var vm = this;
      vm.id = this.$route.params.beer;
      axios.get(vm.url, vm.headers).then(function(res) {
        vm.beer = res.data;
        vm.setKeg(vm.beer);
      });
    },
    save: function(data) {
      this.saving = true;
      var vm = this;
      var data = {
        id: this.id,
        keg_data: data
      };
      axios
        .put(this.url, data, vm.headers)
        .then(function(data) {
          vm.saving = false;
          vm.showSuccess = true;
          setTimeout(function() {
            vm.showSuccess = false;
          }, 3000);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteKeg: function() {
      var vm = this;
      axios.delete(this.url, vm.headers).then(function(res) {
        vm.showDeleteSuccess = true;
        vm.$emit('loadBeers');
        setTimeout(function() {
          vm.showDeleteSuccess = false;
          vm.$router.push('/edit');
        }, 3000);
      });
    },
    setKeg: function(keg) {
      var beer = keg.keg_data;
      this.kegData = beer;
      this.name = beer.name;
    }
  }
};
</script>

<style>
</style>