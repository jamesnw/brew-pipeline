<template>
  <div>
    <v-chip @click="openUntappd">
      <v-avatar v-if="batch.abv" class="grey darken-5 white--text">{{batch.abv}}</v-avatar>
      <strong>{{batch.name}}</strong>&nbsp;
      <span>{{batch.style}}</span>
    </v-chip>
  </div>
</template>

<script>
export default {
  props: ['batch'],
  computed: {
    untappdAppLink: data => {
      if (!data.batch.untappd) return ''
      var parts = data.batch.untappd.split('/')
      var number = parts.pop()
      return 'untappd://beer/' + number
    }
  },
  methods: {
    openUntappd () {
      let link = this.$vuetify.breakpoint.smAndDown
        ? this.untappdAppLink
        : this.batch.untappd
      window.open(link, '_blank')
    }
  }
}
</script>

<style>
</style>
