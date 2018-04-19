import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/views/Start'
import Settings from '@/views/Settings'
import Sandbox from '@/views/Sandbox'
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
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: Timeline
    }
  ]
})
