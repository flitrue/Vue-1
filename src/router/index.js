import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import NumberAnimation from '@/components/NumberAnimation.vue'
import TransitionState from '@/components/TransitionState.vue'
import Component from '@/components/Component.vue'
import Component1 from '@/components/Component1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/numberanimation',
      name: 'NumberAnimation',
      component: NumberAnimation
    },
    {
      path: '/transitionstate',
      name: 'TransitionState',
      component: TransitionState
    },
    {
      path: '/component',
      name: 'Component',
      component: Component
    },
    {
      path: '/component1',
      name: 'Component1',
      component: Component1
    }
  ]
})
