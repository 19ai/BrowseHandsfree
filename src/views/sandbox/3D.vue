<template lang="pug">
  iframe(ref='container' src='static/sandbox/demos/vrdisplay.html')
</template>

<script>
import Emmits from '@/mixins/Emmits'

export default {
  mixins: [Emmits],

  mounted () {
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  },

  methods: {
    onWindowResize () { this.$refs.container.height = window.innerHeight }
  }
}
</script>

<style scoped lang="stylus">
  iframe
    height: 100%
</style>
