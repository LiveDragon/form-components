<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-23 15:16:55
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-29 11:54:04
-->
<template>
    <el-form
      class="form"
      :validate-on-rule-change='false'
      :model="formRule.model?formRule.model:''"
      :rules="formRule.rule"
      :inline="true"
      :ref="formRule.refName">
      <div :class="[fromClass.isColumn ? 'column-form' : 'search-form']">
        <el-form-item
          v-for="(item, index) in formIpt"
          :style="{'width': getWidth(item.span, fromClass.isColumn), 'margin-right': '0'}"
          :label-width="item.labelWidth ? item.labelWidth : '120px'"
          :label="item.label"
          :key="index"
          :prop="item.ruleProp">
          <component :is="item.type" v-bind="item" :value.sync="item.models" @resetItemValidate="resetItemValidate"></component>
        </el-form-item>
      </div>
      <el-form-item :class="fromClass.searchButtom" v-if="searchFunc">
        <el-button type="primary" :size="fromClass.formSize || 'small'" @click="query(searchFunc.query)">
          {{searchFunc.queryText}}
        </el-button>
        <el-button :size="fromClass.formSize || 'small'" @click="reset(searchFunc.reset)">
          {{searchFunc.resetText}}
        </el-button>
        <el-button type="success" v-if="searchFunc.add" :size="fromClass.formSize || 'small'" @click="func(searchFunc.add)">
          {{searchFunc.addText}}
        </el-button>
      </el-form-item>
</el-form>
</template>

<script>
import Input from "./formItem/input";
import Select from "./formItem/select";
import DatePicker from "./formItem/datePicker";
import Upload from "./formItem/upload";
import Editor from "./formItem/editor";

const CompFormItem = {
  components: {
    Input,
    Select,
    DatePicker,
    Upload,
    Editor,
  },
  name: "FormItem",
  props: {
    formItem: {
      required: true
    }
  },
  render(h) {
    return h(`${this.formItem.type}`);
    // return h(`${this.formItem.type}`, {
    //   props: {
    //     ...(this.formItem.props || {})
    //   },
    //   attrs: {
    //     ...(this.formItem.props || {})
    //   }
    // });
  }
};

export default {
  name: "Form",
  components: {
    Input,
    Select,
    DatePicker,
    Upload,
    Editor,
    CompFormItem
  },
  props: {
    formIpt: {
      type: Array,
      required: true,
      default: () => []
    },
    formRule: {
      type: Object,
      required: false,
      default: () => {}
    },
    searchFunc: {
      type: Object,
      required: false
    },
    fromClass: {
      type: Object,
      required: false,
      default: () => {
        return {
          isColumn: false,
          searchButtom: 'search-form-btn',
        }
      }
    },
  },
  watch: {
    'formIpt': {
      handler(newValue) {
        this.initFormRule(newValue)
      },
      deep: true
    }
  },
  created () {
    this.initFormRule(this.formIpt)
  },
  methods: {
    getWidth(span, isColumn = false) {
      if(!isColumn && !span) { //搜索表单 未设置span 默认一行三个搜索条件
        span = 8
      } else if(isColumn && !span) { //编辑表单 未设置span 默认一行展示两个
        span = 12
      }
      span = span > 24 ? 24 : span
      let width =  `${Number((span / 24)*100).toFixed(1)}%`
      return width
    },
    initFormRule (newValue) {
        console.log(newValue)
      for (let k = 0; k < newValue.length; k++) {
        this.$props.formRule.model[newValue[k].ruleProp] = newValue[k].models
      }
    },
    formResetFields () {
      this.$refs[this.$props.formRule.refName].resetFields()
    },
    resetItemValidate(name) {
      console.log(name)
      this.$nextTick(() => {
        this.$refs[this.formRule.refName].validateField(name)
      })
    },
    query (func) {
      if (this.$props.formRule.rule !== '{}') {
        this.$refs[this.$props.formRule.refName].validate((valid) => {
          if (valid) {
            func()
          }
        })
      } else {
        func()
      }
    },
    reset (fn) {
      this.$props.formIpt.forEach(item => {
        item.models = ''
      })
      console.log( this.$props.formIpt)
      if (fn) {
        fn()
      }
    },
    func (fn) {
      fn()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form{
  display: flex;
  .search-form{
    // width: 70%;
    width: calc(100% - 240px);
    display: flex;
    flex-wrap: wrap;
    // .el-form-item{
    //   width: 33%!important;
    // }
  }
  .el-form-item{
    /deep/.el-form-item__content{
      width: calc(100% - 120px);
      &>div{
        &>div{
          width: 100%;
        }
      }
    }
  }
  .search-form-btn{
    width: 240px;
    margin-right: 0;
    display: flex;
    align-items: flex-end;
    /deep/.el-form-item__content{
      width: 100%;
    }
  }
  .column-form {
    display: flex;
    width: 100%;
    align-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
