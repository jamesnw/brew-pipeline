<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <v-btn slot="activator" flat dark>Login</v-btn>

    <v-card>
        <v-container
        fluid
        grid-list-lg
      >
         <v-text-field
            label="password"
            v-model="password"
            type="password"
          ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="updatePassword">Save</v-btn>
      </v-card-actions>
        </v-container>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data () {
    return { password: '', menu: false }
  },
  methods: {
    updatePassword (val) {
      this.menu = false
      this.$emit('updatePassword', this.password)
    }
  }
}
</script>

<style>
</style>
