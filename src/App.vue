<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-23 15:08:31
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-28 11:39:38
-->
<template>
  <div id="app">
    <comForm ref="testForm" :formIpt="formIpt" :formRule="formRule" :fromClass="fromClass"  />
      <el-button @click="btnClick" type="primary">主要按钮</el-button>
  </div>
</template>

<script>
import comForm from './components/form/form.vue'
export default {
  name: 'App',
  components: {
    comForm
  },
  data() {
    const valiVal = (rule, value, callback) => {
      console.log(value)
      if(!value) {
        callback('请选择日期')
      } else {
        callback()
      }
    }
    return {
      Val: '',
      formIpt: [
        {
          type: "Input",
          models: "",
          label: '文本框',
          ruleProp: 'label1',
          placeholder: "我是默认值",
          clearable: true,
          blur: this.blur,
        },
        {
          type: "Select",
          models: "",
          label: '下拉框',
          ruleProp: 'label2',
          placeholder: "我是下拉框",
          clearable: true,
          option: [
            {
              label: '选项1',
              value: '1'
            }
          ],
          blur: this.blur,
        },
        {
          type: "DatePicker",
          mold: "datetime",
          models: "",
          label: '日期选择器',
          ruleProp: 'label3',
          placeholder: "我是日期选择器",
          clearable: true,
          blur: this.blur,
        },
        {
          type: "Upload",
          models: "",
          label: '文件上传',
          ruleProp: 'label5',
          action: "你的上传文件接口/uploadFormData",
          // action: "http://180.101.236.58:9071/ht/policy/upload",
          handleBeforeUpload: this.handleBeforeUpload,
          handleSuccess: this.handleSuccess,
          handleError: this.handleError,
        },
        {
          type: "Editor",
          models: "<p>测试原始数据</p>",
          label: '富文本编辑器',
          ruleProp: 'label88',
          action: "你的上传文件接口/uploadFormData",
          // action: "http://180.101.236.58:9071/ht/policy/upload",
          handleBeforeUpload: this.handleBeforeUpload,
          handleSuccess: this.handleSuccess,
          handleError: this.handleError,
        },
      ],
      formRule: {
        model: {
          label1: '',
          label2: '',
          label3: '',
          label5: '',
          label88: '',
        },
        refName: 'testForm',
        rule: {
          label1: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          label3d: [
            { required: true, validator: valiVal, trigger: 'change' }
          ],
          label5: [
            { required: true, message: '请上传文件', trigger: 'change' }
          ],
          label2: [
            { required: true, message: '请选择内容', trigger: 'blur' }
          ],
          label3: [
            { required: true, message: '请选择内容', trigger: 'blur' }
          ],
          label88: [
            { required: true, message: '请选择输入富文本编辑器内容', trigger: 'change' }
          ]
        }
      },
      fromClass: {
        isColumn: false
      }
    }
  },
  methods: {
    blur() {
      console.log('==============================')
    },
    handleBeforeUpload(file) {
      console.log(file)
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      this.formIpt[3].models = "你的上传文件接口/" + response.data
      // this.$nextTick(() => {
      //   this.$refs.testForm.$refs.testForm.validateField('label5')
      // })
      
      // setTimeout(() => {
      //   this.formIpt[3].models = ''
      // },2000)
    },
    handleError(err, file, fileList) {
      console.log(err)
      console.log(file)
      console.log(fileList)
    },
    btnClick() {
      console.log(this.$refs.testForm.$refs.testForm)
      this.$refs.testForm.$refs.testForm.validate()
      // this.$refs[this.$props.formRule.refName].validate((valid) => {
      //     if (valid) {
      //       func()
      //     }
      //   })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
