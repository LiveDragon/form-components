<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-23 15:16:55
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-28 10:48:49
-->
<template>
  <div class="hello">
    <el-form
        :validate-on-rule-change='false'
        :model="formRule.model?formRule.model:''"
        :rules="formRule.rule"
        :inline="true"
        :ref="formRule.refName">
        <div :class="[fromClass.isColumn ? 'column-form' : 'search-form']">
            <el-form-item
                v-for="(item, index) in formIpt"
                :label="item.label"
                :key="index"
                :prop="item.ruleProp">
                <component :is="item.type" v-bind="item" :value.sync="item.models" @resetItemValidate="resetItemValidate"></component>
             </el-form-item>
        </div>
    </el-form>
  </div>
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
    return h(`${this.formItem.type}`, {
      props: {
        ...(this.formItem.props || {})
      },
      attrs: {
        ...(this.formItem.props || {})
      }
    });
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
    fromClass: {
      type: Object,
      required: false,
      default: () => {}
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
    initFormRule (newValue) {
        console.log(newValue)
      for (let k = 0; k < newValue.length; k++) {
        this.$props.formRule.model[newValue[k].ruleProp] = newValue[k].models
      }
    },
    resetItemValidate(name) {
      console.log(name)
      this.$refs[this.formRule.refName].validateField(name)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
