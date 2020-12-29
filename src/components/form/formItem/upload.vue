<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-25 17:13:14
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-29 13:55:53
-->
<template>
  <div class="item-upload">
    <el-upload
      class="avatar-uploader"
      v-bind="$attrs" 
      :accept="accept"
      :action="action"
      :headers="headers"
      :data="data"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
      :on-progress="handleProgress"
      :on-success="successUpload"
      :on-error="handleError"
      :on-remove="handleRemove"
      >
        <img v-if="value&&value!==''" :src="value" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
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
    ruleProp: {
      type: String,
      default: () => ''
    },
    action: {
      type: String,
      default: () => ''
    },
    accept: {
      type: String,
      default: () => ''
    },
    headers: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {} 
    },
    handleSuccess: {
      type: Function,
      default: () => () => {}
    },
    handleBeforeUpload: {
      type: Function,
      default: () => () => {}
    },
    handleError: {
      type: Function,
      default: () => () => {}
    },
    handleRemove: {
      type: Function,
      default: () => () => {}
    },
    handleProgress: {
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
  methods: {
    none () {
      return false
    },
    async successUpload(response, file, fileList) {
      this.Val = response.data
      await this.handleSuccess(response, file, fileList)
      this.$emit('resetItemValidate',this.ruleProp)
    }
  }
}
</script>


<style scoped lang="scss">
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
