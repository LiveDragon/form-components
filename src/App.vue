<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-23 15:08:31
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-29 13:56:37
-->
<template>
  <div id="app">
    <comForm ref="searcForm" :formIpt="searchIpt" :formRule="searchRule" :searchFunc="searchFunc"  />
    
    <el-dialog
    width="60%"
    :title="dialogInfo.title"
    :visible.sync="dialogInfo.dialogFlag"
    :destroy-on-close="true"
    @close="closeDialog"
    >
      <comForm v-if="dialogInfo.dialogFlag" ref="testForm" :formIpt="formIpt" :formRule="formRule" :fromClass="fromClass" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
      <!-- <el-button @click="btnClick" type="primary">主要按钮</el-button> -->
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
      searchIpt: [
        {
          type: "Input",
          models: "",
          label: '查询条件1',
          ruleProp: '',
          placeholder: "我是查询条件1",
          clearable: true,
        },
        {
          type: "Input",
          models: "",
          label: '查询条件2',
          ruleProp: '',
          placeholder: "我是查询条件1",
          clearable: true,
        },
        {
          type: "Input",
          models: "",
          label: '查询条件3',
          ruleProp: '',
          placeholder: "我是查询条件1",
          clearable: true,
        },
        {
          type: "DatePicker",
          mold: "datetime",
          models: "",
          label: '查询条件4',
          ruleProp: '',
          placeholder: "我是查询条件4",
          clearable: true,
        },
      ],
      searchRule: {
        model: {},
        refName: 'searcForm',
        rule: {}
      },
      formIpt: [
        {
          type: "Input",
          models: "",
          label: '文本框',
          ruleProp: 'label1',
          placeholder: "我是默认值",
          clearable: true,
          focus: this.focus,
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
          change: this.change,
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
          action: "上传文件接口地址",
          handleBeforeUpload: this.handleBeforeUpload,
          handleSuccess: this.handleSuccess,
          handleError: this.handleError,
        },
        {
          type: "Editor",
          models: "",
          label: '富文本编辑器',
          ruleProp: 'label88',
          action: "上传文件接口地址",
          span: 24
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
            { required: true, message: '请输入富文本编辑器内容', trigger: 'change' },
            //  { required: true, validator: valiVal, trigger: 'change' }
          ]
        }
      },
      fromClass: {
        isColumn: true
      },
      searchFunc: {
        // 查询方法
        query: this.query,
        reset: this.reset,
        add: this.add,
        queryText: '搜索',
        resetText: '重置',
        addText: '新增',
      },
      dialogInfo: {
        dialogFlag: false,
        title: '',
        type: ''
      },
    }
  },
  methods: {
    focus() {
      console.log('---------------------------','获得焦点')
    },
    change() {
      console.log('---------------------------','下拉框')
    },
    handleBeforeUpload(file) {
      console.log(file)
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
    },
    handleError(err, file, fileList) {
      console.log(err)
      console.log(file)
      console.log(fileList)
    },
    dialogConfirm() {
      console.log(this.$refs.testForm.$refs.testForm)
      // this.$refs.testForm.$refs.testForm.validate()
     this.$refs.testForm.$refs.testForm.validate((valid) => {
          if (valid) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.dialogInfo.dialogFlag = false
          }
        })
    },
    query() {
      console.log('查询')
    },
    reset() {
      console.log('重置')
    },
    add() {
      console.log('新增')
      this.dialogInfo.title = '新增'
      this.dialogInfo.dialogFlag = true
    },
    closeDialog() {
      this.dialogInfo.dialogFlag = false
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
