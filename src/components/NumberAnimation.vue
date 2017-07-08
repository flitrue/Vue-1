<template>
  <div>
    <input v-model="selectedPrice" type="number" step="20">
    <p>{{ animatedNumber }}</p>
    <button @click="setPrice()">Set Price</button>
  </div>
</template>
<!--<script src="https://raw.githubusercontent.com/tweenjs/tween.js/master/src/Tween.js"></script>-->
<script>
  import TWEEN from 'tween'
  export default {
    data () {
      return {
        selectedPrice: 0,
        animatedNumber: 0
      }
    },
    methods: {
      setPrice () {
        this.selectedPrice += 1000
      }
    },
    watch: {
      selectedPrice: function (newValue, oldValue) {
        var vm = this
        var animationFrame
        function animate (time) {
          TWEEN.update(time)
          animationFrame = requestAnimationFrame(animate)
        }
        new TWEEN.Tween({ tweeningNumber: oldValue })
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({ tweeningNumber: newValue }, 500)
          .onUpdate(function () {
            vm.animatedNumber = this.tweeningNumber.toFixed(2)
          })
          .onComplete(function () {
            cancelAnimationFrame(animationFrame)
          })
          .start()
        animationFrame = requestAnimationFrame(animate)
      }
    }
  }
</script>
