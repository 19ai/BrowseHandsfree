export default {
  methods: {
    /**
     * Attempts to update the camera position within the iframe demo
     *
     * @param {OBJ} face The face object
     */
    maybeUpdateCamera (face) {
      this.$refs.container.contentWindow.postMessage({
        from: 'BrowseHandsfree',
        cursor: this.cursor,
        offset: {
          left: this.$refs.container.offsetLeft,
          top: this.$refs.container.offsetTop - window.scrollY
        },
        face
      }, '*')
    }
  }
}
