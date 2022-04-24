<!--
 * @Author: your name
 * @Date: 2021-04-24 19:21:15
 * @LastEditTime: 2021-05-15 06:44:52
 * @LastEditors: Please set LastEditors
 * @Description: 我收到的简历，后台hr收到的简历
 * @FilePath: Hr-Resume
-->
<template>
  <div>
    <el-dialog title="自定义积分奖励" :visible.sync="resetPasswordDialog">
      <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
        <el-form-item label="奖励积分值" label-width="120px" prop="username">
          <el-input v-model="points"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="resetPasswordDialog = false">取消</el-button>
        <el-button @click="definePassword()">确定</el-button>
      </div>
    </el-dialog>
    <el-button type="primary" size="mini" @click="$router.go(-1)" style="margin: 10px">返回</el-button>
    <el-row style="margin: 18px 0px 20px 18px ">
       
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>我收到的简历</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card>
      <div class="flex-box background-white search-bar">
        <el-form
          :inline="true"
          style="width: 100%"
          size="mini"
          label-position="left"
          @submit.native.prevent
        >
          <el-form-item label="审核状态：">
            <el-select v-model="state" placeholder="请选择审核状态" clearable @change="search">
              <el-option label="待审核" value="0"></el-option>
              <el-option label="待面试" value="1"></el-option>
              <el-option label="待入职" value="2"></el-option>
              <el-option label="员工已入职" value="3"></el-option>
              <el-option label="全部" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-button size="mini" type="success" @click="search">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
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
            <!-- <span v-if="scope.row.recommendedEducation === 6">硕士</span> -->
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
            <el-button v-if="scope.row.approvalState == 3"
              @click="getPoints(scope.row)"
              size="mini">
              自定义奖励
            </el-button>
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
      ],
      points: 0,
      state: "4",
      tempinfo:{},
    }
  },
  mounted () {
    this.getHrResume()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    viewPassedcome(row) {
      console.log(row);
      this.$confirm('确认该被推荐人已入职,推荐人积分+5，是否继续？', '确认通过', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        this.pointsInfoAdd(row,3,1,3)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    openDialog(row){
      this.$router.push({ path: '/ResumeDetail', query: { recruitId: row.recruitId ,hrId: row.hrId, tjId: row.tjId, resumeId: row.resumeId }})
    },
    search(){
      this.getHrResume()
    },
    getHrResume(){
      const hrId = this.$route.query.hrId || sessionStorage.getItem('userId')
      const recruitId  = this.$route.query.recruitId
      const params = { 
        hrId: hrId, 
        recruitId: recruitId,
        state: this.state
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
    getPoints(row) {
      this.resetPasswordDialog = true;
      this.points = 0;
      this.tempinfo = row;
    },
    definePassword() {
      this.pointsInfoAdd(this.tempinfo,3,1,this.points);
      this.resetPasswordDialog = false;
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
        userId: row.tjId,
        eventType: type,
        changeType:  change,
        pointsNum: num || 0,
        dealer: sessionStorage.getItem("userId"),
        resumeId: row.resumeId
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

