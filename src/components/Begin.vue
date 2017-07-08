<template>
  <div>
    <div @click="onTopClick">
      I am Begin.vue
    </div>
    <br>
    {{ message | capitalize}}
    <a href="#app7">点击跳转</a>
    <div class="begin-body">
      <div id="app-2">
      <span v-bind:title="message">
        鼠标悬停几秒钟查看此处动态绑定的提示信息!
      </span>
      </div>
      <div id="app-3">
        <p v-if="seen">现在你看到我了</p>
      </div>
      <div id="app-4">
        <ol>
          <li v-for="todo in todos">
            {{ todo.text }}
          </li>
        </ol>
      </div>
      <div id="app-5">
        <p>{{ message }}</p>
        <button v-on:click="reverseMessage">逆转消息</button>
      </div>
      <div id="app-6">
        <input v-model="message" type="text">


      </div>
      <div id="app7" @click="jump()">
        <p>------------------------</p>
      </div>
      <div class="d_jump" id="v-once">
        <span v-once>This will never change: {{ message }}</span>
      </div>
      <div id="rawHtml" v-html="rawHtml"></div>
      <div v-bind:id="dynamicId">I am dynamicID</div>
      <div>
        <a v-bind:href="url">url</a>
      </div>
      <div>
        <a v-on:click="doSomething">doSomething</a>
      </div>
      <div id="filter">
        {{filterMsg | capitalize}}
      </div>
    </div>


    <div id="example">
      <p>Original message</p>
      <p></p>
    </div>
  </div>
</template>
<script>
  export default {
//    name: 'app-21',
    data: function () {
      return {
        message: 'abc',
        rawHtml: '<p>I am rawHtml</p>',
        seen: true,
        dynamicId: 'IamdynamicId',
        url: 'http://www.baidu.com',
        todos: [
          {text: '学习 Javascript'},
          {text: '学习 Vue'},
          {text: '学习 整个项目'}
        ],
        groceryList: [
          {text: '蔬菜'},
          {text: '奶酪'},
          {text: '随便其他什么吃的东西'}
        ],
        filterMsg: 'i am filter message'
      }
    },
    created () {
      console.log('I am created')
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('')
        this.todos = this.todos.reverse()
      },
      doSomething: function () {
        alert('I am doSomething')
      },
      onTopClick () {
//        window.location.hash = '#app7'
        console.log(12345)
        document.body.scrollTop = 500
      },
      jump () {
        let jump = document.querySelectorAll('#app-3')
        // 获取需要滚动的距离
        let total = jump[0].offsetTop - 200
//        total = 50
        console.log(total)
        // Chrome
        document.body.scrollTop = 0
        // Firefox
        document.documentElement.scrollTop = total
        // Safari
        window.pageYOffset = total
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>
<style>
  .begin-body {
    background-color: yellow;
    height: 500px;
    overflow-y: hidden;
  }
  .begin-body div {
    border-bottom: 1px solid red;
  }
</style>

