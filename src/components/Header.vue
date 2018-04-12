<template lang="pug">
header.navbar
  section.navbar-section
    div.text-right(style='width: 100%')
      button.btn.btn-primary.btn-action(@click='toggleMenu')
        i.icon.icon-menu
</template>

<script>
import CONFIG from '@/config.json'

export default {
  data () {
    return {
      version: CONFIG.version
    }
  },

  methods: {
    toggleMenu () { this.$store.commit('flip', 'isSidebarActive') }
  }
}
</script>

<style lang="stylus">
  header.navbar
    padding: 0.5rem
</style>
