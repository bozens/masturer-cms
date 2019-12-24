<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="编号"
        width="100"
      />
      <el-table-column
        prop="name"
        label="课程名称"
      />
      <el-table-column
        prop="grade"
        label="课程年龄"
      />
      <el-table-column
        prop="category"
        label="课程分类"
      />
      <el-table-column
        label="图片"
        prop="icon"
      >
        <template slot-scope="scope">
          <div class="img-list" style="display: flex">
            <img v-for="(item,index) in scope.row.images" :key="index" :src="item" width="70">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleClick(scope.row)">查看</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList, delLesson } from '../../api/lesson'

export default {
  name: 'LessonList',
  data() {
    return {
      tableData: []
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
      const loading = this.$loading()
      getList().then(res => {
        this.tableData = res.data
        loading.close()
      })
    },
    handleClick(item) {
      const id = item._id
      this.$router.push({ path: '/lesson/edit', query: { id }})
    },
    handleDelete(id) {
      this.$confirm('是否删除该文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delLesson(id).then(res => {
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

<style scoped>

</style>
t
