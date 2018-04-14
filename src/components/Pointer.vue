<template lang="pug">
  #pointer(ref='pointer' :class='{hidden: !isTracking}')
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['isTracking']),

  mounted () { this.$store.commit('set', ['refs', {pointer: this.$refs.pointer}]) }
}
</script>

<style scoped lang="stylus">
  #pointer
    position: fixed
    z-index: 99999999
    width: 15px
    height: 15px
    border-radius: 15px
    background: rgba(255, 0, 0, 0.5)
</style>
