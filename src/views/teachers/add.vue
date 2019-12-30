<template>
  <div class="app-container">
    <el-form ref="form" :model="teacher" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="uploadFile"
        >
          <img v-if="teacher.icon" :src="teacher.icon" class="avatar" style="width: 200px;height: 200px">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="介绍">
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
import { addTeacher } from '@/api/teacher'
import quill from '@/assets/config/quill'
const toolbarOptions = quill.toolbarOptions

export default {
  name: 'Add',
  data() {
    const _this = this
    return {
      teacher: {
        org: '',
        name: '',
        icon: '',
        content: '',
        // 暂不需要
        videos: '',
        pictures: [],
        // 富文本
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
        const { teacher } = this
        teacher.images.push(res)
        this.teacher = teacher
      } else {
        // 提示信息，需引入Message
        this.$message.error('图片插入失败')
      }
    },
    handleSubmit() {
      this.teacher.richText = this.content
      console.log(this.teacher)
      addTeacher(this.teacher).then(res => {
        this.teacher = {
          org: '',
          name: '',
          icon: '',
          content: '',
          // 暂不需要
          videos: '',
          pictures: [],
          // 富文本
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
      console.log('上传图片')
      console.log(param)
      const formData = new FormData()
      formData.append('file', param.file)
      console.log(formData)
      upload.uploadImage(formData).then(res => {
        this.teacher.icon = res.data
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
