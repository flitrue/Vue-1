// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

var Child = {
  template: '<div class="body">A custom component!</div>'
}
Vue.component('my-component', Child)

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})

Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})
Vue.component('child1', {
  props: ['myMessage'],
  template: '<span>{{myMessage}}</span>'
})
Vue.component('auto-child', {
  props: ['autoMsg'],
  template: '<span>I am auto child {{autoMsg}}</span>'
})
console.log(vm)
