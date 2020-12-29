<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-23 15:17:37
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-29 11:18:10
-->
<template>
  <div class="item-input">
    <el-input
        v-bind="$attrs" 
        v-model="Val" 
        @blur="blur?blur():none()"
        @focus="focus?focus():none()"
        @change="change?change():none()"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: 'Input',
  data() {
      return {
          Val: ''
      }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    blur: {
      type: Function,
      default: () => () => {}
    },
    focus: {
      type: Function,
      default: () => () => {}
    },
    change: {
      type: Function,
      default: () => () => {}
    }
  },
  watch: {
      Val: function (newVal) {
          this.$emit('update:value',newVal)
      },
  },
  created() {
    this.Val = this.value
  },
  updated() {
    this.Val = this.value
  },
  methods: {
    none () {
      return false
    },
    // blur() {
    //     console.log(7777)
    // }
  }
}
</script>


<style scoped lang="scss">
</style>
