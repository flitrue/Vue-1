<template>
  <div>
    <my-component></my-component>
  </div>
  <template id="myComponent">
    <div>This is a component!</div>
  </template>
</template>

<script>
  import Vue from 'vue'
  /*
  //全局注册和局部注册
  var myComponent = Vue.extend({
    template: '<div>This is my first component!</div>'
  })
//  Vue.component('my1-component', myComponent) // 全局注册
  export default {
    components: {
      // 局部注册
      'my1-component': myComponent
    }
  }
  */
  /*
  // 父子组件注册
  var Child = Vue.extend({
    template: '<p>This is a child component!</p>'
  })
  var Parent = Vue.extend({
    // 在Parent中使用<child-component>标签
    template: '<div><p>This is a parent component</p><child-component></child-component></div>',
    components: {
      'child-component': Child
    }
  })
  Vue.component('parent-component', Parent)
  */
  Vue.component('my-component', {
    template: '#myComponent'
  })
</script>
