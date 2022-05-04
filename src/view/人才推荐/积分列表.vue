<template>
  <div>
    <div class="main-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item> -->
        <el-breadcrumb-item>积分管理</el-breadcrumb-item>
        <el-breadcrumb-item>积分列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <div>
        <el-button @click="reasonListDialog = true">抵扣种类</el-button>
        <el-button @click="addBlockDrawer = true">抵扣积分</el-button>
        <el-button @click="integralSettingDialog = true">加分设置</el-button>
      </div> -->
    </div>

    <!-- <v-bulk-registration @onSubmit="listUsers()"></v-bulk-registration> -->
    <el-card style="margin-top: 10px">
      <div class="g-search-box">
        <div class="g-search">
          <el-input
            v-model.trim="filters.userName"
            placeholder="输入员工姓名搜索"
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
          <el-button @click="reasonListDialog = true">抵扣种类</el-button>
          <el-button @click="addBlockDrawer = true">抵扣积分</el-button>
          <el-button @click="integralSettingDialog = true">加分设置</el-button>
        </div>
      </div>
      <el-table
        :data="allPointList | pagination(filters.pageIndex, filters.pageSize)"
        stripe
        :default-sort="{ prop: 'id', order: 'ascending' }"
        style="width: 100%"
        :height="tableHeight"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- <el-table-column
          prop="id"
          label="id1"
          sortable
          width="100">
        </el-table-column> -->
        <!-- <el-table-column
          prop="userId"
          label="推荐人编号"
          fit>
        </el-table-column> -->
        <el-table-column prop="name" label="员工姓名" fit> </el-table-column>
        <el-table-column prop="phone" label="手机号" fit> </el-table-column>
        <el-table-column
          prop="pointsNum"
          label="积分值"
          show-overflow-tooltip
          fit
        >
          <template slot-scope="scope">
            <span v-if="scope.row.changeType == 1">{{
              scope.row.pointsNum
            }}</span>
            <span v-if="scope.row.changeType == 0" style="color: red">{{
              -scope.row.pointsNum
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="变动原因" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.eventType == 1">HR初审通过</span>
            <span v-if="scope.row.eventType == 2">面试通过</span>
            <span v-if="scope.row.eventType == 3">确认入职</span>
            <span v-if="scope.row.eventType == 7">{{
              scope.row.reasonName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="eventTime"
          label="事项时间"
          sortable
          show-overflow-tooltip
          fit
        >
        </el-table-column>
        <!-- <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
            @click="deleUser(scope.row)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column> -->
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
      <!-- <div style="margin: 20px 0 20px 0;float: left">
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
      </div> -->
    </el-card>
    <!-- 批量导入 -->
    <el-dialog
      title="积分设置"
      :visible.sync="integralSettingDialog"
      :close-on-click-modal="false"
      width="650px"
      center
      top="3%"
      append-to-body
    >
      <v-integral-setting
        v-if="integralSettingDialog"
        @closeDialog="integralSettingDialog = false"
        @init="getPointsList"
      ></v-integral-setting>
    </el-dialog>
    <!-- 类型管理 -->
    <el-drawer
      title="抵扣种类管理"
      :visible.sync="reasonListDialog"
      direction="rtl"
      size="600px"
      :show-close="false"
      center
      top="3%"
      @close="getPointsList"
    >
      <v-add-reason-type
        v-if="reasonListDialog"
        @closeDialog="reasonListDialog = false"
        @init="getPointsList()"
      ></v-add-reason-type>
    </el-drawer>
    <el-drawer
      title="积分抵扣"
      :visible.sync="addBlockDrawer"
      direction="rtl"
      size="600px"
      :show-close="false"
      center
      top="3%"
    >
      <v-set-point
        v-if="addBlockDrawer"
        @closeDialog="addBlockDrawer = false"
        @init="getPointsList()"
      ></v-set-point>
    </el-drawer>
  </div>
</template>

<script>
import * as getData from "../../service/getData";
export default {
  data() {
    return {
      users: [],
      roles: [],
      dialogFormVisible: false,
      selectedUser: [],
      selectedRolesIds: [],
      resetPasswordDialog: false,
      password: "",
      allPointList: [],
      integralSettingDialog: false,
      reasonListDialog: false,
      addBlockDrawer: false,
      filters: {
        pageIndex: 1,
        pageSize: 10,
        total: 10,
        userName: "",
      },
    };
  },
  created() {
    // this.listUsers()
    this.getPointsList();
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 280;
    },
  },
  methods: {
    listUsers() {
      console.log("8888");
      getData.userList().then((resp) => {
        if (resp && resp.data.code === 200) {
          this.list = resp.data.data;
        }
      });
    },
    getPointsList() {
      getData.pointsList().then((resp) => {
        if (resp && resp.data.code === 200) {
          this.allPointList = resp.data.data;
          this.oldAllPointList = resp.data.data;
          this.filters.total = this.allPointList.length || 0;
        }
      });
    },
    search() {
      console.log(5555);
      let floorListInit = this.oldAllPointList.filter((items) => {
        //筛选场地名产权所属企业
        if (this.filters.userName) {
          return items.name.indexOf(this.filters.userName) !== -1;
        } else {
          return items;
        }
      });
      console.log(floorListInit);
      this.allPointList = floorListInit;
      this.filters.pageIndex = 1;
      this.filters.total = this.allPointList.length;
    },
    handleSizeChange(val) {
      this.filters.pageIndex = 1;
      this.filters.pageSize = val;
    },
    handleCurrentChange(val) {
      this.filters.pageIndex = val;
    },
    commitStatusChange(value, user) {
      if (user.username !== "admin") {
        getData
          .statusUpdate({
            enabled: value,
            username: user.username,
          })
          .then((resp) => {
            if (resp && resp.data.code === 200) {
              if (value) {
                this.$message("用户 [" + user.username + "] 已启用");
              } else {
                this.$message("用户 [" + user.username + "] 已禁用");
              }
            }
          });
      } else {
        user.enabled = true;
        this.$alert("不能禁用管理员账户");
      }
    },
    onSubmit(user) {
      let _this = this;
      // 根据视图绑定的角色 id 向后端传送角色信息
      let roles = [];
      for (let i = 0; i < _this.selectedRolesIds.length; i++) {
        for (let j = 0; j < _this.roles.length; j++) {
          if (_this.selectedRolesIds[i] === _this.roles[j].id) {
            roles.push(_this.roles[j]);
          }
        }
      }
      this.$axios
        .put("/admin/user", {
          username: user.username,
          name: user.name,
          phone: user.phone,
          email: user.email,
          roles: roles,
        })
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            this.$alert("用户信息修改成功");
            this.dialogFormVisible = false;
            // 修改角色后重新请求用户信息，实现视图更新
            this.listUsers();
          } else {
            this.$alert(resp.data.message);
          }
        });
    },
    editUser(user) {
      this.dialogFormVisible = true;
      this.selectedUser = user;
      let roleIds = [];
      if (user.roles) {
        for (let i = 0; i < user.roles.length; i++) {
          roleIds.push(user.roles[i].id);
        }
      }
      this.selectedRolesIds = roleIds;
    },
    deleUser(row) {
      console.log(row);
      getData.deleUser(row.pointsId).then((res) => {
        if (res.data.code === 200) {
          this.$alert("删除成功");
          this.listUsers();
        }
      });
    },
    resetPassword(username) {
      this.resetPasswordDialog = true;
      this.password = "";
      // this.$axios.put('/admin/user/password', {
      //   username: username
      // }).then(resp => {
      //   if (resp && resp.data.code === 200) {
      //     this.$alert('密码已重置为 123')
      //   }
      // })
    },
    definePassword() {
      getData
        .resetPassword({
          username: this.selectedUser.username,
          password: this.password,
        })
        .then((res) => {
          if (res && res.data.code === 200) {
            this.$alert("密码已重置成功");
          }
        });
    },
  },
  filters: {
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

<style scoped>
.main-box {
  margin: 18px 18px 0px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
