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
        label="名字"
      />
      <el-table-column
        label="头像"
        prop="icon"
      >
        <template slot-scope="scope">
          <img :src="scope.row.icon" width="70">
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
import { getList, delTeacher } from '@/api/teacher'
export default {
  name: 'Index',
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
        loading.close()
        this.tableData = res.data
      })
    },
    handleClick(item) {
      const id = item._id
      this.$router.push({ path: '/teacher/edit', query: { id }})
    },
    handleDelete(id) {
      this.$confirm('是否删除该老师信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTeacher(id).then(res => {
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
