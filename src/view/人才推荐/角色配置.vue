<template>
  <div>
    <el-dialog
      title="修改角色信息"
      :visible.sync="dialogFormVisible">
      <el-form v-model="selectedRole" style="text-align: left" ref="dataForm">
        <el-form-item label="角色名" label-width="120px" prop="username">
          <el-input v-model="selectedRole.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="name">
          <el-input v-model="selectedRole.nameZh" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="功能配置" label-width="120px" prop="perms">
          <el-checkbox-group v-model="selectedPermsIds">
            <el-checkbox v-for="(perm,i) in perms" :key="i" :label="perm.id">{{perm.desc_}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            :data="menus"
            :props="props"
            show-checkbox
            :default-checked-keys="selectedMenusIds"
            node-key="id"
            ref="tree">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedRole)">确 定</el-button>
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色配置</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    
    <el-dialog
      title="添加角色"
      :visible.sync="dialogFormVisibleAdd"
      width="25%">
      <v-role-create @onSubmit="listRoles()"  @close="dialogFormVisibleAdd = false"></v-role-create>
    </el-dialog>
    <el-card style="margin: 18px 2%;width: 95%">
      <div class="g-search-box">
        <div class="g-search">
          <el-input v-model.trim="filters.userName" placeholder="输入角色名字进行搜索" @keyup.enter.native="search()">
            <i slot="prefix" class="el-input__icon el-icon-search" @click="search()"></i>
          </el-input >
        </div>
        <div class="top-btn">
          <el-button class="add-button" type="success" @click="dialogFormVisibleAdd = true" size="small">添加角色</el-button>
        </div>
      </div>
      <el-table
        :data="roles | pagination(filters.pageIndex,filters.pageSize)"
        stripe
        style="width: 100%"
        :height="tableHeight">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名"
          fit>
        </el-table-column>
        <el-table-column
          prop="nameZh"
          label="角色描述"
          fit>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(value) => commitStatusChange(value, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="editRole(scope.row)">
              编辑
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
  name: 'UserRole',
  data () {
    return {
      dialogFormVisible: false,
      dialogFormVisibleAdd: false,
      roles: [],
      rolesOld: [],
      perms: [],
      menus: [],
      selectedRole: [],
      selectedPermsIds: [],
      selectedMenusIds: [],
      props: {
        id: 'id',
        label: 'nameZh',
        children: 'children'
      },
      filters: {
          pageIndex: 1,
          pageSize: 10,
          total: 10,
          userName: '',
        },
    }
  },
  mounted () {
    this.listRoles()
    this.listPerms()
    this.listMenus()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 280
    }
  },
  methods: {
    listRoles () {
      getData.roleList().then(res => {
        if (res && res.data.code === 200) {
          this.roles = res.data.data
          this.rolesOld = res.data.data
          this.filters.total = this.roles.length
        }
      })
    },
    listPerms () {
      getData.rolePerm().then(res => {
        if (res && res.data.code === 200) {
          this.perms = res.data.data
        }
      })
    },
    listMenus () {
      getData.roleMenu().then(res => {
        if (res && res.data.code === 200) {
          this.menus = res.data.data
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
    commitStatusChange (value, role) {
      if (role.id !== 1) {
        this.$confirm('是否更改角色状态？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getData.roleStatusUpdate({
            enabled: value,
            id: role.id
          }).then(res => {
            if (res && res.data.code === 200) {
              if (value) {
                this.$message('角色 [' + role.nameZh + '] 已启用')
              } else {
                this.$message('角色 [' + role.nameZh + '] 已禁用')
              }
            }
          })
        }).catch(() => {
          role.enabled = !role.enabled
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        role.enabled = true
        this.$alert('无法禁用系统管理员！')
      }
    },
    search(){
      console.log(4444)
        let floorListInit = this.rolesOld.filter(items=>{ //筛选场地名产权所属企业
        if(this.filters.userName){
          return items.name.indexOf(this.filters.userName)!==-1
        }else{
          return items
        }
          
        })
        this.roles = floorListInit
        this.filters.pageIndex = 1
        this.filters.total = this.roles.length
      },
    editRole (role) {
      this.dialogFormVisible = true
      this.selectedRole = role
      let permIds = []
      for (let i = 0; i < role.perms.length; i++) {
        permIds.push(role.perms[i].id)
      }
      this.selectedPermsIds = permIds
      let menuIds = []
      for (let i = 0; i < role.menus.length; i++) {
        menuIds.push(role.menus[i].id)
        for (let j = 0; j < role.menus[i].children.length; j++) {
          menuIds.push(role.menus[i].children[j].id)
        }
      }
      this.selectedMenusIds = menuIds
      // 判断树是否已经加载，第一次打开对话框前树不存在，会报错。所以需要设置 default-checked
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(menuIds)
      }
    },
    onSubmit (role) {
      let _this = this
      // 根据视图绑定的角色 id 向后端传送角色信息
      let perms = []
      for (let i = 0; i < _this.selectedPermsIds.length; i++) {
        for (let j = 0; j < _this.perms.length; j++) {
          if (_this.selectedPermsIds[i] === _this.perms[j].id) {
            perms.push(_this.perms[j])
          }
        }
      }
      getData.roleInfoUpdate({
        id: role.id,
        name: role.name,
        nameZh: role.nameZh,
        enabled: role.enabled,
        perms: perms
      }).then(res => {
        if (res && res.data.code === 200) {
          this.$alert(res.data.data)
          this.dialogFormVisible = false
          this.listRoles()
        }
      })
      getData.roleMenuUpdate(role.id,{menusIds: this.$refs.tree.getCheckedKeys()
      }).then(res => {
        if (res && res.data.code === 200) {
          console.log(res.data.data)
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
