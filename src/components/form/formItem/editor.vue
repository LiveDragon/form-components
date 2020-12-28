<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-28 10:34:54
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-28 13:38:27
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
        Content: ''
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
    this.editor.config.uploadImgServer = this.action
    console.log(this.editor.config)
  },
   mounted () {
    this.editor.config.customUploadImg = async (files, insert) => {
      /* files 是 input 中选中的文件列表 */
      let formData = new FormData()
      formData.append('file', files[0])
      formData.append('type', 'image')
      let url = await this.getObjectURL(formData)
      /* eslint-disable */
      insert(`你的上传文件接口`)
    }
    this.editor.config.onchange = html => {
      this.Val = html
      this.$emit('resetItemValidate',this.ruleProp)
    }
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
    handleAvatarSuccess (type, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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
