import Vue from 'vue'
import Vuex from 'vuex'
import { merge } from 'lodash'
import lockr from 'lockr'

let settings = lockr.get('settings') || {}
settings = merge({
  cursor: {
    size: 15,
    click: {
      sensitivity: 0.8
    },
    scroll: {
      sensitivity: 1,
      sensitivityLog: 1
    },

    // Number of frames a click is active for
    clickFrameBuffer: 1
  },

  offset: {
    x: 0,
    y: 0
  },

  speed: {
    x: 1,
    y: 1,
    xLog: 1,
    yLog: 1,
    max: 10
  }
}, settings)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // The BRF Object
    brf: null,

    // The BRF Manager
    brfManger: null,

    // The BRF manager object
    // @SEE https://tastenkunst.github.io/brfv4_docs/
    brfResolution: null,

    // The chrome background page
    chromeBgPage: null,

    cursor: {
      position: {
        left: 0,
        top: 0
      },
      isDown: false,
      clicked: false,
      framesSinceClicked: 0
    },

    // Different gesture confidences
    gesture: {
      smile: 0
    },

    // Whether the BFRv4 SDK is initialized
    isBRFInitialized: false,

    // Whether the sidebar is active (on mobile); shows #mask if true
    isSidebarActive: false,

    // Whether the webcam is initialized or not
    isWebcamOn: false,

    // Whether we are tracking faces or not
    isTracking: false,

    // The last face object discovered
    // There are listeners on this object (@see Pointer.vue)
    lastFace: null,

    // The last requestAnimationFrame reference
    lastFrame: null,

    // Loading text (or null)
    loadingText: null,

    // Global references
    refs: {
      // The webcam video element
      webcam: null,
      // The main canvas element
      feed: null,
      // The cursor object
      pointer: null
    },

    settings
  },

  mutations: {
    /**
     * Sets a state with key to a value
     *
     * @param {OBJ} state
     * @param {STR} payload Must be in form [key, value]
     */
    set (state, [key, value]) { state[key] = value },

    /**
     * Flips the truthyness of a variable
     *
     * @param {OBJ} state
     * @param {STR} key The key to flip
     */
    flip (state, key) { state[key] = !state[key] },

    /**
     * Merges values into a state with key
     * @param {OBJ} state
     * @param {STR} payload Must be in form [key, value]
     */
    merge (state, [key, values]) { state[key] = merge(state[key], values) }
  },

  actions: {
    /**
     * Our main draw loop. Note: Watch the `lastFrame` state in order to paint
     */
    drawLoop ({dispatch, commit}) {
      commit('set', ['lastFrame', requestAnimationFrame(() => {
        dispatch('drawLoop')
      })])
    },

    /**
     * Initializes the manager
     */
    initBRFManager ({state}) { state.brfManager && state.brfManager.init(state.brfResolution, state.brfResolution, 'com.browsehandsfree') },

    /**
     * Sets the click states
     */
    updateClick ({state}) {
      if (state.cursor.isDown) state.cursor.framesSinceClicked++

      // Clicked and held, so release the "clicked"
      if (state.cursor.clicked && state.cursor.isDown && state.cursor.framesSinceClicked > state.settings.cursor.clickFrameBuffer) { state.cursor.clicked = false }

      // Just Clicked
      if (state.gesture.smile === 1 && !state.cursor.isDown && !state.cursor.clicked) {
        state.cursor.isDown = true
        state.cursor.clicked = true
        state.cursor.framesSinceClicked = 0
      }

      if (state.gesture.smile !== 1) {
        state.cursor.isDown = false
        state.cursor.clicked = false
      }
    }
  }
})
