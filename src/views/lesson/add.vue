<template>
  <div class="app-container">
    <el-form ref="form" :model="lesson" label-width="80px">
      <el-form-item label="课程名称">
        <el-input v-model="lesson.name" />
      </el-form-item>
      <el-form-item label="课程类别">
        <el-input v-model="lesson.category" />
      </el-form-item>
      <el-form-item label="课程年龄">
        <el-input v-model="lesson.grade" />
      </el-form-item>
      <el-form-item label="课程设置">
        <el-button size="small" type="primary" @click="selectImg1">点击上传</el-button>
        <div class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
        <div class="img-list">
          <div v-for="(item,index) in lesson.lessonSet" :key="index" class="img-item">
            <img :src="item" alt="">
            <el-button type="danger" size="small" @click="removeImage1(index)">删除</el-button>
          </div>
        </div>
        <el-upload
          class="upload-demo"
          action="#"
          :http-request="uploadImage1"
          style="display: none"
        >
          <el-button id="uploadImg1" size="small" type="primary" style="display:none">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="课程图片">
        <el-button size="small" type="primary" @click="selectImg">点击上传</el-button>
        <div class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
        <div class="img-list">
          <div v-for="(item,index) in lesson.images" :key="index" class="img-item">
            <img :src="item" alt="">
            <el-button type="danger" size="small" @click="removeImage(index)">删除</el-button>
          </div>
        </div>
        <el-upload
          class="upload-demo"
          action="#"
          :http-request="uploadImage"
          style="display: none"
        >
          <el-button id="uploadImg" size="small" type="primary" style="display:none">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="课程视频">
        <el-upload
          class="avatar-uploader"
          action="action"
          :on-progress="uploadVideoProcess"
          :on-success="handleVideoSuccess"
          :before-upload="beforeUploadVideo"
          :show-file-list="false"
          :http-request="uploadVideo"
        >
          <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过50MB</div>
          <video
            v-if="videoForm.showVideoPath !='' && !videoFlag"
            :src="videoForm.showVideoPath"
            class="avatar video-avatar"
            controls="controls"
            style="width: 400px"
          >
            您的浏览器不支持视频播放
          </video>
          <i
            v-else-if="videoForm.showVideoPath =='' && !videoFlag"
            class="el-icon-plus avatar-uploader-icon"
          />
          <el-progress
            v-if="videoFlag == true"
            type="circle"
            :percentage="videoUploadPercent"
            style="margin-top:7px;"
          />
        </el-upload>
      </el-form-item>
      <el-form-item label="课程介绍">
        <el-input v-model="lesson.content" type="textarea" :rows="8" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addLesson } from '@/api/lesson'
import * as upload from '@/api/upload'
export default {
  name: 'ArticleAdd',
  data() {
    return {
      lesson: {
        name: '',
        category: '',
        grade: '',
        content: '',
        images: [],
        lessonSet: [],
        videos: [],
        org: ''
      },
      videoFlag: false,
      // 是否显示进度条
      videoUploadPercent: '',
      // 进度条的进度，
      isShowUploadVideo: false,
      // 显示上传按钮
      videoForm: {
        showVideoPath: ''
      },
      content: ''
    }
  },
  methods: {
    onSubmit() {
      const { lesson } = this
      lesson.videos.push(this.videoForm.showVideoPath)
      addLesson(lesson).then(res => {
        this.$message.success('创建成功')
        this.article = {
          title: '',
          icon: '',
          content: '',
          org: ''
        }
      })
    },
    beforeUploadVideo(file) {
      const fileSize = file.size / 1024 / 1024 < 50
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) === -1) {
        this.$message.warning('请上传正确的视频格式')
        return false
      }
      if (!fileSize) {
        this.$message.warning('视频大小不能超过50MB')
        return false
      }
      this.isShowUploadVideo = false
    },
    // 进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0) * 1
    },
    selectImg() {
      if (this.lesson.images.length > 5) {
        this.$message.warning('最多只能添加五张')
        return
      }
      document.getElementById('uploadImg').click()
    },
    selectImg1() {
      if (this.lesson.lessonSet.length > 15) {
        this.$message.warning('最多只能添加十五张')
        return
      }
      document.getElementById('uploadImg1').click()
    },
    // 上传成功回调
    handleVideoSuccess(res) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0

      // 前台上传地址
      // if (file.status == 'success' ) {
      //    this.videoForm.showVideoPath = file.url;
      // } else {
      //     layer.msg("上传失败，请重新上传");
      // }

      // 后台上传地址
      if (res) {
        this.videoForm.showVideoPath = res.data
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
      }
    },
    uploadVideo: function(param) { // 上传的函数
      const formData = new FormData()
      formData.append('file', param.file)
      upload.uploadVideo(formData).then(res => {
        this.handleVideoSuccess(res)
      })
    },
    removeImage(index) {
      this.lesson.images.splice(index, 1)
      console.log(this.lesson)
    },
    removeImage1(index) {
      this.lesson.lessonSet.splice(index, 1)
    },
    uploadImage: function(param) { // 上传的函数
      const formData = new FormData()
      formData.append('file', param.file)
      upload.uploadVideo(formData).then(res => {
        this.lesson.images.push(res.data)
        this.$message.success('上传成功')
      })
    },
    uploadImage1: function(param) { // 上传的函数
      const formData = new FormData()
      formData.append('file', param.file)
      upload.uploadVideo(formData).then(res => {
        this.lesson.lessonSet.push(res.data)
        console.log('上传到lessonSet')
        this.$message.success('上传成功')
      })
    }
  }
}
</script>

<style scoped>
  .img-list{
    display:flex;
    height: 300px;
  }
  .img-list >.img-item{
    width: 200px;
    height: 200px;
  }
  .img-list .img-item img{
    width: 100%;
    height: 100%;
  }

</style>
