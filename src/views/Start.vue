<template lang="pug">
  .container.grid-xs(v-if='!isWebcamStarted')
    p.text-center.mt-2
      img(src='/static/browsehandsfree-favicon.png' width='100px')
    h1.h5.text-center Welcome to Browse<b>Handsfree</b>!
    p.mt-2 Browse<b>Handsfree</b> is a tool that lets you browse the web handsfree. It does this through your webcam by positioning a cursor at where you're looking at!
    p.text-center
      button.btn.btn-primary(@click='startWebcam') Start Webcam

  .container.grid-xs(v-else)
    Feed
</template>

<script>
import { mapState } from 'vuex'
import Feed from '@/components/Feed'

export default {
  components: {
    Feed
  },

  computed: mapState([
    'isWebcamStarted',
    'refs'
  ]),

  methods: {
    /**
     * Starts the webcam
     */
    startWebcam () {
      this.$store.commit('set', ['isWebcamStarted', true])
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then((stream) => {
          this.refs.webcam.srcObject = stream
          this.$store.dispatch('drawLoop')
        })
    }
  }
}
</script>
