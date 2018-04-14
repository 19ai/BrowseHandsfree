import CONFIG from '@/config.json'

export default {
  data () {
    return {
      // Detect whether we support ASM or
      asmSupport: typeof WebAssembly === 'object',

      // The BRF object
      brf: null,

      // The BRF file path
      brfPath: CONFIG.brf.wasmPath,

      // Whether we're on IOS11
      isIOS11: false
    }
  },

  methods: {
    /**
     * Initializes BRF
     */
    initBRF () {
      this.asmSupport && this.testSafariWebAssemblyBug()
      this.setIsIOS11()
      this.loadBRF()
      this.loadBRFSDK()

      this.$store.commit('set', ['isBRFInitialized', true])
    },

    /**
     * Checks if we are on IOS11
     */
    setIsIOS11 () {
      const ua = window.navigator.userAgent
      this.isIOS11 = (ua.indexOf('iPad') > 0 || ua.indexOf('iPhone') > 0) && ua.indexOf('OS 11_') > 0
    },

    /**
     * Tests whether we support web assembly on Safari browsers
     * @see https://github.com/brion/min-wasm-fail/blob/master/min-wasm-fail.js
     */
    testSafariWebAssemblyBug () {
      const bin = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 127, 1, 127, 3, 2, 1, 0, 5, 3, 1, 0, 1, 7, 8, 1, 4, 116, 101, 115, 116, 0, 0, 10, 16, 1, 14, 0, 32, 0, 65, 1, 54, 2, 0, 32, 0, 40, 2, 0, 11])
      const mod = new WebAssembly.Module(bin)
      const inst = new WebAssembly.Instance(mod, {})

      // test storing to and loading from a non-zero location via a parameter.
      // Safari on iOS 11.2.5 returns 0 unexpectedly at non-zero locations
      if (inst.exports.test(4) === 0) this.asmSupport = false

      // Use asmjs if web assembly is not supported
      if (!this.asmSupport) this.brfPath = CONFIG.brf.asmPath
    },

    /**
     * Loads the correct BRF file, based on web assembly support
     */
    loadBRF () {
      const script = document.createElement('script')
      script.setAttribute('src', this.brfPath + CONFIG.brf.filename)
      script.setAttribute('async', true)
      script.setAttribute('type', 'text/javascript')
      document.getElementsByTagName('head')[0].appendChild(script)
    },

    /**
     * Loads the BRF SDK file
     */
    loadBRFSDK () {
      // on iOS we want to close the video stream first and
      // wait for the heavy BRFv4 initialization to finish.
      // Once that is done, we start the stream again.
      // Otherwise the stream will just stop and won't update anymore.
      if (this.isIOS11) {
        this.$webcam.pause()
        this.$webcam.srcObject.getTracks().forEach(track => track.stop())
      }

      this.waitForSDK()
    },

    /**
     * Waits for the SDK to get loaded before starting it
     */
    waitForSDK () {
      // Setup BRF config
      if (this.brf === null && window.initializeBRF) {
        let me = this
        this.brf = {locateFile (filename) { return me.brfPath + filename }}
        window.initializeBRF(this.brf)
      }

      // Start initialize SDK
      if (this.brf && this.brf.sdkReady) {
        this.initSDK()
      } else {
        return setTimeout(this.waitForSDK, 100)
      }
    },

    /**
     * Initialize the SDK
     */
    initSDK () {
      console.log('initSDK')
    }
  }
}
