<template lang="pug">
  .container.grid-xs(v-if='!isWebcamOn')
    p.text-center.mt-2
      img(src='static/browsehandsfree-favicon.png' width='100px')
    h1.h5.text-center Welcome to Browse<b>Handsfree</b>!
    p.mt-2 Browse<b>Handsfree</b> is a tool that will let you browse the web handsfree. It does this through your webcam by positioning a cursor over the part of the screen that you're looking at, and click things by smiling!
    p.text-center
      button.btn.btn-primary(@click='startWebcam') Start Webcam
    p.mt-2.text-center
      small Please allow up to a minute for the machine to load for the first time.
</template>

<script>
import { mapState } from 'vuex'
import BRFMixins from '@/mixins/BRF.js'
import DrawMixins from '@/mixins/Draw.js'

export default {
  mixins: [
    BRFMixins,
    DrawMixins
  ],

  computed: mapState([
    'isBRFInitialized',
    'isWebcamOn',
    'isTracking',
    'refs'
  ]),

  watch: {
    isWebcamOn () { this.isWebcamOn && !this.isBRFInitialized && this.initBRF() }
  },

  methods: {
    /**
     * Starts the webcam
     */
    startWebcam () {
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
          this.refs.webcam.srcObject = stream
          this.$store.commit('set', ['isWebcamOn', true])
          this.$store.dispatch('drawLoop')

          if (this.isIOS11 || this.isTracking) this.trackFaces()
        })
    }
  }
}
</script>
