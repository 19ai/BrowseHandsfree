<template lang="pug">
  div.full-height(style='position: relative')
    h1.h5.mt-2 Sketch Sandbox
    p Draw anywhere in the white space below by holding a smile!
    p
      button.btn.btn-primary(@click='clearSketch') Clear Sketch
    canvas.full-height(ref='canvas' style='position: relative')
</template>

<script>
import paper from 'paper'
import { distance } from 'mathjs'
import { mapState } from 'vuex'

export default {
  computed: mapState(['lastFace', 'cursor']),

  watch: {
    lastFace (face) { this.draw() }
  },

  data () {
    return {
      path: null,
      offsets: null,
      tool: new paper.Tool(),
      lastPosition: {
        x: 0,
        y: 0
      }
    }
  },

  mounted () {
    const $canvas = this.$refs.canvas
    const bounds = $canvas.getBoundingClientRect()

    // Resize canvas
    paper.setup(this.$refs.canvas)
    this.$refs.canvas.width = this.$refs.canvas.parentElement.clientWidth
    this.$refs.canvas.height = this.$refs.canvas.parentElement.clientHeight
    paper.view.viewSize = new paper.Size(this.$refs.canvas.width, this.$refs.canvas.height)
    paper.view.draw()

    this.offsets = bounds
  },

  methods: {
    /**
     * Handles drawing on the canvas
     */
    draw () {
      // Draw the line
      if (this.cursor.isDown && !this.cursor.clicked && this.path) {
        this.path.add(this.getPoint())
        this.path.strokeColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
      }

      // Start a new line
      if (this.cursor.clicked) {
        this.path = new paper.Path()
        this.path.strokeWidth = 2
        this.path.add(this.getPoint())
      }
    },

    /**
     * Gets the cursor position as a Paper point
     */
    getPoint () {
      let position = {
        x: this.cursor.position.left - this.offsets.left,
        y: this.cursor.position.top - this.offsets.top - window.scrollY
      }
      let dist = distance([this.lastPosition.x, this.lastPosition.y], [position.x, position.y])
      let newPosition = this.lastPosition

      if (dist > 10) this.lastPosition = newPosition = position

      return newPosition
    },

    clearSketch () {
      paper.project.activeLayer.removeChildren()
    }
  }
}
</script>
