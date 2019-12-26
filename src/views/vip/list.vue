<template>
  <div class="app-container">
    <div class="list-box">
      <div v-for="(item,index) in list" :key="index" class="item">
        <div class="icon">
          <img :src="item.image" alt="">
        </div>
        <div class="name">
          {{ item.name }}
        </div>
        <div class="btn">
          <el-button type="danger" size="small" @click="deleteVip(item._id)"> 删除</el-button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { getList, delVip } from '@/api/vip'
export default {
  name: 'List',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getList()
  },
  activated() {
    this.getList()
  },
  methods: {
    getList() {
      getList().then(res => {
        this.list = res.data
      })
    },
    deleteVip(id) {
      this.$confirm('是否删除该照片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delVip(id).then(res => {
          if (res.code === 2000) {
            this.$message.success('删除成功')
          }
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>

<style scoped lang="scss">
  .list-box{
    .item{
      padding: 10px;
      border: 1px solid #eee;
      margin: 20px;
      float: left;
      width: 200px;
      height: 230px;
      border-radius: 10px;
      .icon{
        margin: 0 auto;
        width: 150px;
        height: 150px;
        img{
          width: 100%;
          border-radius: 10px;
          height: 100%;
        }
      }
      .name{
        margin: 5px 0;
        height: 20px;
        text-align: center;
      }
      .btn{
        width: 56px;
        margin: 0 auto;
      }
    }
  }

</style>
