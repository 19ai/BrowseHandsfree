<template lang="pug">
  .text-center(v-if='isWebcamOn')
    p
      canvas(ref='feed')
    p
      button.btn.btn-primary(@click='stopFeed') Stop Webcam
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'isWebcamOn',
    'lastFrame',
    'refs'
  ]),

  watch: {
    lastFrame () { this.$refs.feed.getContext('2d').drawImage(this.refs.webcam, 0, 0, this.refs.webcam.videoWidth, this.refs.webcam.videoHeight) }
  },

  mounted () { this.setFeedDimensions() },

  methods: {
    stopFeed () {
      this.$store.commit('set', ['isWebcamOn', false])
      this.refs.webcam.srcObject.getTracks().forEach(track => track.stop())
    },

    /**
     * Sets the feed dimensions to whatever the webcam
     */
    setFeedDimensions () {
      if (this.refs.webcam.videoWidth) {
        this.$refs.feed.width = this.refs.webcam.videoWidth
        this.$refs.feed.height = this.refs.webcam.videoHeight
      } else {
        setTimeout(() => this.setFeedDimensions(), 50)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  canvas
    -moz-transform: scale(-1, 1)
    -webkit-transform: scale(-1, 1)
    -o-transform: scale(-1, 1)
    transform: scale(-1, 1)
    filter: FlipH
</style>
