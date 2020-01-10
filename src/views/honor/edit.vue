<template>
  <div class="app-container">
    <el-form ref="form" :model="honor" label-width="80px">
      <el-form-item label="荣誉标题">
        <el-input v-model="honor.name" />
      </el-form-item>
      <el-form-item label="缩略图">
        <!--        <el-upload-->
        <!--          class="upload-demo"-->
        <!--          :on-preview="handlePreview"-->
        <!--          :on-remove="handleRemove"-->
        <!--          action="action"-->
        <!--          :before-remove="beforeRemove"-->
        <!--          :http-request="uploadFile"-->
        <!--          :limit="1"-->
        <!--          :on-exceed="handleExceed"-->
        <!--          :file-list="fileList"-->
        <!--          list-type="picture"-->
        <!--        >-->
        <!--          <el-button size="small" type="primary">点击上传</el-button>-->
        <!--          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        <!--        </el-upload>-->
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="uploadFile"
        >
          <img v-if="honor.icon" :src="honor.icon" class="avatar" style="width: 200px;height: 200px">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="荣誉内容">
        <quill-editor
          ref="QuillEditor"
          v-model="content"
          class="ql-editor"
          :options="editorOption"
        />
      </el-form-item>
      <el-form-item label="荣誉简介">
        <el-input v-model="honor.content" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">修改</el-button>
      </el-form-item>
      <el-upload
        class="upload-demo"
        action="#"
        :file-list="imgList"
        :http-request="uploadFile2"
        style="display: none"
      >
        <el-button id="uploadImg" size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form>
  </div>
</template>

<script>
import * as upload from '@/api/upload'
import * as api from '@/api/honor'
import quill from '@/assets/config/quill'
const toolbarOptions = quill.toolbarOptions

export default {
  name: 'Add',
  data() {
    const _this = this
    return {
      honor: {
        org: '',
        title: '',
        icon: '',
        content: '',
        videos: '',
        images: [],
        richText: ''
      },
      id: 1,
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
  mounted() {
    const id = this.$route.query.id
    this.id = id
    this.getHonor()
  },
  activated() {
    const id = this.$route.query.id
    this.id = id
    this.getHonor()
  },
  methods: {
    getHonor() {
      api.getHonor(this.id).then(res => {
        console.log(res)
        this.honor = res.data
        this.content = res.data.richText
      })
    },
    handleSuccess(res) {
      // 获取富文本组件实例
      const quill = this.$refs.QuillEditor.quill
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        const length = quill.getSelection().index
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res)
        // 调整光标到最后
        quill.setSelection(length + 1)
        const { honor } = this
        honor.images.push(res)
        this.honor = honor
        this.$message.success('插入图片成功')
      } else {
        // 提示信息，需引入Message
        this.$message.error('图片插入失败')
      }
      console.log('success', res)
    },
    handleSubmit() {
      this.activity.richText = this.content
      api.editHonor(this.honor).then(res => {
        this.$message.success('修改成功')
      })
    },
    selectImg() {
      document.getElementById('uploadImg').click()
    },
    uploadFile: function(param) { // 上传的函数
      console.log('上传图片')
      console.log(this.fileList)
      const formData = new FormData()
      formData.append('file', param.file)
      console.log(formData)
      upload.uploadImage(formData).then(res => {
        this.$message.success('上传成功')
        this.honor.icon = res.data
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
