<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-23 16:49:59
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-28 18:17:49
-->
<template>
  <div class="item-select">
    <el-select
        v-bind="$attrs" 
        v-model="Val"
        @clear="clear?clear():none()" 
        @blur="blur?blur():none()"
        @focus="focus?focus():none()"
        @change="selectChange()"
    >
    <el-option 
        v-for="(items,index) in option" 
        :key='index'
        :label="items.label" 
        :value="items.value"
        :disabled="items.disabled">
        </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data() {
      return {
          Val: ''
      }
  },
  props: {
    blur: {
      type: Function,
      default: () => () => {}
    },
    focus: {
      type: Function,
      default: () => () => {}
    },
    ruleProp: {
      type: String,
      default: () => ''
    },
    change: {
      type: Function,
      default: () => () => {}
    },
    clear: {
      type: Function,
      default: () => () => {}
    },
    option: {
      type: Array,
      default: () => []
    }
  },
  watch: {
      Val: function (newVal) {
          this.$emit('update:value',newVal)
      },
  },
  methods: {
    none () {
      return false
    },
    async selectChange() {
      await this.change()
      this.$emit('resetItemValidate',this.ruleProp)
    }
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
