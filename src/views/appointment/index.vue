<template>
  <div class="app-container">
    <el-table
      :data="list"
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
        label="姓名"
      />
      <el-table-column
        prop="age"
        label="年龄"
      />
      <el-table-column
        prop="tel"
        label="联系方式"
      />
      <el-table-column
        prop="time"
        label="时间"
      />
      <el-table-column
        prop="status"
        label="状态"
      />
      <el-table-column
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleUpdate(scope.row._id,scope.$index)">修改状态</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-input v-model="status" autocomplete="off" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addAppointment, delAppointment, editAppointment } from '@/api/appointment'
export default {
  name: 'Index',
  data() {
    return {
      list: [

      ],
      dialogFormVisible: false,
      appointment: {},
      status: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    addAppointment() {
      const data = {
        org: 'test',
        name: 'zhuyilong',
        age: '5',
        tel: '15115321532',
        time: '周六上午',
        status: ''
      }
      addAppointment(data).then(res => {})
    },
    getList() {
      getList().then(res => {
        this.list = res.data
      })
    },
    handleDelete(id) {
      this.$confirm('是否删除该预约？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delAppointment(id).then(res => {
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
    },
    handleUpdate(id, index) {
      this.dialogFormVisible = true
      const { list } = this
      this.appointment = list[index]
      this.status = list[index].status
    },
    handleSubmit() {
      this.appointment.status = this.status
      editAppointment(this.appointment).then(res => {
        this.$message.success('修改成功')
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style scoped>

</style>
t
