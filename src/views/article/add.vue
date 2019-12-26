<template>
  <div class="app-container">
    <el-form ref="form" :model="activity" label-width="80px">
      <el-form-item label="文章名称">
        <el-input v-model="activity.title" />
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="uploadFile"
        >
          <img v-if="activity.icon" :src="activity.icon" class="avatar" style="width: 200px;height: 200px">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容">
        <quill-editor
          ref="QuillEditor"
          v-model="content"
          class="ql-editor"
          :options="editorOption"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
      <el-upload
        class="upload-demo"
        action="#"
        :file-list="imgList"
        :http-request="uploadFile2"
        style="display: none"
      >
        <el-button id="uploadImg" size="small" type="primary" style="display:none">点击上传</el-button>
      </el-upload>
    </el-form>
  </div>
</template>

<script>
import * as upload from '@/api/upload'
import { addArticle } from '@/api/article'
import quill from '@/assets/config/quill'
const toolbarOptions = quill.toolbarOptions
export default {
  name: 'Add',
  data() {
    const _this = this
    return {
      activity: {
        org: '',
        title: '',
        icon: '',
        content: '',
        images: [],
        richText: ''
      },
      content: '',
      imgList: [],
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function(item) {
                _this.selectImg()
                // document.getElementById('richImg').click()
              }
            }
          }
        }
      }
    }
  },
  methods: {
    handleSuccess(res) {
      const quill = this.$refs.QuillEditor.quill
      if (res) {
        const length = quill.getSelection().index
        quill.insertEmbed(length, 'image', res)
        quill.setSelection(length + 1)
        const { activity } = this
        activity.images.push(res)
        this.activity = activity
        this.$message.success('插入图片成功')
      } else {
        // 提示信息，需引入Message
        this.$message.error('图片插入失败')
      }
    },
    handleSubmit() {
      this.activity.richText = this.content
      addArticle(this.activity).then(res => {
        this.activity = {
          org: '',
          title: '',
          icon: '',
          content: '',
          images: [],
          richText: ''
        }
        this.$message.success('添加成功')
      })
    },
    selectImg() {
      document.getElementById('uploadImg').click()
    },
    uploadFile: function(param) { // 上传的函数
      const formData = new FormData()
      formData.append('file', param.file)
      upload.uploadImage(formData).then(res => {
        this.activity.icon = res.data
        this.$message.success('上传成功')
      })
    },
    uploadFile2: function(param) {
      const formData = new FormData()
      formData.append('file', param.file)
      upload.uploadImage(formData).then(res => {
        console.log('上传成功', res)
        this.handleSuccess(res.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
