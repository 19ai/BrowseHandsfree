let $BrowseHandsfree = {
  cursor: document.createElement('div'),

  methods: {
    /**
     * Update the cursor position and handle gestures
     */
    updateCursor (data) {
      data = data.data
      const cursor = data.cursor
      const face = data.face
      const gesture = data.gesture
      const settings = data.settings

      this.updateSettings(settings)
      this.updateCursor(cursor)
      this.updateScroll(cursor, settings)
      this.fireEvents(cursor)
    }
  },

  /**
   * Sets the settings
   */
  updateSettings (settings) {
    this.cursor.style.width = settings.cursor.size
    this.cursor.style.height = settings.cursor.size
    this.cursor.style.borderRadius = settings.cursor.size
  },

  /**
   * Updates the cursors position
   */
  updateCursor (cursor) {
    this.cursor.style.display = 'block'
    this.cursor.style.left = `${cursor.position.left}px`
    this.cursor.style.top = `${cursor.position.top}px`
  },

  /**
   * Updates the window scroll position
   */
  updateScroll (cursor, settings) {
    let scrollBy = {
      x: 0,
      y: 0
    }

    if (cursor.position.top < 0) {
      scrollBy.y = cursor.position.top
    } else if (cursor.position.top > window.innerHeight) {
      scrollBy.y = cursor.position.top - window.innerHeight
    }
    // Horiz Scroll
    if (cursor.position.left < 0) {
      scrollBy.x = cursor.position.left
    } else if (cursor.position.left > window.innerWidth) {
      scrollBy.x = cursor.position.left - window.innerWidth
    }

    scrollBy.x *= settings.cursor.scroll.sensitivityLog
    scrollBy.y *= settings.cursor.scroll.sensitivityLog
    scrollBy && window.scrollBy(scrollBy.x, scrollBy.y)
  },

  /**
   * Fires events on elements
   */
  fireEvents (cursor) {
    // Click
    if (cursor.clicked) this.fireEvent('click', cursor)

    // Mousedown
    if (!cursor.clicked && cursor.isDown) this.fireEvent('mousedown', cursor)

    // Hover
    if (!cursor.clicked && !cursor.isDown) this.fireEvent('mouseover', cursor)
  },

  /**
   * Fires a specific event
   * @param  {STR} eventName The name of the event to fire
   * @param  {OBJ} cursor    The cursor object
   */
  fireEvent (eventName, cursor) {
    const $el = this.getTouchedElement(cursor)
    if ($el) {
      // @see https://stackoverflow.com/questions/3277369/how-to-simulate-a-click-by-using-x-y-coordinates-in-javascript
      const ev = document.createEvent('MouseEvent')
      ev.initMouseEvent(eventName, true, true, window, null, cursor.position.left, cursor.position.top, 0, 0, false, false, false, false, 0, null)
      $el.dispatchEvent(ev)
    }
  },

  /**
   * Gets the element under the cursor
   */
  getTouchedElement (cursor) {
    return document.elementFromPoint(cursor.position.left, cursor.position.top)
  }
}

$BrowseHandsfree.cursor.id = 'browsehandsfree-cursor'
$BrowseHandsfree.cursor.style.background = 'rgba(255, 0, 0, 0.85)'
$BrowseHandsfree.cursor.style.border = '2px solid rgba(255, 0, 0, 0.85)'
$BrowseHandsfree.cursor.style.transformOrigin = 'center'
$BrowseHandsfree.cursor.style.width = '15px'
$BrowseHandsfree.cursor.style.height = '15px'
$BrowseHandsfree.cursor.style.borderRadius = '15px'
$BrowseHandsfree.cursor.style.opacity = 0.8
$BrowseHandsfree.cursor.style.position = 'fixed'
$BrowseHandsfree.cursor.style.display = 'none'
$BrowseHandsfree.cursor.style.zIndex = 9999999
document.body.appendChild($BrowseHandsfree.cursor)

/**
 * Listen for cursor updates
 */
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (!msg.browsehandsfree) return
  $BrowseHandsfree.methods[msg.method].call($BrowseHandsfree, msg)
})

/**
 * Attaches the virtual keyboard
 */
jQuery(function () {
  setTimeout(function () {
    console.log('ready')
    jQuery('input, textarea').keyboard()
  }, 500)
})
