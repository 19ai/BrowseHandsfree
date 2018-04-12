<template lang="pug">
header.navbar
  section.navbar-section
    router-link.btn.btn-link(to='/')
      span.mr-1 Browse<b>Handsfree</b>
      small {{version}}
</template>

<script>
import CONFIG from '@/config.json'

export default {
  data () {
    console.log(CONFIG.version)
    return {
      version: CONFIG.version
    }
  }
}
</script>
