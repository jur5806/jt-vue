<!--
 * @Author: your name
 * @Date: 2021-04-24 19:21:15
 * @LastEditTime: 2021-04-24 19:21:15
 * @LastEditors: Please set LastEditors
 * @Description: 我收到的简历，后台hr收到的简历
 * @FilePath: Hr-Resume
-->
<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item> -->
        <el-breadcrumb-item>我收到的简历</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <!-- <v-bulk-registration @onSubmit="listUsers()"></v-bulk-registration> -->
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="myList"
        stripe
        :default-sort = "{prop: 'id', order: 'ascending'}"
        style="width: 100%"
        :max-height="tableHeight"
       
      >
        <!-- @row-click="openDialog"
           <el-table-column
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
            <span v-if="scope.row.sex === 1">女</span>
            <span v-else>男</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="recommendedAge"
          label="年龄"
          fit>
        </el-table-column>
        <el-table-column
          prop="recommendedEducation"
          label="受教育程度"
          fit>
           <template slot-scope="scope">
            <span v-if="scope.row.recommendedEducation === 1">九年教育</span>
            <span v-if="scope.row.recommendedEducation === 2">大专</span>
            <span v-if="scope.row.recommendedEducation === 3">本科</span>
            <span v-if="scope.row.recommendedEducation === 4">研究生</span>
            <span v-if="scope.row.recommendedEducation === 6">硕士</span>
            <span v-else>其他</span>
            
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
            <span v-if="scope.row.approvalState == 1">待面试</span>
            <span v-if="scope.row.approvalState == 2">待入职</span>
            <span v-if="scope.row.approvalState == 3">员工已入职</span>
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
          width="240">
          <template slot-scope="scope">
            <el-button v-if="scope.row.approvalState == 0"
              @click="examine(scope.row)"
              size="small">
              审核
            </el-button>
            <el-button v-if="scope.row.approvalState == 1"
              @click=" interviewPassed (scope.row)"
              size="mini">
              面试通过
            </el-button>
            <el-button v-if="scope.row.approvalState == 2"
              @click="viewPassedcome(scope.row)"
              size="mini">
              确认已入职
            </el-button>
            <!-- <el-button
              @click="editUser(scope.row)"
              size="mini">
              取消审核
            </el-button> -->
            <el-button
            @click="resumetDel(scope.row)"
              size="mini">
              移除
            </el-button>
            <el-button
              @click="examine(scope.row)"
              size="small">
              查看
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
      myList:[],
      tableList:[
        {
          recommendTime:"2020-12-02",
          candidatesName:"长相",
          candidatesSex:1,
          candidatesPhone:"123456789",
          candidatesEmail:"123456789@jjj.com",
          examineType:0,
        },
      ]
    }
  },
  mounted () {
    this.listUsers()
    this.listRoles()
    this.getHrResume()
  },
  computed: {
    viewPassedcome(row) {
      this.$confirm('确认该被推荐人已入职,推荐人积分+5，是否继续？', '确认通过', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.pointsInfoAdd(row,3,1,5)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    openDialog(row){
      this.$router.push({ path: '/ResumeDetail', query: { recruitId: row.recruitId ,hrId: row.hrId, tjId: row.tjId, resumeId: row.resumeId }})
    },
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
    getHrResume(){
      const hrId = this.$route.query.hrId || sessionStorage.getItem('userId')
      const recruitId  = this.$route.query.recruitId
      const params = { 
        hrId: hrId, 
        recruitId: recruitId 
      }
      getData.hrResumeList(params).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          this.myList = res.data.data
        } else {
          // this.getHrResume();
        }
      })
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
      this.$confirm('确认要删除该简历记录，是否继续？', '确认通过', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getData.resumetDel(row.resumeId).then(res => {
        if (res.data.code === 200) {
            this.$alert('删除成功')
            this.getHrResume()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      
    },
    examine (row) {
      this.openDialog(row);
    },
    interviewPassed (row) {
      this.$confirm('确认该被推荐人面试通过,推荐人积分+2，是否继续？', '确认通过', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.pointsInfoAdd(row,2,1,2)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    pointsInfoAdd(row,type,change,num) {
      let data = {
        userId: row.tjId || 110,
        eventType: type,
        changeType:  change,
        pointsNum: num,
        dealer: row.hrId || 110,
        resumeId: row.resumeId || 3
      }
      getData.pointsInfoAdd(data).then(res => {
        if (res && res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '操作失败'
          })
        }
        this.getHrResume();
      })
    }

  }
}
</script>

<style scoped>

</style>

