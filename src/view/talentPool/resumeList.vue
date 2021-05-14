<!--
 * @Author: your name
 * @Date: 2021-04-24 19:21:15
 * @LastEditTime: 2021-04-24 19:21:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath:\src\view\人才推荐\我的推荐.vue
-->
<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item> -->
        <el-breadcrumb-item>我的推荐</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>我的推荐</el-breadcrumb-item> -->
      </el-breadcrumb>
    </el-row>
    <!-- <v-bulk-registration @onSubmit="listUsers()"></v-bulk-registration> -->
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="tableList"
        stripe
        :default-sort = "{prop: 'id', order: 'ascending'}"
        style="width: 100%"
        :max-height="tableHeight">
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
          prop="sex"
          label="性别"
          fit>
           <template slot-scope="scope">
            <span v-if="scope.row.sex == 0">男</span>
            <span v-if="scope.row.sex == 1">女</span>
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
          prop="approvalState"
          label="简历审核状态"
          sortable
          width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.approvalState == 0">待审核</span>
            <span v-if="scope.row.approvalState == 1">HR初审</span>
            <span v-if="scope.row.approvalState == 2">面试通过</span>
            <span v-if="scope.row.approvalState == 3">成功入职</span>
            <!-- <span v-if="scope.row.approvalState == 4">主管初审</span> -->
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
            @click="deleUser(scope.row)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="margin: 20px 0 20px 0;float: left">
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
      </div> -->
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
      tableList:[
        {
          recommendTime:"2020-12-02",
          recommendedName:"长相",
          sex:1,
          recommendedTelephone:"123456789",
          recommendedEmail:"123456789@jjj.com",
          approvalState:0,
        },
        {
          recommendTime:"2020-12-02",
          recommendedName:"长相",
          sex:1,
          recommendedTelephone:"123456789",
          recommendedEmail:"123456789@jjj.com",
          approvalState:1,
        },
        {
          recommendTime:"2020-12-02",
          recommendedName:"长相",
          sex:1,
          recommendedTelephone:"123456789",
          recommendedEmail:"123456789@jjj.com",
          approvalState:2,
        },
        {
          recommendTime:"2020-12-02",
          recommendedName:"长相",
          sex:1,
          recommendedTelephone:"123456789",
          recommendedEmail:"123456789@jjj.com",
          approvalState:3,
        },
        {
          recommendTime:"2020-12-02",
          recommendedName:"长相",
          sex:1,
          recommendedTelephone:"123456789",
          recommendedEmail:"123456789@jjj.com",
          approvalState:4,
        }
      ]
    }
  },
  mounted () {
    this.listUsers()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    listUsers () {
      console.log('8888')
      getData.resumeInfoList().then(res => {
        if (res && res.data.code === 200) {
          this.tableList = res.data.data
        }
      })
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
    deleUser (row) {
      console.log(row)
      getData.deleUser(row.id).then(res => {
        if (res.data.code === 200) {
          this.$alert('删除成功')
          this.listUsers()
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
  }
}
</script>

<style scoped>

</style>

