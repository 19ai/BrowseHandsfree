<template lang="pug">
  div
    div.text-center
      router-link.btn.btn-link(to='/' style='height: auto')
        img(src='/static/browsehandsfree-favicon.png' style='max-width: 100px')
    h1.text-center(style='margin-top: -20px')
      router-link.btn.btn-link(to='/')
        span.mr-1 Browse<b>Handsfree</b>
        small {{version}}
</template>

<script>
import CONFIG from '@/config.json'

export default {
  data () {
    return {
      version: CONFIG.version
    }
  }
}
</script>
