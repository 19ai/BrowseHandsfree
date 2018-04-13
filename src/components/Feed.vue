<template lang="pug">
  .text-center(v-if='isWebcamOn')
    p
      canvas(ref='feed')
    p
      button.btn.btn-primary(@click='stopFeed') Stop Webcam
</template>

<script>
import { mapState } from 'vuex'
import CONFIG from '@/config.json'

export default {
  computed: mapState([
    'isWebcamOn',
    'lastFrame',
    'refs'
  ]),

  watch: {
    lastFrame () { this.$refs.feed.getContext('2d').drawImage(this.refs.webcam, 0, 0, CONFIG.feed.width, CONFIG.feed.height) }
  },

  mounted () {
    this.$refs.feed.width = CONFIG.feed.width
    this.$refs.feed.height = CONFIG.feed.height
  },

  methods: {
    stopFeed () {
      this.$store.commit('set', ['isWebcamOn', false])
      this.refs.webcam.srcObject.getTracks().forEach(track => track.stop())
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
