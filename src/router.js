import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/views/Start'
import Settings from '@/views/Settings'
import Sandbox3D from '@/views/sandbox/3D'
import SketchSandbox from '@/views/sandbox/Sketch'
import Timeline from '@/views/Timeline'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/3d-sandbox',
      name: '3D Sandbox',
      component: Sandbox3D
    },
    {
      path: '/sketch-sandbox',
      name: 'Sketch Sandbox',
      component: SketchSandbox
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: Timeline
    }
  ]
})
