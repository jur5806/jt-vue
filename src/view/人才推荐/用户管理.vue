<template>
  <div>
    <el-dialog title="重置密码" :visible.sync="resetPasswordDialog" width="25%">
      <el-form :model="selectedUser" style="text-align: left" ref="selectedUser" :rules="rules">
        <el-form-item label="密码：" label-width="80px" prop="password">
          <el-input v-model="selectedUser.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <p style="text-align:center;">
        <el-button>取消</el-button>
        <el-button @click="definePassword()">确定</el-button>
      </p>
    </el-dialog>
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="selectedUser" style="text-align: left" ref="selectedUser" :rules="rules">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <label>{{selectedUser.username}}</label>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="120px" prop="name">
          <el-input v-model="selectedUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="selectedUser.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="selectedUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password1">
          <el-button type="warning" @click="resetPassword(selectedUser.username)">重置密码</el-button>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px" prop="roles">
          <el-checkbox-group v-model="selectedRolesIds">
            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.nameZh}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item> -->
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-dialog title="添加用户" :visible.sync="dialogFormAdd" width="35%">
      <v-bulk-registration @onSubmit="listUsers()" @close="dialogFormAdd = false" v-if="dialogFormAdd">
      </v-bulk-registration>
    </el-dialog>
    <el-card style="margin: 18px 2%;width: 95%">
      <div class="g-search-box">
        <div class="g-search">
          <el-input v-model.trim="filters.userName" placeholder="输入账号名称或真实姓名进行搜索" @keyup.enter.native="search()">
            <i slot="prefix" class="el-input__icon el-icon-search" @click="search()"></i>
          </el-input >
        </div>
        <div class="top-btn">
          <el-button class="add-button" type="success" @click="dialogFormAdd = true" size="small">添加用户</el-button>
        </div>
      </div>
      <el-table :data="users | pagination(filters.pageIndex,filters.pageSize)" stripe
        :default-sort="{prop: 'id', order: 'ascending'}" style="width: 100%" :height="tableHeight">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="username" label="用户名1" fit>
        </el-table-column>
        <el-table-column prop="name" label="真实姓名" fit>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" fit>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip fit>
        </el-table-column>
        <el-table-column label="状态" sortable width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enabled" active-color="#13ce66" inactive-color="#ff4949"
              @change="(value) => commitStatusChange(value, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row)" type="text" size="small">
              编辑
            </el-button>
            <el-button @click="deleUser(scope.row)" type="text" size="small">
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
      <!-- <div style="margin: 20px 0 20px 0;float: left">
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
      </div> -->
    </el-card>
  </div>
</template>

<script>
  import * as getData from '../../service/getData'
  import * as global from '../../config/mUtils'
  export default {
    data() {
        const checkChinese = (rule, value, callback) => {
        if(value == '******'){
          callback();
          return
        }
        if (!value) {
          callback('密码不能为空');
          return
        }
        const str = value.replace(/[^\u4E00-\u9FA5]/g, '');
        if (str == ''&& global.rule.password(value)) {
          callback()
        } else if(value.length <8 || value.length > 16) {
          callback('密码长度在8-16之间');
        } else if(!global.rule.password(value)) {
          callback('密码必须包含字母、数字组合');
        } else if (!global.noChinese.test(str)) {
          callback('密码不能包含中文');
        }
      };
      return {
        users: [],
        roles: [],
        dialogFormVisible: false,
        dialogFormAdd: false,
        selectedUser: [],
        selectedRolesIds: [],
        resetPasswordDialog: false,
        password: '',
        filters: {
          pageIndex: 1,
          pageSize: 10,
          total: 10,
          userName: '',
        },
        oldUsers: [],
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {validator: checkChinese, trigger: ['blur', 'change']},
            ],
          name: [{required: true, message: '真实姓名不能为空', trigger: 'blur'}],
          phone: [
            {required: true, message: '电话号码不能为空', trigger: 'blur'},
            {pattern: global.phoneRule5, message: '联系方式格式错误'}],
        },
      }
    },
    mounted() {
      this.listUsers()
      this.listRoles()
    },
    computed: {
      tableHeight() {
        return window.innerHeight - 280
      }
    },
    methods: {
      listUsers() {
        console.log('8888')
        getData.userList().then(res => {
          if (res && res.data.code === 200) {
            this.users = res.data.data
            this.oldUsers = res.data.data
            this.filters.total = this.users.length || 0;
          }
        })
      },
      listRoles() {
        getData.roleList().then(res => {
          if (res && res.data.code === 200) {
            this.roles = res.data.data
          }
        })
      },
      search(){
        console.log(5555)
        let floorListInit = this.oldUsers.filter(items=>{ //筛选场地名产权所属企业
        if(this.filters.userName){
          return items.username.indexOf(this.filters.userName)!==-1||items.name.indexOf(this.filters.userName)!==-1
        }else{
          return items
        }
          
        })
        this.users = floorListInit
        this.filters.pageIndex = 1
        this.filters.total = this.users.length
      },
      commitStatusChange(value, user) {
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
      onSubmit(user) {
        this.$refs['selectedUser'].validate((valid) =>{
          if(valid){
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
            getData.userInfoEdit({
              username: user.username,
              name: user.name,
              phone: user.phone,
              email: user.email,
              roles: roles
            }).then(res => {
              if (res && res.data.code === 200) {
                this.$alert('用户信息修改成功')
                this.dialogFormVisible = false
                // 修改角色后重新请求用户信息，实现视图更新
                this.listUsers()
              } else {
                this.$alert(res.data.message)
              }
            })
          }else{
            return false
          }
        })
        
      },
      editUser(user) {
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
      deleUser(row) {
        console.log(row)
        getData.deleUser(row.id).then(res => {
          if (res.data.code === 200) {
            this.$alert('删除成功')
            this.listUsers()
          }
        })
      },
      resetPassword(username) {
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
      definePassword() {
        this.$refs['selectedUser'].validate((valid) =>{
          if(valid){
            getData.resetPassword({
              username: this.selectedUser.username,
              password: this.selectedUser.password
            }).then(res => {
              if (res && res.data.code === 200) {
                this.$alert('密码已重置成功')
                this.resetPasswordDialog = false;
              }
            })
          }else{
            return false
          }
        })
        
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

<style lang="scss" scoped>
  /* @import "../../assets/css/mixin.scss"; */

</style>