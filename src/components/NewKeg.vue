<template>
  <v-container>
    <h1>New beer</h1>
    <keg-form
      :kegData="{}"
      v-on:save="save"
    />
     <div>
        <v-alert :value="showSuccess" type="success" transition="slide-y-transition">
          Saved successfully
        </v-alert>
      </div>
  </v-container>
</template>

<script>
import KegForm from './KegForm'
import axios from 'axios'
export default {
  components: { KegForm },
  props: ['headers'],
  data: function () {
    return {
      saving: false,
      showSuccess: false,
      url: 'http://up.jamesnweber.com/_kegs/api/keg.php'
    }
  },
  methods: {
    save: function (data) {
      var vm = this
      axios
        .post(this.url, data, vm.headers)
        .then(function (res) {
          vm.showSuccess = true
          vm.$emit('loadBeers')
          if (res.data.id) {
            vm.$router.push('/edit/' + res.data.id)
          }
          setTimeout(function () {
            vm.showSuccess = false
          }, 3000)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>
