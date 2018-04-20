<template lang="pug">
  iframe(ref='container' src='/static/sandbox/demos/vrdisplay.html')
</template>

<script>
import { mapState } from 'vuex'
import Emmits from '@/mixins/Emmits'

export default {
  mixins: [Emmits],

  computed: mapState(['lastFace', 'cursor']),

  mounted () {
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  },

  watch: {
    lastFace (face) { this.maybeUpdateCamera(face) }
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
