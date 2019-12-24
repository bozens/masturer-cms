<template>
  <div class="app-container">
    <el-form ref="form" :model="article" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title" />
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="uploadFile"
        >
          <img v-if="article.icon" :src="article.icon" class="avatar" style="width: 200px">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input v-model="article.content" type="textarea" :rows="8" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editArticle, getArticle } from '@/api/article'
import * as upload from '@/api/upload'
export default {
  name: 'ArticleEdit',
  data() {
    return {
      article: {
        title: '',
        icon: '',
        content: '',
        org: ''
      },
      content: ''
    }
  },
  mounted() {
    const id = this.$route.query.id
    this.id = id
    this.getArticle()
  },
  activated() {
    const id = this.$route.query.id
    this.id = id
    this.getArticle()
  },

  methods: {
    onSubmit() {
      editArticle(this.article).then(res => {
        this.$message.success('修改成功')
      })
    },
    getArticle() {
      getArticle(this.id).then(res => {
        this.article = res.data
      })
    },
    uploadFile: function(param) { // 上传的函数
      console.log('上传图片')
      console.log(param)
      const formData = new FormData()
      formData.append('file', param.file)
      console.log(formData)
      upload.uploadImage(formData).then(res => {
        this.article.icon = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
