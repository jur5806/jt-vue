<template>
  <div class="app-container">
    <div class="filter-container"></div>
    <div class="g-search-box" style="background:#fff">
      <div class="g-search">
        <el-input
          v-model.trim="filters.userName"
          placeholder="输入职位名称进行搜索"
          @keyup.enter.native="search()"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
            @click="search()"
          ></i>
        </el-input>
      </div>
      <div class="top-btn">
        <el-button
          class="add-button"
          type="success"
          @click="$router.push('/index/NewPosition')"
          >新增职位</el-button
        >
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list | pagination(filters.pageIndex, filters.pageSize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :height="tableHeight"
    >
      <el-table-column align="center" label="ID" width="85">
        <div slot-scope="scope">
          {{ scope.$index }}
        </div>
      </el-table-column>
      <el-table-column label="职位">
        <template slot-scope="scope">
          {{ scope.row.stationName }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="职位描述">
        <template slot-scope="scope">
          {{ scope.row.rcDescribe }}
        </template>
      </el-table-column> -->
      <el-table-column label="学历要求" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.eductionClass == 1">初中以上</span>
          <span v-if="scope.row.eductionClass == 2">高中及中专以上</span>
          <span v-if="scope.row.eductionClass == 3">大专及以上</span>
          <span v-if="scope.row.eductionClass == 4">本科及以上</span>
          <span v-if="scope.row.eductionClass == 5">研究生及以上</span>
          <span v-if="scope.row.eductionClass == 6">不做要求</span>
        </template>
      </el-table-column>
      <el-table-column label="所需人数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.rcDepartmentNum }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="已投递简历数"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.departmentState | statusFilter">{{
            scope.row.departmentState
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="地点"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.workPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            style="margin: 5px 0"
            v-show="scope.row.enabled"
            type="mini"
            size="small"
            @click="commitStatusChange(scope.row.recruitId)"
            >使过期</el-button
          >
          <el-button
            style="margin: 5px 0"
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.recruitId)"
            >删除</el-button
          >
          <el-button
            style="margin: 5px 0"
            type="danger"
            size="mini"
            @click="goHrResume(scope.row)"
            >查看我收到的简历</el-button
          >
          <el-button style="margin: 5px 0" size="mini" @click="open1(scope.row)"
            >查看职位信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="filters.pageIndex"
          :page-size="filters.pageSize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="filters.total"
          style="float: right; margin-top: 0"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as getData from "../../service/getData.js";
export default {
  components: {},
  data() {
    return {
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
      },
      filters: {
        pageIndex: 1,
        pageSize: 10,
        total: 10,
        userName: "",
      },
      listOld: [],
    };
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 200;
    },
  },
  created() {
    this.getRecruitList();
  },
  methods: {
    open1(row) {
      this.$router.push({
        name: "detail",
        params: { recruitId: row.recruitId },
      });
    },
    getRecruitList() {
      this.listLoading = true;
      // this.$message({ message: 'success', type: 'success' })
      // this.$notify({
      //   title: 'Fail',
      //   message: 'Delete Successfully',
      //   type: 'success',
      //   duration: 2000
      // })
      const hrId = sessionStorage.getItem("userId");
      getData.hrPosition(hrId).then((res) => {
        if (res.data.code === 200) {
          console.log(res.data.data);
          this.list = res.data.data;
          this.listOld = res.data.data;
          this.filters.total = this.list.length;
        } else {
        }
      });
      this.listLoading = false;
    },
    search() {
      console.log(5555);
      let floorListInit = this.listOld.filter((items) => {
        //筛选场地名产权所属企业
        if (this.filters.userName) {
          return items.stationName.indexOf(this.filters.userName) !== -1;
        } else {
          return items;
        }
      });
      this.list = floorListInit;
      this.filters.pageIndex = 1;
      this.filters.total = this.list.length;
    },
    goHrResume(row) {
      this.$router.push({
        path: "/index/HrResume",
        query: { recruitId: row.recruitId, hrId: row.hrId },
      });
    },
    handleDelete(recruitId) {
      this.$confirm("确定要删除这个职位吗?", "warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await getData.deleRecruit(recruitId).then((res) => {
            if (res && res.data.code === 200) {
              this.getRecruitList();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    commitStatusChange(recruitId) {
      getData
        .recruitsUpdate({
          recruitId: recruitId,
        })
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            this.getRecruitList();
          }
        });
    },
    handleSizeChange(val) {
      this.filters.pageIndex = 1;
      this.filters.pageSize = val;
    },
    handleCurrentChange(val) {
      this.filters.pageIndex = val;
    },
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "success",
        1: "gray",
        2: "danger",
      };
      return statusMap[status];
    },
    pagination(array, pageNo, pageSize) {
      let offset = (pageNo - 1) * pageSize; //当前页第一条的索引
      let data =
        offset + pageSize >= array.length
          ? array.slice(offset, array.length)
          : array.slice(offset, offset + pageSize);
      return data;
    },
  },
};
</script>
<style scoped lang='scss'>
.filter-container {
  padding-bottom: 10px;
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}
</style>
