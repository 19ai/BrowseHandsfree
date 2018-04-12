<template lang="pug">
#app
  img(src='./assets/logo.png')
  router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='stylus'>
  @import '../node_modules/spectre.css/dist/spectre.min.css'
</style>
