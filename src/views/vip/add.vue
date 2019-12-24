<template>
  <div class="app-container">
    <el-form ref="form" :model="vip" label-width="80px">
      <el-form-item label="名字">
        <el-input v-model="vip.name" />
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :http-request="uploadFile"
        >
          <img v-if="vip.image" :src="vip.image" class="avatar" style="width: 200px">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addVip } from '@/api/vip'
import * as upload from '@/api/upload'
export default {
  name: 'ArticleAdd',
  data() {
    return {
      vip: {
        name: '',
        image: '',
        content: '',
        org: '',
        male: ''
      }
    }
  },
  methods: {
    onSubmit() {
      addVip(this.vip).then(res => {
        this.$message.success('创建成功')
        this.vip = {
          name: '',
          image: '',
          content: '',
          org: '',
          male: ''
        }
      })
    },
    uploadFile: function(param) { // 上传的函数
      console.log('上传图片')
      console.log(param)
      const formData = new FormData()
      formData.append('file', param.file)
      console.log(formData)
      upload.uploadImage(formData).then(res => {
        this.vip.image = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
