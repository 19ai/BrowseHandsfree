<template lang="pug">
  .text-center(v-if='isWebcamOn')
    p(ref='feedWrap')
      canvas(ref='feed')
    p
      button.btn.btn-primary(@click='stopFeed') Stop Webcam
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from 'lodash'

export default {
  computed: mapState([
    'isWebcamOn',
    'lastFrame',
    'refs'
  ]),

  watch: {
    lastFrame () { this.$refs.feed.getContext('2d').drawImage(this.refs.webcam, 0, 0, this.$refs.feed.width, this.$refs.feed.height) }
  },

  mounted () {
    this.resizeFeed()
    window.addEventListener('resize', () => this.isWebcamOn && this.resizeFeed())
  },

  methods: {
    stopFeed () {
      this.$store.commit('set', ['isWebcamOn', false])
      this.refs.webcam.srcObject.getTracks().forEach(track => track.stop())
    },

    /**
     * Resizes the feed to fit within view
     */
    resizeFeed: debounce(function () {
      console.log(this.refs.webcam.videoWidth)
      if (!this.refs.webcam.videoWidth) {
        return this.resizeFeed()
      }
      const $webcam = this.refs.webcam
      const $feed = this.$refs.feed
      const $feedWrap = this.$refs.feedWrap
      const width = Math.min($webcam.videoWidth, $feedWrap.clientWidth)
      const aspectRatio = $webcam.videoWidth / $webcam.videoHeight

      $feed.width = width
      $feed.height = width / aspectRatio
    }, 50, {leading: true})
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
