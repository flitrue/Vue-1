<template>
  <div>
    <div class="header">Template Syntax - Filters</div>
    <div class="body">
      {{ message | capitalize('33', '44', '55') | filterA }}
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        message: 'i am tempalteSyntax.vue'
      }
    },
    filters: {
      capitalize: function (value, arg1, arg2, arg3) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1) + arg1 + arg2 + arg3
      },
      filterA: function (value) {
        return value.toUpperCase()
      }
    }
  }
</script>
<style>
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
  }
</style>
