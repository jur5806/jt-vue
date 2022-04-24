<template>
  <div class="drawer-warp">
    <div class="over-auto">
      <el-form ref="info" :model="info" size="mini" label-width="150px" style="flex:1;display:flex;">
        <el-table ref="multipleTable" class="g-table flex-direction-box" row-class-name="hide-expand" :data="tableList"
        stripe style="width: 100%;border-bottom: 0;max-height:100%;" size="mini">
            <template slot="empty">
              <el-button v-if="tableListLoading" type="text" :loading="true">加载中</el-button>
              <span v-if="!tableListLoading">暂无数据</span>
            </template>
            <el-table-column prop="reasonName" label="抵扣原因" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-if="scope.row.isAdd" v-model="scope.row.reasonName" placeholder="请输入抵扣原因" maxlength="20"></el-input>
                <span v-else>{{scope.row.reasonName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="reasonNumber" label="抵扣分值" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input v-if="scope.row.isAdd" v-model="scope.row.reasonNumber" placeholder="抵扣分值" maxlength="10"></el-input>
                <span v-else>{{scope.row.reasonNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="success" v-if="!scope.row.isAdd" @click.stop="edit(scope.row,scope.$index)" >编辑</el-button>
                <el-button size="mini" type="danger"  v-if="!scope.row.isAdd" @click.stop="del(scope.row,scope.$index)" >删除</el-button>
                <el-button size="mini" type="success" v-if="scope.row.isAdd" @click.stop="save(scope.row,scope.$index)" >保存</el-button>
                <el-button size="mini" type="danger" v-if="scope.row.isAdd" @click.stop="cancel(scope.row,scope.$index)" >取消</el-button>
              </template>
            </el-table-column>
        </el-table>
      </el-form>
    </div>

    <div class="drawer-footer">
      <el-button size="small" type="success" @click="add">新增</el-button>
    </div>
  </div>
</template>

<script>
  import * as getData from "../service/getData";
  import * as global from "../config/mUtils";

  export default {
    data() {
      return {
        isEdit:false,
        submitLoading: false,
        info: {
          areaName:'',
          customTime:'',
          dis:'',
          introduce:'',
          operatingUnit:'',
          principal:'',
          linkTel:'',
        },
        fileList:[],
        options:[],
        companyList: [],
        tableListLoading:false,
        tableList:[],
      };
    },
    created() {
    },
    mounted() {
      this.init();
    },
    props: ["selectionStr"],
    computed: {},
    methods: {
      close(type) {
        if (type === 1) {
          this.$emit("init");
        }
        this.$emit("closeDialog");
      },
      add(){
        if(this.tableList.length>=15){
          this.$message.error('最多添加15条');
          return
        }else{
          this.tableList.push({
            reasonName:'',
            reasonNumber:'',
            reasonId:'',
            isAdd:true,
          })
        }

      },
      edit(item){
        let bstop = false;
        this.tableList.forEach(item=>{
          if(item.isAdd){
            bstop = true
          }
        })
        if(bstop){
          this.$message.error('当前有未保存数据，请先保存')
          return
        }else{
          this.$set(item,'isAdd',true)
        }

      },
      cancel(){
        this.init();
      },
      save(row,index){
        if(!row.reasonName){
          this.$message.error('请输入抵扣原因')
          return
        }
        if(!row.reasonNumber){
          this.$message.error('请输入抵扣分值')
          return
        }
        if(!global.number.test(row.reasonNumber)){
          this.$message.error('抵扣分值输入格式有误')
          return
        }
        this.submitLoading = true;
          getData.reasonUpdata(row).then(res => {
            this.submitLoading = false;
            if (res.data.code == 200) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
              this.init();
              this.$emit("init");
            } else {
              this.$message({
                message: res.data.message,
                type: "error"
              });
            }
          })
      },
      del(row,index){
        if(row.isAdd){
          this.tableList.splice(index,1)
          return
        }
        this.$confirm("确认删除？", "删除", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
          getData.deleReason(row.reasonId).then(res => {
            if (res.data.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.init();
            } else {
              this.$message({
                message: res.data.message,
                type: "error"
              });
            }
          }).catch(_ => {
            console.log(_);
          });
        }).catch(_ => {

        });
      },
      init() {
        this.tableListLoading = true;
        getData.reasonList().then(res => {
          this.tableListLoading = false;
          if (res.data.code != 200) {
            this.$message.error(res.data.message || res.data.Msg);
            return;
          }
          this.tableList=res.data.data || [];
        }).catch(_ => {
          this.tableListLoading = false;
        });
      },
    },
    components: {},
    watch: {}
  };
</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .g-table{
    flex: 1;
  }
</style>
