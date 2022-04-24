<template>
  <div class="drawer-warp">
    <div class="over-auto">
      <el-form ref="info" :model="info" :rules="rules" size="mini" label-width="150px">
        <el-row class="dialog-form">
          <el-col :span="24">
            <el-form-item label="抵扣对象：" prop="blockName">
              <el-select v-model="info.userId" filterable placeholder="请选择抵扣对象">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="产业集群：" prop="clusterIdList">
              <el-select v-model="info.reasonId" filterable placeholder="请选择产业集群" @change="changeValue">
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.reasonName"
                  :value="item.reasonId"
                  >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="抵扣分值：" prop="pointsNum">
              <el-input v-model="info.pointsNum" type="text" placeholder="请输入抵扣分值"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input v-model="info.remark" type="textarea" rows="2" maxlength="50" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
      </el-form>
    </div>

    <div class="drawer-footer">
      <el-button size="small"  @click="close">取 消</el-button>
      <el-button size="small" type="success" @click="submit"  :loading="submitLoading">确认</el-button>
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
          id:'',
          userId:'',
          reasonId: '',
          pointsNum:'',
          remark:'',

        },
        options:[],
        options2:[],
        companyList: [],
        rules: {
          userId: [
            { required: true, message: "请输入抵扣对象", trigger: ["blur", "change"] }
          ],
          reasonId: [
            { required: true, message: "请输入抵扣原因", trigger: ["blur", "change"] }
          ],
          pointsNum: [
            { required: true, message: "请输入抵扣分值", trigger: ["blur", "change"] }
          ],
        }
      };
    },
    created() {
    },
    mounted() {
      this.getIndustrialClusterList();
      // if(this.invoiceId){
      //   this.getBlockBaseInfo();//获取详情
      // }
    },
    props: ['invoiceId'],
    computed: {},
    methods: {
      close(type) {
        if (type === 1) {
          this.$emit("init");
        }
        this.$emit("closeDialog");
      },
      changeValue(val){
        if(val){
          this.options2.forEach(ele=>{
            if(ele.reasonId == val){
              this.info.pointsNum = ele.reasonNumber;
            }
          })
        }
      },
      getIndustrialClusterList(){
        this.tableListLoading = true;
        getData.userList().then(res => {
          this.tableListLoading = false;
          if (res && res.data.code === 200) {
            this.options = res.data.data
          }
        })

        getData.reasonList().then(res => {
          if (res && res.data.code === 200) {
            this.options2 = res.data.data
          }
        })



      },
      submit() {
        this.submitLoading = true;
        this.$refs["info"].validate((valid) => {
          if (valid) {
          let data = {
            userId: this.info.userId,
            reasonId: this.info.reasonId,
            eventType: 7,
            changeType:  0,
            pointsNum: this.info.pointsNum,
            dealer: sessionStorage.getItem("userId"),
            resumeId: '',
            remark: this.info.remark,
          }
          this.submitLoading = true;
            getData.pointsInfoAdd(data).then(res => {
              this.submitLoading = false;
              if (res && res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.message
                })
              }
              this.getHrResume();
            })
          } else {
            this.submitLoading = false;
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    components: {},
    watch: {}
  };
</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';
  .form-item{
    border:1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    margin-bottom: 20px;
    padding-top: 10px;
  }
  .img-box{
    display: flex;
    flex-wrap: wrap;
    img{
      width: 100px;
      height: 100px;
      margin-right: 10px;
      object-fit: fill;
    }
  }
</style>
