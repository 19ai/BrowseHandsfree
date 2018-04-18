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
    'isSidebarActive',
    'isWebcamOn',
    'loadingText'
  ]),

  mounted () {
    this.$store.commit('merge', ['refs', {webcam: this.$refs.webcam}])
  },

  methods: {
    clickedMask () {
      this.$store.commit('set', ['isSidebarActive', false])
    }
  }
}
</script>

<style lang='stylus'>
  @import '../node_modules/spectre.css/dist/spectre.min.css'
  @import '../node_modules/spectre.css/dist/spectre-icons.min.css'
  @import '../node_modules/spectre.css/dist/spectre-exp.min.css'

  html, body
    height: 100%

  .hidden
    display: none

  img
    max-width: 100%
    display: inline-block

  hr
    border: none
    border-bottom: 1px solid rgba(0, 0, 0, .15)

  .slider
    margin-bottom: 0.4rem
    margin-top: 0.4rem

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

  .full-height
    height: 100%
</style>
