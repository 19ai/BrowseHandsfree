import Vue from 'vue'
import Vuex from 'vuex'
import { merge } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Whether the BFRv4 SDK is initialized
    isBRFInitialized: false,

    // Whether the sidebar is active (on mobile); shows #mask if true
    isSidebarActive: false,

    // Whether the webcam is initialized or not
    isWebcamOn: false,

    // Whether the feeds are running or not
    isFeedOn: false,

    // Whether we are tracking faces or not
    isTracking: false,

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
    }
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
    drawLoop ({dispatch, commit}) { commit('set', ['lastFrame', requestAnimationFrame(() => { dispatch('drawLoop') })]) }
  }
})
