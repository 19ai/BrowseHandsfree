import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/views/Start'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    }
  ]
})
