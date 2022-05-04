<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item> -->
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>我的积分</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="allPointList"
        :height="tableHeight">
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
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
        <!-- <el-table-column
          prop="name"
          label="真实姓名"
          fit>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          fit>
        </el-table-column> -->
        <el-table-column prop="projectName" label="序号" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="pointsNum"
          label="积分值"
          show-overflow-tooltip
          fit>
          <template slot-scope="scope">
            <span v-if="scope.row.changeType == 0" style="color:red">{{scope.row.pointsNum?'-'+scope.row.pointsNum: 0}}</span>
            <span v-if="scope.row.changeType == 1">{{scope.row.pointsNum?scope.row.pointsNum: 0}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="变动原因">
          <template slot-scope="scope">
            <span v-if="scope.row.eventType == 0">上传简历1次</span>
            <span v-if="scope.row.eventType == 1">HR初审通过</span>
            <span v-if="scope.row.eventType == 2">面试成功</span>
            <span v-if="scope.row.eventType == 3">入职成功</span>
            <span v-if="scope.row.eventType == 7">{{scope.row.reasonName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="eventTime"
          label="事项时间"
          sortable
          show-overflow-tooltip
          fit>
        </el-table-column>
      </el-table>

      <div style="margin: 16px">
        积分总值：
        <span>{{sumPoint}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as getData from '../../service/getData'
export default {
  data () {
    return {
      users: [
        {
          id: '1',
          username: '滑动',
          name: 'jiangting',
          phone: '123456',
          pointsNum: '1',
          eventTime: '2021-4-24',
          reason: 1
        },
        {
          id: '1',
          username: '滑动',
          name: 'jiangting',
          phone: '123456',
          pointsNum: '2',
          eventTime: '2021-4-24',
          reason: 2
        },
        {
          id: '1',
          username: '滑动',
          name: 'jiangting',
          phone: '123456',
          pointsNum: '3',
          eventTime: '2021-4-24',
          reason: 3
        },
      ],
      roles: [],
      dialogFormVisible: false,
      selectedUser: [],
      selectedRolesIds: [],
      resetPasswordDialog: false,
      password: '',
      allPointList: [],
      sumPoint: 0,
    }
  },
  created() {
    // this.listUsers()
    this.getPointsList()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 250
    }
  },
  methods: {
    listUsers () {
      console.log('8888')
      getData.userList().then(resp => {
        if (resp && resp.data.code === 200) {
          this.list = resp.data.data
        }
      })
    },
    getPointsList() {
      let userId = sessionStorage.getItem('userId')
      getData.pointsIdList({userId: userId}).then(resp => {
        if (resp && resp.data.code === 200) {
          this.allPointList = resp.data.data
          this.allPointList.forEach(item => {
            if(item.changeType == 1){
              this.sumPoint += item.pointsNum
            } else {
              this.sumPoint -= item.pointsNum
            }
            
          })
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
