<template>
  <div id="demo">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="slide-fade">
      <div v-if="show" class="div1">hello</div>
    </transition>
  </div>
</template>
<style>
  .div1 {
    border: 1px solid red;
    height: 200px;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateY(100px);
    opacity: 0;
  }
</style>
<script>
  import Velocity from 'velocity-animate'
  export default {
    data () {
      return {
        show: false
      }
    },
    methods: {
      beforeEnter: function (el) {
        el.style.opacity = 0
      },
      enter: function (el, done) {
        var vm = this
        Velocity(el,
          { opacity: 1 },
          {
            duration: this.fadeInDuration,
            complete: function () {
              done()
              if (!vm.stop) vm.show = false
            }
          }
        )
      },
      leave: function (el, done) {
        var vm = this
        Velocity(el,
          { opacity: 0 },
          {
            duration: this.fadeOutDuration,
            complete: function () {
              done()
              vm.show = true
            }
          }
        )
      }
    }
  }
</script>
