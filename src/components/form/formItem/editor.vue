<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-28 10:34:54
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-29 13:56:18
-->
<template>
  <div class="item-input">
    <div id="editorElem" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
import { getImgUrl } from '@/api/upload'
export default {
  name: 'Input',
  data() {
      return {
        Val: '',
        editor: '',
        imageUrl: '',
        image: '',
      }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    action: {
      type: String,
      default: () => ''
    },
    ruleProp: {
      type: String,
      default: () => ''
    },
    menus: {
      type: Array,
    //   default: () =>  [
    //     'head', // 标题
    //     'bold', // 粗体
    //     'fontSize', // 字号
    //     'fontName', // 字体
    //     'italic', // 斜体
    //     'underline', // 下划线
    //     'strikeThrough', // 删除线
    //     'indent', // 缩进
    //     'lineHeight', //行高
    //     'foreColor', // 文字颜色
    //     'backColor', // 背景颜色
    //     'link', // 插入链接
    //     'list', // 列表
    //     'todo', //选择框
    //     'justify', // 对齐方式
    //     'quote', // 引用
    //     'emoticon', // 表情
    //     'image', // 插入图片
    //     'video', // 视频
    //     'table', // 表格
    //     'code', // 插入代码
    //     'splitLine', //分隔线
    //     'undo', // 撤销
    //     'redo', // 重复
    //   ]
    }
  },
  watch: {
      Val: function (newVal) {
          this.$emit('update:value',newVal)
      }
  },
  created() {
    this.Val = this.value
    this.editor = new E('#editorElem')
    if(this.menus) {
        this.editor.config.menus  = this.menus
    }
    //
    this.editor.config.uploadImgServer = this.action
    this.editor.config.uploadFileName = 'file'
    this.editor.config.uploadImgParams = {
        type: 'image',
    }
    console.log(this.editor.config)
  },
   mounted () {
    this.editor.config.uploadImgHooks = {
        // 上传图片之前
        before: function(xhr) {
            console.log(xhr)
            // 可阻止图片上传
            // return {
            //     prevent: true,
            //     msg: '需要提示给用户的错误信息'
            // }
        },
        // 图片上传并返回了结果，图片插入已成功
        success: function(xhr) {
            console.log('success', xhr)
        },
        // 图片上传并返回了结果，但图片插入时出错了
        fail: function(xhr, editor, resData) {
            console.log('fail', resData)
        },
        // 上传图片出错，一般为 http 请求的错误
        error: function(xhr, editor, resData) {
            console.log('error', xhr, resData)
        },
        // 上传图片超时
        timeout: function(xhr) {
            console.log('timeout', xhr)
        },
        // 图片上传并返回了结果，想要自己把图片插入到编辑器中
        // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
        customInsert: function(insertImgFn, result) {
            // result 即服务端返回的接口
            console.log('customInsert', result)

            // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
            insertImgFn(result.data)
        }
    }
    // this.editor.config.customUploadImg = async (files) => {
    //   /* files 是 input 中选中的文件列表 */
    //   let formData = new FormData()
    //   formData.append('file', files[0])
    //   formData.append('type', 'image')
    //   console.log(files)
    // //   let url = await this.getObjectURL(formData)
    //   /* eslint-disable */
    // //   insert(url)
    // }
    this.editor.config.onchange = html => {
      console.log(html)
      this.Val = html
      this.$emit('resetItemValidate',this.ruleProp)
    }
    // 取消自动 focus
    this.editor.config.focus = false
    this.editor.create()
    this.initEditor()
  },
  methods: {
    none () {
      return false
    },
    initEditor () {
      if (this.value !== '') {
        this.editor.txt.html(this.value)
      }
    },
    clearEditor () {
      this.editor.txt.html('')
    },
    getObjectURL (file) {
      return getImgUrl(file)
        .then(res => {
          console.log(res)
          return res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>


<style scoped lang="scss">
</style>
