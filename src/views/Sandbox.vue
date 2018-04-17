<template lang="pug">
  iframe(ref='container' src='/static/sandbox/demos/vrdisplay.html')
</template>

<script>
export default {
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
    width: 100%
    border: none
    height: 100%
</style>
