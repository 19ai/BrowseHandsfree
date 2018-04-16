import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/views/Start'
import Settings from '@/views/Settings'

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
    }
  ]
})
