<template lang="pug">
  div(ref='container')
</template>

<script>
import {PerspectiveCamera, Scene, Color, FogExp2, CylinderGeometry, MeshPhongMaterial, Mesh, DirectionalLight, AmbientLight, WebGLRenderer} from 'three/build/three.module.js'
import TrackballControls from '../../static/libs/three/trackball.js'
import {merge} from 'lodash'

export default {
  data () {
    return {
      camera: null,
      controls: null,
      renderer: null,
      scene: null
    }
  },

  mounted () {
    // Setup camera
    this.camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.z = 500
    this.setupControls()
    this.setupScene()
    this.setupLights()
    this.setupRenderer()
    this.animate()
  },

  methods: {
    /**
    * Sets up our controls
    * @see https://raw.githubusercontent.com/mrdoob/three.js/master/examples/misc_controls_trackball.html
    */
    setupControls () {
      this.controls = new TrackballControls(this.camera)

      merge({
        rotateSpeed: 1.0,
        zoomSpeed: 1.2,
        panSpeed: 0.8,
        noZoom: false,
        noPan: false,
        staticMoving: true,
        dynamicDampingFacor: 0.3,
        keys: [65, 83, 68]
      }, this.controls)

      this.controls.addEventListener('change', this.renderScene)
    },

    /**
    * Sets up the Scene
    */
    setupScene () {
      this.scene = Scene()
      this.scene.background = new Color(0x000000)
      this.scene.fog = new FogExp2(0x000000, 0.002)

      const geometry = new CylinderGeometry(0, 10, 30, 4, 1)
      const material = new MeshPhongMaterial({color: 0xffffff, flatShading: true})

      // Draw each object
      for (let i = 0; i < 500; i++) {
        let mesh = new Mesh(geometry, material)

        mesh.position.x = (Math.random() - 0.5) * 1000
        mesh.position.y = (Math.random() - 0.5) * 1000
        mesh.position.z = (Math.random() - 0.5) * 1000

        mesh.updateMatrix()
        mesh.matrixAutoUpdate = false

        this.scene.add(mesh)
      }
    },

    /**
    * Sets up the lighting
    */
    setupLights () {
      let lights = [
        new DirectionalLight(0xffffff),
        new DirectionalLight(0xffffff),
        new AmbientLight(0x222222)
      ]

      lights[0].position.set(1, 1, 1)
      lights[1].position.set(-1, -1, -1)

      this.scene.add(lights[0])
      this.scene.add(lights[1])
      this.scene.add(lights[2])
    },

    /**
    * Sets up the renderer
    */
    setupRenderer () {
      this.renderer = new WebGLRenderer()
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      this.$refs.container.appendChild(this.renderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false)
    },

    /**
    * Handles window resize
    */
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.controls.handleResize()

      this.renderScene()
    },

    animate () {
      requestAnimationFrame(this.animate)
      this.controls.update()
    },

    /**
    * Renders the scene
    */
    renderScene () { this.renderer.render(this.scene, this.camera) }
  }
}
</script>
