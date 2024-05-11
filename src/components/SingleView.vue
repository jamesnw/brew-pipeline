<template>
  <article :style="`--hue: ${tap * 90 - 30}`">
    <h1>#{{ tapInfo.tap }}: {{ tapInfo.name }}</h1>
    <p>{{ tapInfo.description }}</p>
    <p v-if="tapInfo.abv"><span class="label">ABV: </span>{{ tapInfo.abv }}%</p>
    <p><span class="label">Style: </span>{{ tapInfo.style }}</p>
    <a target="_blank" :href="tapInfo.untappd" v-if="tapInfo.untappd">Check in</a>
  </article>
</template>


<script>
import api from '../api/dynamic';
export default {
  data() {
    return {}
  },
  computed: {
    tap() {
      const tapNumber = this.$route.params.tap;
      return tapNumber;
    },
    tapInfo() {
      return api.ontap[this.tap - 1]
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300..900&family=Lalezar&family=Sriracha&display=swap');

article {
  --initial-color: oklch(.2 40% var(--hue));
  background-color: var(--initial-color);
  height: 100vh;
  color: oklch(from var(--initial-color) 0.8 c h);
  padding: 1em;
  font-size: 2em;
  container-type: inline-size;
  font-family: "Darker Grotesque", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-weight: 400;
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: scroll;
}

h1 {
  font-size: clamp(3rem, 6cqi, 8rem);
  line-height: 0.9em;
  text-align: center;
  padding: 1em 0 .5em 0;
  /* background-color: oklch(from var(--initial-color) 0.8 calc(c * 1.1) h / .3); */
  border-bottom-width: .5em;
  border-bottom-style: double;
  margin-left: -1em;
  margin-right: -1em;
}

a {
  color: oklch(from var(--initial-color) .8 c h);
  background: oklch(from var(--initial-color) .2 c h);
  text-decoration: none;
  border: .25em double oklch(from var(--initial-color) .8 c h);
  text-align: center;
  font-weight: bold;

  &:hover {
    --hue-change: 60;
    color: oklch(from var(--initial-color) .9 c calc(h + var(--hue-change)));
    border-color: oklch(from var(--initial-color) .9 c calc(h + var(--hue-change)));
    background: oklch(from var(--initial-color) .2 c calc(h + var(--hue-change)));

  }
}
</style>