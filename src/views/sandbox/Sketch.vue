<template lang="pug">
  div.full-height
    div.text-center.mt-2(v-if='isLoading')
      .loading.loading-lg
      p Loading demo... <small>may take around a min the first time</small>
    iframe.full-height(ref='container' src='/static/sandbox/demos/sketch/sketch.html')
</template>

<script>
import Emmits from '@/mixins/Emmits'

export default {
  mixins: [Emmits],

  data () {
    return {
      isLoading: true
    }
  },

  mounted () {
    window.addEventListener('message', this.onReady, false)
  },

  methods: {
    onReady (msg) {
      if (msg.data.from === 'BrowseHandsfree-Sketch') this.isLoading = false
    }
  }
}
</script>
