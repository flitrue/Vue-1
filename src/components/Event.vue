<template>
  <div>
    <my-child-component></my-child-component>
    <child-component childMessage="I am root node"></child-component>
    <p>{{total}}</p>
    <button-counter v-on:myincrement="incrementTotal"></button-counter>
    <button-counter v-on:myincrement="incrementTotal"></button-counter>
    <component v-bind:is="currentView"></component>
  </div>
</template>
<script>
  import Vue from 'vue'
  Vue.component('button-counter', {
    template: '<button v-on:click="increment">{{counter}}</button>',
    data: function () {
      return {
        counter: 0
      }
    },
    methods: {
      increment: function () {
        this.counter += 1
        this.$emit('myincrement')
      }
    }
  })
  Vue.component('child-component', {
    template: '<div>{{childMessage}} I am child</div>',
    props: ['childMessage'],
    data: function () {
      return {
      }
    }
  })
  Vue.component('my-child-component', {
    // 有效，因为是在正确的作用域内
    template: '<div v-show="someChildProperty">Child</div>',
    data: function () {
      return {
        someChildProperty: true
      }
    }
  })
  export default {
    data: function () {
      return {
        total: 0,
        message: new Date(),
        currentView: 'home',
        homeMsg: 'I am homeMsg'
      }
    },
    components: {
      home: {
        template: '<p>{{homeMsg}}</p>'
      }
    },
    methods: {
      incrementTotal: function () {
        this.total += 1
      }
    }
  }
</script>
