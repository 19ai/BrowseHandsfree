<template lang="pug">
  .container.grid-xs(v-if='isWebcamOn')
    Feed
  .container.grid-xs(v-else)
    p.text-center.mt-2
      img(src='/static/browsehandsfree-favicon.png' width='100px')
    h1.h5.text-center Welcome to Browse<b>Handsfree</b>!
    p.mt-2 Browse<b>Handsfree</b> is a tool that lets you browse the web handsfree. It does this through your webcam by positioning a cursor at where you're looking at!
    p.text-center
      button.btn.btn-primary(@click='startWebcam') Start Webcam
</template>

<script>
import { mapState } from 'vuex'
import Feed from '@/components/Feed'

export default {
  components: {
    Feed
  },

  computed: mapState([
    'isWebcamOn',
    'refs'
  ]),

  methods: {
    /**
     * Starts the webcam
     */
    startWebcam () {
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
          this.refs.webcam.srcObject = stream
          this.$store.dispatch('drawLoop')
          this.$store.commit('set', ['isWebcamOn', true])
        })
    }
  }
}
</script>
