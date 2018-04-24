<template lang="pug">
  div.full-height
    #mask(v-if='isSidebarActive' @click='clickedMask')
    Pointer
    video.hidden(ref='webcam' playsinline)
    Header.show-sm
    .container.grid-xl.full-height
      .columns.full-height
        .column.col-2.col-xl-3.col-md-4
          Sidebar
        .column.col-10.col-xl-9.col-md-8.col-sm-12.full-height
          router-view.full-height
          Feed(v-if='isWebcamOn')
            div.text-center(v-if='loadingText')
              .loading.loading-lg
              p {{ loadingText }}
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Feed from '@/components/Feed'
import Pointer from '@/components/Pointer'
import { mapState } from 'vuex'

export default {
  components: {
    Feed,
    Header,
    Pointer,
    Sidebar
  },

  computed: mapState([
    'chromBgPage',
    'isSidebarActive',
    'isWebcamOn',
    'loadingText'
  ]),

  mounted () {
    this.$store.commit('merge', ['refs', {webcam: this.$refs.webcam}])

    // Set the chrome background page
    if (window.chrome && window.chrome.extension) this.$store.commit('set', ['chromeBgPage', window.chrome.extension.getBackgroundPage()])
  },

  methods: {
    clickedMask () {
      this.$store.commit('set', ['isSidebarActive', false])
    }
  }
}
</script>

<style lang='stylus'>
  @import './styles/main'

  #mask
    z-index: 100
    content: ''
    display: block
    background: rgba(0, 0, 0, .35)
    position: fixed
    top: 0
    left: 250px
    height: 100%
    width: 100%
    cursor: pointer
</style>
