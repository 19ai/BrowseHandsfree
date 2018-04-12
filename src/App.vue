<template lang="pug">
  .container.grid-xl
    .columns
      .column.col-2.col-xl-3.col-md-4.hide-sm
        Sidebar
      .column.col-10.col-xl-9.col-md-8
        router-view
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  components: {
    Sidebar
  }
}
</script>

<style lang='stylus'>
@import '../node_modules/spectre.css/dist/spectre.min.css'

img
  max-width: 100%
  display: inline-block
</style>
