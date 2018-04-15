<template lang="pug">
  div
    #mask(v-if='isSidebarActive' @click='clickedMask')
    Pointer
    video.hidden(ref='webcam' playsinline)
    Header.show-sm
    .container.grid-xl
      .columns
        .column.col-2.col-xl-3.col-md-4
          Sidebar
        .column.col-10.col-xl-9.col-md-8.col-sm-12
          router-view
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Pointer from '@/components/Pointer'
import { mapState } from 'vuex'

export default {
  components: {
    Sidebar,
    Header,
    Pointer
  },

  computed: mapState([
    'isSidebarActive'
  ]),

  mounted () {
    console.log('mounted', this.$refs.webcam)
    this.$store.commit('merge', ['refs', {webcam: this.$refs.webcam}])
  },

  created () {
    console.log('created')
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

  .hidden
    display: none

  img
    max-width: 100%
    display: inline-block

  hr
    border: none
    border-bottom: 1px solid rgba(0, 0, 0, .15)

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
