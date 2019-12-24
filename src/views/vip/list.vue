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
          <el-button type="danger" size="small" @click="deleteVip(index)"> 删除</el-button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { getList } from '../../api/vip'
export default {
  name: 'List',
  data() {
    return {
      list: [
        { name: '老婆', image: 'http://192.168.2.80:5001/image/c0b6d178ddf3ce787c2e82ec6ee08138.jpg' },
        { name: '老婆', image: 'http://192.168.2.80:5001/image/c0b6d178ddf3ce787c2e82ec6ee08138.jpg' },
        { name: '老婆', image: 'http://192.168.2.80:5001/image/c0b6d178ddf3ce787c2e82ec6ee08138.jpg' }
      ]
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
        console.log(res)
      })
    },
    deleteVip(index) {

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
