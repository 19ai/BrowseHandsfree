<template lang="pug">
  aside.hide-sm(:class='{"is-active": isSidebarActive}')
    div.text-center
      router-link.btn.btn-link(to='/' style='height: auto')
        img(src='/static/browsehandsfree-favicon.png' style='max-width: 100px')
    h1.text-center(style='margin-top: -20px; margin-bottom: 0')
      router-link.btn.btn-link(to='/')
        span.mr-1 Browse<b>Handsfree</b>
        small {{version}}

    p.text-center
      small Browse the web <b>handsfree!</b>

    hr

    .links
      div
        router-link.btn.btn-link(to='/') Start Here
      div
        router-link.btn.btn-link(to='/settings') Settings
      div
        router-link.btn.btn-link(to='/3d-sandbox') 3D Sandbox
      div
        router-link.btn.btn-link(to='/sketch-sandbox') Sketch Sandbox
      div
        router-link.btn.btn-link(to='/timeline') Timeline
</template>

<script>
import CONFIG from '@/config.json'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      version: CONFIG.version
    }
  },

  computed: mapState(['isSidebarActive'])
}
</script>

<style scoped lang="stylus">
  .links
    .router-link-exact-active
      font-weight: bold

  @media screen and (max-width: 600px)
    aside.is-active
      position: fixed
      z-index: 101
      left: 0
      top: 0
      height: 100%
      display: block !important
      background: #fff
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.35)
      width: 250px
      max-width: 100%
</style>
