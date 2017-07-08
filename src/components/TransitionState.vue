<script src="../../static/Tween.js"></script>
<template>
  <div class="">
    <div class="header">
      &nbsp;状态动画与watcher
    </div>

    <div class="body">
      <!--这里的v-model.number可以改成v-model-->
      <input v-model="number" type="number" step="20"><button @click="changePrice">changePrice</button>
      <p>{{ animatedNumber | filterA}}</p>
    </div>
    <div class="header">
      &nbsp;通过组件组织过渡
    </div>
    <div class="body" id="example-8">
      <input v-model.number="firstNumber" type="number" step="20"> +
      <input v-model.number="secondNumber" type="number" step="20"> =
      {{ result }}
      <p>
        <animated-integer v-bind:value="firstNumber"></animated-integer> +
        <animated-integer v-bind:value="secondNumber"></animated-integer> =
        <animated-integer v-bind:value="result"></animated-integer>
      </p>
    </div>
  </div>
</template>
<script src="https://unpkg.com/tween.js@16.3.4"></script>
<style>
</style>
<script>
  import TWEEN from 'tween'
//  var TWEEN = require('exports?tween!../../static/Tween')
  export default {
    components: {
      'animated-integer': {
        template: '<span>{{ tweeningValue }}</span>',
        props: {
          value: {
            type: Number,
            required: true
          }
        },
        data: function () {
          return {
            tweeningValue: 0
          }
        },
        watch: {
          value: function (newValue, oldValue) {
            this.tween(oldValue, newValue)
          }
        },
        mounted: function () {
          this.tween(0, this.value)
        },
        methods: {
          tween: function (startValue, endValue) {
            var vm = this

            function animate (time) {
              requestAnimationFrame(animate)
              TWEEN.update(time)
            }

            new TWEEN.Tween({tweeningValue: startValue})
              .to({tweeningValue: endValue}, 500)
              .onUpdate(function () {
                vm.tweeningValue = this.tweeningValue.toFixed(0)
              })
              .start()
            animate()
          }
        }
      }
    },
    data: function () {
      return {
        number: 0.01,
        animatedNumber: 0.00,
        firstNumber: 20,
        secondNumber: 40
      }
    },
    methods: {
      changePrice () {
        this.number = 470000.00
      }
    },
    filters: {
      filterA: function (value) {
        function formatNumber (num, precision, separator) {
          var parts
          if (!isNaN(parseFloat(num)) && isFinite(num)) {
            num = Number(num)
            num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString()
            parts = num.split('.')
            parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','))
            return parts.join('.')
          }
          return NaN
        }
        return '￥' + formatNumber(value, 2)
      }
    },
    watch: {
      number: function (newValue, oldValue) {
        console.log('newValue: ' + newValue)
        console.log('oldValue: ' + oldValue)
        var vm = this
        function animate (time) {
//          console.log('time: ' + time)
//          requestAnimationFrame(animate)
          TWEEN.update(time)
        }
        new TWEEN.Tween({ tweeningNumber: oldValue })
//          .easing(TWEEN.Easing.Quadratic.Out)
          .to({ tweeningNumber: newValue }, 500)
          .onUpdate(function () {
            vm.animatedNumber = this.tweeningNumber.toFixed(2)
          })
          .start()
        animate()
      }
    },
    computed: {
      result: function () {
        return this.firstNumber + this.secondNumber
      }
    }
  }
</script>
