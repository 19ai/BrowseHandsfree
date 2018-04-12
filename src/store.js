import Vue from 'vue'
import Vuex from 'vuex'
import { merge } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Whether the sidebar is active (on mobile); shows #mask if true
    isSidebarActive: false,

    // Whether the main video element is feeding in from webcam
    isWebcamStarted: false,

    // The last requestAnimationFrame reference
    lastFrame: null,

    // Global references
    refs: {
      webcam: null
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
