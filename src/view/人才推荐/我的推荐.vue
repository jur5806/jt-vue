<!--
 * @Author: your name
 * @Date: 2021-04-24 19:21:15
 * @LastEditTime: 2022-05-20 11:02:25
 * @LastEditors: jt 2602818429@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \src\view\人才推荐\我的推荐.vue
-->
<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item> -->
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>我的推荐</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <div class="g-search-box">
        <div class="g-search">
          <el-input v-model.trim="filters.userName" placeholder="输入被推荐人姓名搜索" @keyup.enter.native="search()">
            <i slot="prefix" class="el-input__icon el-icon-search" @click="search()"></i>
          </el-input >
        </div>
      </div>
      <el-table
        :data="myList  | pagination(filters.pageIndex,filters.pageSize)"
        stripe
        :default-sort = "{prop: 'id', order: 'ascending'}"
        style="width: 100%"
        :height="tableHeight">
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column
          prop="recommendedName"
          label="姓名"
          fit>
        </el-table-column>
        <el-table-column
          prop="candidatesSex"
          label="受教育程度"
          fit>
           <template slot-scope="scope">
            <span v-if="scope.row.recommendedEducation === 1">大专以下</span>
            <span v-if="scope.row.recommendedEducation === 2">大专</span>
            <span v-if="scope.row.recommendedEducation === 3">本科</span>
            <span v-if="scope.row.recommendedEducation === 4">研究生</span>
            <span v-if="scope.row.recommendedEducation === 6">硕士</span>
          </template>
        </el-table-column>
        
        <el-table-column
          prop="recommendedTelephone"
          label="手机号"
          fit>
        </el-table-column>
        <el-table-column
          prop="recommendedEmail"
          label="邮箱"
          show-overflow-tooltip
          fit>
        </el-table-column>
        <el-table-column
          prop="examineType"
          label="简历审核状态"
          sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.approvalState == 0">待审核</span>
            <span v-if="scope.row.approvalState == 1">初审通过</span>
            <span v-if="scope.row.approvalState == 2">面试通过</span>
            <span v-if="scope.row.approvalState == 3">成功入职</span>
            <!-- <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(value) => commitStatusChange(value, scope.row)">
            </el-switch> -->
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click="editUser(scope.row)"
              type="text"
              size="small">
              取消审核
            </el-button>
            <el-button
            @click="resumetDel(scope.row)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24" class="toolbar">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="filters.pageIndex" :page-size="filters.pageSize"
            layout="total, prev, pager, next, sizes, jumper" :total="filters.total" style="float: right; margin-top: 0">
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as getData from '../../service/getData'
export default {
  data () {
    return {
      users: [],
      roles: [],
      dialogFormVisible: false,
      selectedUser: [],
      selectedRolesIds: [],
      resetPasswordDialog: false,
      password: '',
      myList:[],
      myListOld:[],
      tableList:[
        {
          recommendTime:"2020-12-02",
          candidatesName:"长相",
          candidatesSex:1,
          candidatesPhone:"123456789",
          candidatesEmail:"123456789@jjj.com",
          examineType:0,
        },,
      ],
      filters: {
        pageIndex: 1,
        pageSize: 10,
        total: 10,
        userName: '',
      },
    }
  },
  mounted () {
    this.listUsers()
    this.listRoles()
    this.getMyResumeInfo()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 280
    }
  },
  methods: {
    listUsers () {
      console.log('8888')
      getData.userList().then(resp => {
        if (resp && resp.data.code === 200) {
          this.users = resp.data.data
        }
      })
    },
    listRoles () {
      getData.roleList().then(resp => {
        if (resp && resp.data.code === 200) {
          this.roles = resp.data.data
        }
      })
    },
    getMyResumeInfo(){
      const userId = sessionStorage.getItem('userId')
      getData.myResumeInfo(userId).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          this.myList = res.data.data
          this.myListOld = res.data.data
          this.filters.total = this.myList.length || 0;
        }
      })
    },
    search(){
      let floorListInit = this.myListOld.filter(items=>{ //筛选场地名产权所属企业
        if(this.filters.userName){
          return items.name.indexOf(this.filters.userName)!==-1
        }else{
          return items
        }
        
      })
      this.myList = floorListInit
      this.filters.pageIndex = 1
      this.filters.total = this.myList.length
    },
    handleSizeChange(val) {
      this.filters.pageIndex = 1;
      this.filters.pageSize = val;
    },
    handleCurrentChange(val) {
      this.filters.pageIndex = val;
    },
    commitStatusChange (value, user) {
      if (user.username !== 'admin') {
        getData.statusUpdate
        ({
          enabled: value,
          username: user.username
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            if (value) {
              this.$message('用户 [' + user.username + '] 已启用')
            } else {
              this.$message('用户 [' + user.username + '] 已禁用')
            }
          }
        })
      } else {
        user.enabled = true
        this.$alert('不能禁用管理员账户')
      }
    },
    onSubmit (user) {
      let _this = this
      // 根据视图绑定的角色 id 向后端传送角色信息
      let roles = []
      for (let i = 0; i < _this.selectedRolesIds.length; i++) {
        for (let j = 0; j < _this.roles.length; j++) {
          if (_this.selectedRolesIds[i] === _this.roles[j].id) {
            roles.push(_this.roles[j])
          }
        }
      }
      this.$axios.put('/admin/user', {
        username: user.username,
        name: user.name,
        phone: user.phone,
        email: user.email,
        roles: roles
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('用户信息修改成功')
          this.dialogFormVisible = false
          // 修改角色后重新请求用户信息，实现视图更新
          this.listUsers()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    editUser (user) {
      this.dialogFormVisible = true
      this.selectedUser = user
      let roleIds = []
      if (user.roles) {
        for (let i = 0; i < user.roles.length; i++) {
          roleIds.push(user.roles[i].id)
        }
      }
      this.selectedRolesIds = roleIds
    },
    resumetDel(row) {
      console.log(row)
      getData.resumetDel(row.resumeId).then(res => {
        if (res.data.code === 200) {
          this.getMyResumeInfo()
        }
      })
    },
    resetPassword (username) {
      this.resetPasswordDialog = true
      this.password = ''
      // this.$axios.put('/admin/user/password', {
      //   username: username
      // }).then(resp => {
      //   if (resp && resp.data.code === 200) {
      //     this.$alert('密码已重置为 123')
      //   }
      // })
    },
    definePassword () {
      getData.resetPassword({
        username: this.selectedUser.username,
        password: this.password
      }).then(res => {
        if (res && res.data.code === 200) {
          this.$alert('密码已重置成功')
        }
      })
    }
  },
  filters: {
    pagination(array, pageNo, pageSize) {
      let offset = (pageNo - 1) * pageSize; //当前页第一条的索引
      let data =
        offset + pageSize >= array.length
          ? array.slice(offset, array.length)
          : array.slice(offset, offset + pageSize);
      return data;
    }
  },
}
</script>

<style scoped>

</style>

