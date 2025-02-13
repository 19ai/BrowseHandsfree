<template lang="pug">
  div.container.grid-xs.mt-2
    .card
      .card-header
        h1.card-title.h5 Settings
        .card-subtitle.text-grray Adjust sensitivity
      .card-body
        .form-group
          label.form-label
            | Horizontal Sensitivity
            input.ml-2(type='number' v-model='settings.speed.xLog' min='0.1' step='any' :max='settings.speed.max')
          input.slider.mr-2(type='range' min='0.1' step='any' :max='settings.speed.max' v-model='settings.speed.x')
        .form-group
          label.form-label
            | Vertical Sensitivity
            input.ml-2(type='number' v-model='settings.speed.yLog' min='0.1' step='any' :max='settings.speed.max')
          input.slider.mr-2(type='range' min='0.1' step='any' :max='settings.speed.max' v-model='settings.speed.y')

        .form-group
          label.form-label
            | X-Offset
            input.ml-2(type='number' min='-1000' max='1000' step='any' v-model='settings.offset.x')
          input.slider.mr-2(type='range' min='-1000' max='1000' step='any' v-model='settings.offset.x')
        .form-group
          label.form-label
            | Y-Offset
            input.ml-2(type='number' min='-1000' max='1000' step='any' v-model='settings.offset.y')
          input.slider.mr-2(type='range' min='-1000' max='1000' step='any' v-model='settings.offset.y')

        .form-group
          label.form-label
            | Cursor Size
            input.ml-2(type='number' min='1' max='200' step='any' v-model='settings.cursor.size')
          input.slider.mr-2(type='range' min='1' max='200' step='any' v-model='settings.cursor.size')

        .form-group
          label.form-label
            | Click Sensitivity
            input.ml-2(type='number' min='0.01' max='1' step='any' v-model='settings.cursor.click.sensitivity')
          input.slider.mr-2(type='range' min='0.01' max='1' step='any' v-model='settings.cursor.click.sensitivity')

        .form-group
          label.form-label
            | Scroll Sensitivity
            input.ml-2(type='number' min='0.01' max='4' step='any' v-model='settings.cursor.scroll.sensitivityLog')
          input.slider.mr-2(type='range' min='0.01' max='4' step='any' v-model='settings.cursor.scroll.sensitivity')
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from 'lodash'
import lockr from 'lockr'

export default {
  computed: {
    ...mapState(['settings'])
  },

  watch: {
    'settings.speed.y' () {
      let settings = Object.assign({}, this.settings)
      settings.speed.yLog = this.sensitivity(this.settings.speed.y, this.settings.speed.max)
      this.$store.commit('merge', ['settings', settings])
    },

    'settings.speed.x' () {
      let settings = Object.assign({}, this.settings)
      settings.speed.xLog = this.sensitivity(this.settings.speed.x, this.settings.speed.max)
      this.$store.commit('merge', ['settings', settings])
    },

    'settings.cursor.scroll.sensitivity' () {
      let settings = Object.assign({}, this.settings)
      settings.cursor.scroll.sensitivityLog = this.sensitivity(this.settings.cursor.scroll.sensitivity, 4)
      this.$store.commit('merge', ['settings', settings])
    },

    settings: {
      handler: debounce(function () { lockr.set('settings', this.settings) }, 250, true),
      deep: true
    }
  },

  methods: {

    /**
     * Returns the sensitivity based on the range 0 - 100
     * @param  {NUM} base The value on the slider
     */
    sensitivity (base, max) {
      let rangeMin = 0.1
      let rangeMax = max
      let actualMin = Math.log(0.1)
      let actualMax = Math.log(max)
      let scale = (actualMax - actualMin) / (rangeMax - rangeMin)

      return Math.exp(actualMin + scale * (base - rangeMin))
    }
  }
}
</script>
