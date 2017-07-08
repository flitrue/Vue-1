<template>
  <div>
    <div class="header">使用组件 注册</div>
    <div id="example" class="body">
      <my-component></my-component>
    </div>
    <table style="border: 1px solid red">
      <tr is="my-row"></tr>
      <!--<my-row></my-row>-->
    </table>
    <div class="body">
      <simple-counter></simple-counter>
      <simple-counter></simple-counter>
      <simple-counter></simple-counter>
    </div>
    <div class="header">使用Prop传递数据</div>
    <div class="body">
      <child my-message="hello!"></child>
    </div>
    <div class="header">动态Prop</div>
    <div class="body">
      <input v-model="parentMsg">
      <br>
      <child v-bind:my-message="parentMsg"></child>
      <br>
      <input type="text" v-model="a">
      <br>
      <comp v-bind:some-prop='a'></comp>
      <br>
    </div>
    <div class="header">使用 v-on 绑定自定义事件</div>
    <div class="body">
      <p>{{ total }}</p>
      <button-counter v-on:increment="incrementTotal"></button-counter>
      <button-counter v-on:increment="incrementTotal"></button-counter>
      <button-counter v-on:increment="incrementTotal"></button-counter>
    </div>
    <div class="header">使用自定义事件的表单输入组件</div>
    <div class="body">
      <currency-input v-model="price"></currency-input>
    </div>
    <div class="header">非父子组件通信</div>
    <div class="body" @click="onEvent">Click Me
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'
//  var data = { counter: 0 }
  var Child = {
    template: '<div>A custom component!</div>'
  }

  var bus = new Vue()
  export default {
    data: function () {
      return {
        parentMsg: '',
        a: '',
        total: 0,
        myBind: 'http://www.baidu.com',
        price: 0
      }
    },
    components: {
      'currency-input': {
        template: `
          <span>
            <input
              ref="input"
              v-bind:value="value"
              v-on:input="updateValue($event.target.value)"
            >
          </span>
        `,
        props: ['value'],
        methods: {
          // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
          updateValue: function (value) {
            console.log('value: ' + value)
            console.log('value.indexOf: ' + value.indexOf('.'))
            var formattedValue = value
            // 删除两侧的空格符
              .trim()
              // 保留 2 小数位
              .slice(0, value.indexOf('.') + 3)
            // 如果值不统一，手动覆盖以保持一致
            if (formattedValue !== value) {
              this.$refs.input.value = formattedValue
            }
            // 通过 input 事件发出数值
            this.$emit('input', Number(formattedValue))
            bus.$emit('id-selected', new Date())
          }
        }
      },
      'button-counter': {
        template: '<button v-on:click="increment">{{ counter }}</button>',
        data: function () {
          return {
            counter: 0
          }
        },
        methods: {
          increment: function () {
            this.counter += 1
            this.$emit('increment')
          }
        }
      },
      'comp': {
        props: ['someProp'],
        template: '<span>{{someProp}}</span>'
      },
      'child': {
        props: ['myMessage'],
        template: '<span>{{ myMessage }}</span>'
      },
      'my-component': Child,
      'my-row': {
        template: '<tr><td>I am a tddd</td></tr>'
      },
      'simple-counter': {
        template: '<button v-on:click="counter += 1">{{ counter }}</button>',
        data: function () {
          return {
            counter: 0
          }
        }
      }
    },
    created: function () {
      console.log('created')
      bus.$on('id-selected', function (id) {
        console.log('created-I am $on id: ' + id)
      })
    },
    mounted: function () {
      console.log('mounted')
      bus.$on('id-selected', function (id) {
        console.log('mounted-I am $on id: ' + id)
      })
    },
    methods: {
      incrementTotal: function () {
        this.total += 1
      },
      onEvent: function () {
        bus.$on('id-selected', function (id) {
          console.log('onEvent-I am $on id: ' + id)
        })
      }
    }
  }
</script>
