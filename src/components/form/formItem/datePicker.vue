<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-23 17:58:13
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-28 13:38:53
-->
<template>
  <div class="item-datePicker">
    <el-date-picker
        v-if="mold === 'datetime' || mold === 'date' || mold === 'week'|| mold === 'month'|| mold === 'year'"
        :type="mold"
        v-bind="$attrs"
        v-model="Val"
        :format="format?format:'yyyy-MM-dd'"
        :value-format="valueFormat?valueFormat:'yyyy-MM-dd'"
        @blur="blur?blur():none()"
        @focus="focus?focus():none()"
        @change="change?change():none()">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'Input',
  data() {
      return {
          Val: 'sfdgsfd'
      }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    mold: {
        type: String,
        default: () => 'date'
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
    },
    clear: {
      type: Function,
    },
    format: {
        type: String,
    },
    valueFormat: {
        type: String,
    }
  },
  watch: {
      Val: function (newVal) {
          if(!newVal) {
              this.Val = ''
          }
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
  }
}
</script>


<style scoped lang="scss">
</style>
