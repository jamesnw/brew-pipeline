<template>
  <v-flex md4 sm6 xs12 class="pa-1 mt-1">
    <v-card :color="bgColor" class="white--text">
      <div class="tap-name">{{batch.tap}}</div>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{name}}</div>
          <span class="style-name">{{style}}</span>
        </div>
      </v-card-title>
      <v-card-text>
        <div>{{ batch.description}}</div>
        <div v-if="abv">
          <strong>ABV:</strong>
          {{abv}}%
        </div>
        <div v-if="batchProgress">
          <strong>Remaining:</strong>
          {{remaining}}
          <v-progress-linear
            v-bind:size="100"
            v-bind:width="25"
            v-bind:value="batchProgress"
            color="white"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          dark
          class="hidden-sm-and-down"
          :color="buttonColor"
          target="_blank"
          :href="batch.untappd"
          v-show="batch.untappd"
        >Check in</v-btn>
        <v-btn
          dark
          class="hidden-md-and-up"
          :color="buttonColor"
          target="_blank"
          :href="untappdAppLink"
          v-show="untappdAppLink"
        >Check in</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
export default {
  name: 'on-tap-batch',
  props: ['batch', 'index'],
  data: function () {
    return {
      onTapColors: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue'],
      upcomingColors: ['light-green', 'lime', 'amber', 'orange', 'deep-orange'],
      emptyColor: 'blue-grey lighten-3',
      batchProgress: 0
    }
  },
  computed: {
    style: data => {
      return data.batch.style
    },
    name: data => {
      let name = data.batch.name
      if (!name && data.status === 'empty') return 'Empty'
      return name
    },
    status: data => {
      return data.batch.status
    },
    abv: data => {
      return data.batch.abv
    },
    untappdAppLink: data => {
      if (!data.batch.untappd) return ''
      var parts = data.batch.untappd.split('/')
      var number = parts.pop()
      return 'untappd://beer/' + number
    },
    baseColor: function () {
      if (this.status === 'ontap') {
        return this.onTapColors[this.batch.tap - 1]
      } else if (this.status === 'empty') {
        return this.emptyColor
      } else {
        return this.upcomingColors[this.index]
      }
    },
    bgColor: function () {
      return this.status === 'empty' ? this.baseColor + ' lighten-2' : this.baseColor + ' darken-2'
    },
    buttonColor: function () {
      return this.baseColor + ' lighten-2'
    },
    remaining: data => {
      if (data.batchProgress >= 100) return 'Kicked any day now...'
      else if (isNaN(data.batchProgress)) return 'Who knows?'
      else return 100 - data.batchProgress + '%'
    }
  },
  mounted: function () {
    var start = new Date(this.batch.kegged)
    var end = new Date(this.batch.empty)
    var days = end - start
    var today = new Date()
    var daysDrinking = today - start
    var vm = this
    setTimeout(function () {
      vm.batchProgress = Math.round(daysDrinking / days * 100)
    }, 150 * this.batch.tap)
  }
}; </script>
<style>
.tap-name {
  position: absolute;
  right: 0;
  padding: 0 0.3em;
  opacity: 0.5;
  font-size: 2em;
}
.style-name {
  font-style: italic;
}
</style>
