<template>
  <div>
    <div class="header">过渡效果 单元素/组件的过渡</div>
    <div class="body">
      <button v-on:click="toggle1()">Toggle</button>
      <transition name="fade">
        <p v-show="show">{{hello}}</p>
      </transition>
    </div>
    <div class="header">过渡效果 CSS过渡</div>
    <div class="body">
      <button @click="show = !show">Toggle render</button>
      <transition name="slide-fade">
        <p v-if="show">hello</p>
      </transition>
    </div>
    <div class="header">过渡效果 CSS动画</div>
    <div class="body">
      <button @click="show = !show">Toggle show</button>
      <transition name="bounce">
        <p v-if="show">Look at me!</p>
      </transition>
    </div>
    <div class="header">过渡效果 自定义过渡类名</div>
    <div class="body">
      <button @click="show = !show">
        Toggle render
      </button>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated rotateIn"
        leave-active-class="animated rotateOut"
      >
        <p v-if="show">hello</p>
      </transition>
    </div>
    <div class="header">过渡效果 初始渲染的过渡 appear</div>
    <div class="body">
      <button @click="show5 = !show5">Toggle</button>
      <transition>
        <button v-if="show5" v-bind:key="isEditing">
          {{ isEditing ? 'Save' : 'Edit' }}
        </button>
      </transition>
    </div>
    <div class="header">过渡效果 多个元素的过渡</div>
    <div class="body">
      <button @click="show6 = !show6">Toggle</button>
      <transition>
        <button v-if="show6" v-bind:key="docState">
          {{ buttonMessage }}
        </button>
      </transition>
    </div>
    <div class="header">过渡效果 过渡模式</div>
    <div class="body">
      <button @click="show7 = !show7">Toggle</button>
      <transition name="fade" mode="out-in">
        <!-- ... the buttons ... -->
        <button v-if="show7" @click="show7 = !show7">{{onoff}}</button>
        <button v-if="!show7" @click="show7 = !show7">{{onoff}}</button>
      </transition>
    </div>
    <div class="header">过渡效果 多个组件的过渡</div>
    <div class="body">
      <button @click="view = view==='v-a'?'v-b':'v-a'">Toggle</button>
      <input type="radio" id="one" value="One" v-model="picked">
      <label @click="view='v-a'" for="one">A</label>
      <input type="radio" id="two" value="Two" v-model="picked">
      <label  @click="view='v-b'" for="two">B</label>
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="view"></component>
      </transition>
    </div>
    <div class="header">列表的进入和离开过渡</div>
    <div id="list-complete-demo" class="body">
      <button v-on:click="shuffle">Shuffle</button>
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <transition-group name="list-complete" tag="p">
        <span
          v-for="item in items"
          v-bind:key="item"
          class="list-complete-item"
        >
          {{ item }}
        </span>
      </transition-group>
    </div>
    <div id="flip-list-demo" class="demo">
      <button v-on:click="shuffle">Shuffle</button>
      <transition-group name="flip-list" tag="ul">
        <li v-for="item in items" v-bind:key="item">
          {{ item }}
        </li>
      </transition-group>
    </div>
    <div id="sudoku-demo" class="body demo">
    <h1>Lazy Sudoku</h1>
    <p>Keep hitting the shuffle button until you win.</p>
    <button @click="shuffle">
      Shuffle
    </button>
    <transition-group name="cell" tag="div" class="container">
      <div v-for="cell in cells" :key="cell.id" class="cell">
        {{ cell.number }}
      </div>
    </transition-group>
    <div class="header">列表渐近过渡</div>
    <div id="staggered-list-demo" class="body">
      <input v-model="query">
      <transition-group
        name="staggered-fade"
        tag="ul"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
        <li
          v-for="(item, index) in computedList"
          v-bind:key="item.msg"
          v-bind:data-index="index"
        >{{ item.msg }}</li>
      </transition-group>
    </div>

      <div class="header">动态过渡</div>
      <div id="dynamic-fade-demo" class="body">
        Fade In: <input type="range" v-model="fadeInDuration" min="0" max="100" v-bind:max="maxFadeDuration">
        <input type="range" class="secondRange" v-model="fadeOutDuration" min="0" v-bind:max="maxFadeDuration">
        <p>{{fadeInDuration}}</p>
        <!--<p>{{maxFadeDuration}}</p>-->
        <p>{{fadeOutDuration}}</p>
        <transition
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
        >
          <p v-if="show">hello</p>
        </transition>
        <button v-on:click="stop = true">Stop it!</button>
      </div>

  </div>
  </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import Velocity from 'velocity-animate'
//  require('velocity-animate')
  Vue.use(_)
  export default {
    data () {
      return {
        hello: '',
        show: true,
        show5: false,
        show6: false,
        show7: false,
        isEditing: false,
        Save: 'Save',
        Edit: 'Edit',
        docState: 'editing',
        view: 'v-a',
        picked: '',
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        nextNum: 10,
        cells: Array.apply(null, { length: 81 })
          .map(function (_, index) {
            return {
              id: index,
              number: index % 9 + 1
            }
          }),
        query: '',
        list: [
          { msg: 'Bruce Lee' },
          { msg: 'Jackie Chan' },
          { msg: 'Chuck Norris' },
          { msg: 'Jet Li' },
          { msg: 'Kung Fury' }
        ],
        fadeInDuration: 1000,
        fadeOutDuration: 1000,
        maxFadeDuration: 1500,
        stop: false
      }
    },
    components: {
      'v-a': {
        template: '<div>Component A</div>'
      },
      'v-b': {
        template: '<div>Component B</div>'
      }
    },
    computed: {
      buttonMessage: function () {
        switch (this.docState) {
          case 'saved': return 'Edit'
          case 'edited': return 'Save'
          case 'editing': return 'Cancel'
        }
      },
      onoff: function () {
        if (!this.show7) {
          return 'on'
        } else {
          return 'off'
        }
      },
      computedList: function () {
        var vm = this
        return this.list.filter(function (item) {
          return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
        })
      }
    },
    mounted: function () {
      this.show = false
    },
    methods: {
      toggle1: function () {
        this.show = !this.show
        this.hello = new Date()
      },
      randomIndex: function () {
        return Math.floor(Math.random() * this.items.length)
      },
      add: function () {
        this.items.splice(this.randomIndex(), 0, this.nextNum++)
      },
      remove: function () {
        this.items.splice(this.randomIndex(), 1)
      },
      setInter: function () {
        this.items = _.shuffle(this.items)
        this.cells = _.shuffle(this.cells)
      },
      shuffle: function () {
//        setInterval(() => {
//          this.setInter()
//          clearInterval()
//        }, 500)
      },
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
//      beforeEnter: function (el) {
//        el.style.opacity = 0
//        el.style.height = 0
//      },
//      enter: function (el, done) {
//        var delay = el.dataset.index * 150
//        setTimeout(function () {
//          Velocity(
//            el,
//            { opacity: 1, height: '1.6em' },
//            { complete: done }
//          )
//        }, delay)
//      },
//      leave: function (el, done) {
//        var delay = el.dataset.index * 150
//        setTimeout(function () {
//          Velocity(
//            el,
//            { opacity: 0.1, height: 0 },
//            { complete: done }
//          )
//        }, delay)
//      }
    }
  }
</script>

<style>
  .secondRange {
    margin-left: -6px;
    border-radius: 0px;
    color: yellow;
    width: 100px;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    width: 238px;
    margin-top: 10px;
  }
  .cell {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 25px;
    height: 25px;
    border: 1px solid #aaa;
    margin-right: -1px;
    margin-bottom: -1px;
  }
  .cell:nth-child(3n) {
    margin-right: 0;
  }
  .cell:nth-child(27n) {
    margin-bottom: 0;
  }
  .cell-move {
    transition: transform 1s;
  }

  .flip-list-move {
    transition: transform 1s;
  }
  .list-complete-item {
    transition: all .5s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter .list-complete-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-active {
    opacity: 0;
  }
  .custom-appear-class {
    opacity: 0
  }
  .custom-appear-active-class {
    transition: all .3s ease;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-out .5s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
