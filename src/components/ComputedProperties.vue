<template>
  <div>
    <div class="header">Computed Properties</div>
    <div class="body">
      <div id="example">
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p>
        <p>methods message: "{{ methodreversedMessage() }}"</p>
        <button @click="changeMsg">change Message</button>
      </div>
    </div>
    <div class="header">Computed Properties - watch</div>
    <div class="body">
       <div>{{ fullName }}</div>
       <div>{{ comfullName }}</div>
        <button @click="changeName">change fullName</button>
        <button @click="changeNameSetter">changeNameSetter</button>
    </div>
    <div class="header">Computed Properties - 观察watchers</div>
    <div class="body">
      <p>Ask a yes/no question:
        <input type="text" v-model="question">
      </p>
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: 'Hello',
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar',
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
      }
    },
    computed: {
      reversedMessage: function () {
        return this.message.split('').reverse().join('')
      },
//      comfullName: function () {
//        return this.firstName + ' ' + this.lastName
//      }
      // 计算属性 setter & getter
      comfullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          var names = newValue.split(' ')
          this.firstName = names[0] + '222'
          this.lastName = names[names.length - 1]
        }
      }
    },
    methods: {
      methodreversedMessage: function () {
        return this.message.split('').reverse().join('')
      },
      changeMsg: function () {
//        this.message = 'I am message'
        this.message = new Date().toDateString()
      },
      changeName: function () {
        this.firstName = 'Harry'
        this.lastName = 'Potter'
      },
      changeNameSetter: function () {
        this.fullName = 'John Doe'
      }
    },
    watch: {
      question: function (newQuestion) {
        this.answer = 'Waiting for you to stop typing...'
        this.getAnswer()
      },
      firstName: function (val) {
        this.fullName = val + ' ' + this.lastName
      },
      lastName: function (val) {
        this.fullName = this.firstName + ' ' + val
      }
    }
  }
</script>
<style>
  div {
    text-align: left;
    color: #00b2ff;
  }
  .header {
    text-align: left;
    background-color: #00b2ff;
    color: yellow;
    font-weight: bold;
    font-size: 15px;
  }
  .body {
    font-size: 14px;
    border: 1px solid #00b2ff;
    padding: 10px;
  }
</style>
