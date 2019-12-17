<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="upload-demo"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          action="action"
          :before-remove="beforeRemove"
          :http-request="uploadFile"
          multiple
          :limit="1"
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
          ref="text"
          v-model="content"
          class="ql-editor"
          :options="editorOption"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
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
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      content: '',
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function(value) {
                if (value) {
                  alert('自定义图片')
                } else {
                  this.quill.format('image', false)
                }
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
    uploadFile: function(param) { // 上传的函数
      console.log('上传图片')
      console.log(param)
      const formData = new FormData()
      formData.append('file', param.file)
      console.log(formData)
      upload.uploadImage(formData).then(function(res) {
        console.log('res', res)
      })
    }
  }
}
</script>

<style scoped>

</style>
