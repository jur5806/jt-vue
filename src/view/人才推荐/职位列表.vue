<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="ID"
        width="95"
      >
        <div slot-scope="scope">
          {{ scope.$index }}
        </div>
      </el-table-column>
      <el-table-column label="职位">
        <template slot-scope="scope">
          {{ scope.row.stationName }}
        </template>
      </el-table-column>
      <el-table-column label="地点">
        <template slot-scope="scope">
          {{ scope.row.workPlace }}
        </template>
      </el-table-column>
      <el-table-column label="学历要求" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.eductionClass }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所需人数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.rcDepartmentNum }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.departmentState }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="职位描述" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.rcDescribe }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as getData from '../../service/getData.js'
export default {
  components: {},
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {},
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.getRecruitList()
  },
  methods: {
    getRecruitList() {
      this.listLoading = true
      // this.$message({ message: 'success', type: 'success' })
      // this.$notify({
      //   title: 'Fail',
      //   message: 'Delete Successfully',
      //   type: 'success',
      //   duration: 2000
      // })
      getData.recruitList().then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          this.list = res.data.data
        } else {
          
        }
      })
      this.listLoading = false
    }
  },
}
</script>
<style scoped lang='sass'>
</style>
