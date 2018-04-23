<template lang="pug">
  .text-center(v-if='isWebcamOn').mt-2
    p(ref='feedWrap')
      canvas.flip-h(ref='feed')
    div(v-if='$route.name === "Start"')
      .container.grid-xs.text-left(v-if='isTracking')
        .card.mb-2
          .card-body
            p Awesome, you're almost ready to start! Please wait until there's a wireframe around your face above. Once there is, it's time to test things out!
            p.text-center
              img(src='static/img/browsehandsfree-click-demo-2018-04-22.gif')
            p <abbr class="tooltip" data-tooltip="this will be configurable in the future">Smiling activates clicks</abbr>! Once you feel comfortable looking around, check out the <router-link to="/settings">Settings Page</router-link> to calibrate your machine and check out the menu to try out our different experiments!
          .card-footer.text-center
            button.btn.btn-primary(@click='stopFeed') Stop Webcam
    div(v-else)
      button.btn.btn-primary(@click='stopFeed') Stop Webcam
    slot
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from 'lodash'

export default {
  computed: mapState([
    'isWebcamOn',
    'isTracking',
    'lastFrame',
    'refs'
  ]),

  watch: {
    lastFrame () { if (this.refs.webcam && this.refs.feed) this.$refs.feed.getContext('2d').drawImage(this.refs.webcam, 0, 0, this.$refs.feed.width, this.$refs.feed.height) }
  },

  mounted () {
    this.$store.commit('merge', ['refs', {feed: this.$refs.feed}])
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
      if (!this.refs.webcam.videoWidth) { return this.resizeFeed() }

      const $webcam = this.refs.webcam
      const $feed = this.$refs.feed
      const $feedWrap = this.$refs.feedWrap
      const width = Math.min($webcam.videoWidth, $feedWrap.clientWidth)
      const aspectRatio = $webcam.videoWidth / $webcam.videoHeight

      $feed.width = width
      $feed.height = width / aspectRatio

      this.$store.dispatch('initBRFManager')
    }, 50, {leading: true})
  }
}
</script>
