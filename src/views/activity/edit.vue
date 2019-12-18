<template>
  <div class="app-container">
    <el-form ref="form" :model="activity" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="activity.name" />
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="upload-demo"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          action="action"
          :before-remove="beforeRemove"
          :http-request="uploadFile"
          :on-exceed="handleExceed"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动内容">
        <quill-editor
          ref="QuillEditor"
          v-model="content"
          class="ql-editor"
          :options="editorOption"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
      <el-upload
        class="upload-demo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        action="#"
        :before-remove="beforeRemove"
        :file-list="imgList"
        :http-request="uploadFile2"
      >
        <el-button id="uploadImg" size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form>
  </div>
</template>

<script>
import * as upload from '@/api/upload'
import quill from '@/assets/config/quill'
const toolbarOptions = quill.toolbarOptions

export default {
  name: 'Add',
  data() {
    const _this = this
    return {
      activity: {
        org: '',
        name: '',
        icon: '',
        content: '',
        videos: '',
        images: '',
        richText: ''
      },
      content: '',
      fileList: [],
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
    onSubmit() {
      console.log('submit!')
    },
    handleSuccess(res) {
      // 获取富文本组件实例
      console.log('进行操作')
      const quill = this.$refs.QuillEditor.quill
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        const length = quill.getSelection().index
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res)
        // 调整光标到最后
        quill.setSelection(length + 1)
        const { activity } = this
        activity.imgUrl.push(res)
        this.activity = activity
      } else {
        // 提示信息，需引入Message
        this.$message.error('图片插入失败')
      }
      console.log('success', res)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
      upload.uploadImage(formData).then(function(res) {

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
