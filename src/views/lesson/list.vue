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
        label="课程类型"
      />
      <el-table-column
        prop="name"
        label="课程名称"
      />
      <el-table-column
        prop="province"
        label="年龄段"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CourseList',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      course: {}
    }
  },
  methods: {
    handleClick(item) {
      this.course = item
    },
    handleDelete(index, item) {
    //  const id = item.id
      // 处理删除
    }
  }
}
</script>

<style scoped>

</style>
t
