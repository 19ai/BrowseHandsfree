<template lang="pug">
  #pointer(ref='pointer' :class='{hidden: !isTracking || !isWebcamOn, pulse: gesture.smile === 1}')
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'brf',
    'cursor',
    'isTracking',
    'isWebcamOn',
    'lastFace',
    'refs',
    'settings',
    'gesture'
  ]),

  data () {
    return {
      // List of points being worked on
      point: {},

      // The pointer color
      color: '#ff0000'
    }
  },

  watch: {
    lastFace (face) { this.drawCursor(face) },
    'gesture.smile' (smile) { if (smile === 1) this.triggerClick() }
  },

  mounted () { this.$store.commit('set', ['refs', {pointer: this.$refs.pointer}]) },

  methods: {
    /**
     * Draws the cursor
     *
     * @param {OBJ} face The face to draw for
     */
    drawCursor (face) {
      face = face.face

      const $feed = this.refs.feed
      const ratio = {
        width: window.innerWidth / $feed.width,
        height: window.innerHeight / $feed.height
      }
      // The canvas is mirrored, so left needs a few more operations
      let left = -face.translationX * ratio.width + $feed.width + parseInt(this.settings.offset.x)
      let top = face.translationY * ratio.height + parseInt(this.settings.offset.y)

      left += Math.sin(face.rotationY) * (this.settings.speed.xLog * window.innerWidth) + $feed.offsetLeft
      top += Math.sin(face.rotationX) * (this.settings.speed.yLog * window.innerHeight)

      this.refs.pointer.style = `left: ${left}px; top: ${top}px; width: ${this.settings.cursor.size}px; height: ${this.settings.cursor.size}px; border-radius: ${this.settings.cursor.size}px; background: ${this.color}`
      this.$store.commit('merge', ['cursor', {position: {left, top}}])

      this.detectSmile(face)
      this.maybeScrollPage()
    },

    /**
     * Attempts to detect smiles
     *
     * @param {OBJ} face The current face object
     */
    detectSmile (face) {
      this.point[0] = new this.brf.Point()
      this.point[1] = new this.brf.Point()

      // Mouth corner left
      this.setPoint(face.vertices, 48, 0)
      // Mouth corner right
      this.setPoint(face.vertices, 54, 1)
      let mouthWidth = this.calcDistance(this.point[0], this.point[1])

      // Left inner eye corner
      this.setPoint(face.vertices, 39, 1)
      // right outer eye corner
      this.setPoint(face.vertices, 42, 0)
      let eyeDist = this.calcDistance(this.point[0], this.point[1])

      let smileFactor = mouthWidth / eyeDist
      // 1.4 = neutral, 1.7 = smiling
      smileFactor -= 1.4

      // Create artificial breakpoints
      if (smileFactor > 0.25) smileFactor = 0.25
      if (smileFactor < 0) smileFactor = 0
      smileFactor *= 4.0
      if (smileFactor < 0) smileFactor = 0
      if (smileFactor > this.settings.cursor.click.sensitivity) smileFactor = 1

      this.$store.commit('merge', ['gesture', {smile: smileFactor}])
      this.color = `rgb(255, ${smileFactor * 255}, 0)`
    },

    /**
     * Sets a points position
     *
     * @param {OBJ} vertices  The vertcies
     * @param {INT} i  The vertex to work with. v[i]
     * @param {OBJ} p  The point to work with. this.point[p]
     */
    setPoint (vertices, i, p) {
      let point = this.point[p]
      point.x = vertices[i * 2]
      point.y = vertices[i * 2 + 1]
    },

    /**
     * Calculate the distance between two points
     *
     * @param  {OBJ} p0 The first point
     * @param  {OBJ} p1 The second point
     */
    calcDistance (p0, p1) {
      return Math.sqrt(
        (p1.x - p0.x) * (p1.x - p0.x) +
        (p1.y - p0.y) * (p1.y - p0.y)
      )
    },

    /**
     * Triggers a click
     */
    triggerClick () {
      const $el = document.elementFromPoint(this.cursor.position.left, this.cursor.position.top)

      if ($el) {
        const ev = document.createEvent('MouseEvent')
        // @see https://stackoverflow.com/questions/3277369/how-to-simulate-a-click-by-using-x-y-coordinates-in-javascript
        ev.initMouseEvent('click', true, true, window, null, this.cursor.position.left, this.cursor.position.top, 0, 0, false, false, false, false, 0, null)
        $el.dispatchEvent(ev)
      }
    },

    /**
     * Maybe scrolls the page
     */
    maybeScrollPage () {
      let scrollBy = {
        x: 0,
        y: 0
      }

      // Vertical Scroll
      if (this.cursor.position.top < 0) {
        scrollBy.y = this.cursor.position.top
      } else if (this.cursor.position.top > window.innerHeight) {
        scrollBy.y = this.cursor.position.top - window.innerHeight
      }
      // Horiz Scroll
      if (this.cursor.position.left < 0) {
        scrollBy.x = this.cursor.position.left
      } else if (this.cursor.position.left > window.innerWidth) {
        scrollBy.x = this.cursor.position.left - window.innerWidth
      }

      scrollBy.x *= this.settings.cursor.scroll.sensitivityLog
      scrollBy.y *= this.settings.cursor.scroll.sensitivityLog
      scrollBy && window.scrollBy(scrollBy.x, scrollBy.y)
    }
  }
}
</script>

<style scoped lang="stylus">
  #pointer
    opacity: 0.8
    position: fixed
    z-index: 99999999
    width: 15px
    height: 15px
    transform-origin: center
    border-radius: 15px
    background: rgba(255, 0, 0, 0.85)
    border: 2px solid rgba(255, 0, 0, 0.85)

    &.pulse
      animation: 0.25s pulse 1

@keyframes pulse
  0%
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0)
  10%
    box-shadow: 0 0 0 10px rgba(255, 50, 0, 0.25)
  50%
    box-shadow: 0 0 0 40px rgba(255, 155, 0, 0.65)
  90%
    box-shadow: 0 0 0 60px rgba(255, 255, 0, 0.25)
  100%
    box-shadow: 0 0 0 80px rgba(255, 255, 0, 0)
</style>
