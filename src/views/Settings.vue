<template lang="pug">
  div.container.grid-xs.mt-2
    .card
      .card-header
        h1.card-title.h5 Settings
        .card-subtitle.text-grray Adjust sensitivity
      .card-body
        .form-group
          label.form-label(for='setting-horiz-speed') Horizontal Sensitivity
          input#setting-horiz-speed.slider.mr-2(type='range' step='1' min='0' :max='speed.max' v-model='speed.x')
          input(type='number' v-model='speed.x' min='0' :max='speed.max')
        .form-group
          label.form-label(for='setting-vert-speed') Vertical Sensitivity
          input#setting-vert-speed.slider.mr-2(type='range' step='1' min='0' :max='speed.max' v-model='speed.y')
          input(type='number' v-model='speed.y' min='0' :max='speed.max')
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['settings'])
  },

  data () {
    return {
      speed: {
        x: 50,
        y: 50,
        max: 100
      }
    }
  },

  mounted () {
    this.speed = this.settings.speed
  },

  methods: {

    /**
     * Returns the sensitivity based on the range 0 - 100
     * @param  {NUM} base The value on the slider
     */
    sensitivity (base) {
      let rangeMin = 0
      let rangeMax = this.speed.max
      let actualMin = Math.log(0.15)
      let actualMax = Math.log(10)
      let scale = (actualMax - actualMin) / (rangeMax - rangeMin)

      return Math.exp(actualMin + scale * (base - rangeMin))
    },

    /**
     * Persist settings locally
     */
    saveSettings () {
    }
  }
}
</script>
