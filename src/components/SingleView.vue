<template>
  <article :style="`--hue: ${tap * 90 - 30}`">
    <h1>{{ tapInfo.name }}</h1>
    <p>{{ tapInfo.description }}</p>
    <p>ABV: {{ tapInfo.abv }}%</p>
    <p>{{ tapInfo.style }}</p>
    <p id="tap">{{ tapInfo.tap }}</p>
  </article>
</template>


<script>
import api from '../api/dynamic';
export default {
  data(){
    return {}
  },
  computed: {
    tap(){
      const tapNumber = this.$route.params.tap;
      return tapNumber;
    },
    tapInfo(){
      return api.ontap[this.tap - 1]
    }
  }
}
</script>

<style>
article{
  --initial-color: oklch(.3 60% var(--hue));
  background-color: var(--initial-color);
  height: 100vh;
  color: oklch(from var(--initial-color) 0.8 c h);
  padding: 1em;
  font-size: 2em;
}
#tap{
  position: absolute;
  font-size: 100vh;
  top: 0;
  line-height: 1;
  color: oklch(from var(--initial-color) .9 .3 h  / 0.05);
  overflow: hidden;
}
h1{
  font-size: 4em;
  opacity: .8;
}

</style>