<template lang="pug">
  iframe(ref='container' src='/static/sandbox/demos/vrdisplay.html')
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['lastFace', 'cursor']),

  mounted () {
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  },

  watch: {
    lastFace (face) { this.maybeUpdateCamera(face) }
  },

  methods: {
    onWindowResize () { this.$refs.container.height = window.innerHeight },

    /**
     * Attempts to update the camera position within the iframe demo
     *
     * @param {OBJ} face The face object
     */
    maybeUpdateCamera (face) {
      this.$refs.container.contentWindow.postMessage({
        from: 'BrowseHandsfree',
        cursor: this.cursor,
        offset: {
          left: this.$refs.container.offsetLeft,
          top: this.$refs.container.offsetTop - window.scrollY
        },
        face
      }, '*')
    }
  }
}
</script>

<style scoped lang="stylus">
  iframe
    width: 100%
    border: none
    height: 100%
    position: relative
</style>
