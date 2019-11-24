<template>
  <v-card
    v-if="allBeers.length"
    class="mx-auto text-center"
    color="purple darken-3"
    dark
    max-width="400"
  >
    <v-card-title>
      <div class="headline">ABV distribution</div>
    </v-card-title>
    <v-card-text>
      <v-sheet color="purple darken-3">
        <v-sparkline
          :value="abvs"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="12"
          auto-draw
        >
          <template v-slot:label="item">
            {{ item.index }}%
          </template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { map, groupBy, without } from 'lodash'
export default {
  props: {
    allBeers: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    abvs () {
      let abvs = map(this.allBeers, beer => {
        return parseFloat(beer.abv)
      })
      abvs = without(abvs, NaN, undefined)
      let counts = groupBy(abvs, Math.floor)
      let max = Math.max(...Object.keys(counts).map(c => parseInt(c)))
      let results = []
      for (var i = 0; i <= max; i++) {
        if (counts[i]) results.push(counts[i].length)
        else results.push(0)
      }
      return results
    }
  }
}
</script>
