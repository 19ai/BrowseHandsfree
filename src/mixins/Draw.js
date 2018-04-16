export default {
  methods: {
    /**
     * Draws all the vertices for a given face
     *
     * @param  {OBJ} face The face object to draw vertices for
     */
    drawVertices (face) {
      const context = this.refs.feed.getContext('2d')
      let color = this.gesture.smile * 255

      context.strokeStyle = `rgba(255, ${color}, 0, .75)`

      for (let i = 0; i < face.vertices.length; i += 2) {
        context.beginPath()
        context.arc(face.vertices[i], face.vertices[i + 1], 2, 0, 2 * Math.PI)
        context.stroke()
      }

      this.$store.commit('set', ['lastFace', {
        face,
        time: new Date()
      }])
    },

    /**
     * Draws the triangles connecting vertices
     *
     * @param  {OBJ} face The face object to draw vertices for
     */
    drawTriangles (face) {
      const context = this.refs.feed.getContext('2d')
      const tris = face.triangles
      const verts = face.vertices
      let color = this.gesture.smile * 255

      context.strokeStyle = `rgba(255, ${color}, 0, .15)`

      for (let i = 0; i < tris.length; i++) {
        let tri = [tris[i], tris[i + 1], tris[i + 2]]
        let x = [verts[tri[0] * 2], verts[tri[1] * 2], verts[tri[2] * 2]]
        let y = [verts[tri[0] * 2 + 1], verts[tri[1] * 2 + 1], verts[tri[2] * 2 + 1]]

        context.beginPath()
        context.moveTo(x[0], y[0])
        context.lineTo(x[1], y[1])
        context.lineTo(x[2], y[2])
        context.lineTo(x[0], y[0])
        context.stroke()
      }
    }
  }
}
