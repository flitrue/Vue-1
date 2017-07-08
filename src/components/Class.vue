<template>
  <div v-bind:class="classObject">I am class example
    <div>
      <div class="topdiv" @click="clickEvent()">
      </div>
      <ul>
        <li v-for="(value,key,index) in object">
          {{index}}:{{ value }}-{{key}}
        </li>
      </ul>
      <span v-for="n of 10">{{n}}</span>
      <li v-for="n in evenNumbers">{{ n }}</li>
    </div>
    <div>
      <my-component></my-component>
      <child1 my-message="I am  harry"></child1>
      <input type="text" v-model="parentmsg">
      <auto-child v-bind:auto-msg = 'parentmsg'></auto-child>
    </div>
  </div>
</template>
<style scoped>
  .active {
    background-color: yellow;
  }
  .text-danger {
    color: red
  }
  .topdiv {
    width: 100%;
    height: auto;
    top: 10px;
    position: absolute;
    background-color: transparent;
  }
</style>
<script>
export default {
  data () {
    return {
      classObject: {
        'active': true,
        'text-danger': true
      },
      parentmsg: '',
      object: {
        FirstName: 'John',
        LastName: 'Doe',
        Age: 30
      },
      numbers: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    evenNumbers: function () {
      return this.numbers.filter(function (number) {
        return number % 2 === 0
      })
    }
  },
  methods: {
    clickEvent () {
      alert(124)
    }
  }
}
</script>
