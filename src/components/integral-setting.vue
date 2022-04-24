<template>
  <div class="dialog-warp">
    <el-row class="dialog-form">
         <el-form
          ref="info"
          size="small"
          :model="info"
          :rules="rules"
          label-width="180px"
          style="background: white"
        >
          <el-row type="flex" justify="center">
            <el-col class="g-basic-info">
              <el-row>
                <el-col :span="20">
                  <el-form-item label="初审通过分值：" prop="resumePassValue">
                    <el-input
                      type="text"
                      v-model.number="info.resumePassValue"
                      maxlength="10"
                      placeholder="请输入初审通过分值"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="20">
                  <el-form-item label="初审每人上限分值" prop="resumeNumberLimited">
                    <el-input
                      type="text"
                      v-model="info.resumeNumberLimited"
                      maxlength="10"
                      placeholder="请输入初审每人上限分值"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="20">
                  <el-form-item label="面试通过分值：" prop="viewPassValue">
                    <el-input
                      type="text"
                      v-model.number="info.viewPassValue"
                      maxlength="10"
                      placeholder="请输入面试通过分值"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="20">
                  <el-form-item label="面试每人上限分值" prop="viewNumberLimited">
                    <el-input
                      type="text"
                      v-model="info.viewNumberLimited"
                      maxlength="10"
                      placeholder="请输入面试每人上限分值"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="20">
                  <el-form-item label="成功聘用分值：" prop="successInValue">
                    <el-input
                      type="text"
                      v-model.number="info.successInValue"
                      maxlength="10"
                      placeholder="请输入成功聘用分值"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="20">
                  <el-form-item label="成功聘用每人上限分值" prop="successInLimited">
                    <el-input
                      type="text"
                      v-model="info.successInLimited"
                      maxlength="10"
                      placeholder="请输入成功聘用每人上限分值"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row> -->
            </el-col>
          </el-row>
        </el-form>
    </el-row>
    <!-- <h3 class="title">评分调整记录：</h3>
    <el-row class="diglog-form">
      <el-table :data="recordList" style="width: 100%">
        <el-table-column prop="assessmentUpdateOscore" label="修改前评分" show-overflow-tooltip></el-table-column>
        <el-table-column prop="assessmentUpdateNscore" label="修改后评分" show-overflow-tooltip></el-table-column>
        <el-table-column prop="assessmentUpdateCreateTime" label="修改时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="assessmentUpdateRemark" label="评分修改备注" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-row> -->
    <div class="text-right" style="margin-top: 20px;">
      <el-button @click="$emit('closeDialog')" size="mini">取消</el-button>
      <el-button type="success" size="mini" @click="submit">保存</el-button>
    </div>
  </div>
</template>
<script>
import {integeralList,integeralUpdata} from "../service/getData";
import * as global from "../config/mUtils";


export default {
  data() {
    return {
      reworkNum:null,
      recordList:[],
      vrInfo: {
        score: '',
        remark: '',
        assessmentCompanyId: this.assessmentCompanyId
      },
      info:{

      },
      rules: {
        resumePassValue: [
          { required: true, message: '请输入初审通过分值', trigger: ['change','blur'] },
          { pattern: global.number, message: '评分格式不正确'},
          { pattern: /(^-?\d{1,4}$)/, message: "输入0到9999的数值" },
        ],
        resumeNumberLimited: [
          { required: true, message: '请输入初审每人上限分值', trigger: ['change','blur'] },
          { pattern: global.number, message: '评分格式不正确'},
          { pattern: /(^-?\d{1,4}$)/, message: "输入0到9999的数值" },
        ],
        viewPassValue: [
          { required: true, message: '请输入面试通过分值', trigger: ['change','blur'] },
          { pattern: global.number, message: '评分格式不正确'},
          { pattern: /(^-?\d{1,4}$)/, message: "输入0到9999的数值" },
        ],
        viewNumberLimited: [
          { required: true, message: '请输入面试每人上限分值', trigger: ['change','blur'] },
          { pattern: global.number, message: '评分格式不正确'},
          { pattern: /(^-?\d{1,4}$)/, message: "输入0到9999的数值" },
        ],
        successInValue: [
          { required: true, message: '请输入成功聘用分值', trigger: ['change','blur'] },
          { pattern: global.number, message: '评分格式不正确'},
          { pattern: /(^-?\d{1,4}$)/, message: "输入0到9999的数值" },
        ],
        successInLimited: [
          { required: true, message: '请输入成功聘用每人上限分值', trigger: ['change','blur'] },
          { pattern: global.number, message: '评分格式不正确'},
          { pattern: /(^-?\d{1,4}$)/, message: "输入0到9999的数值" },
        ],
      },
      assessmentCompanyFscore: ''
    };
  },
  created() {
  },
  mounted() {
    this.init()
  },
  props: ["assessmentCompanyId"],
  computed: {},
  methods: {
    init(){
      integeralList().then(res=>{
        if(res.data.code != 200){
          this.$message.error(res.data.message)
          return
        }
        this.info=res.data.data[0];
      })
    },
    submit(){
      this.$refs.info.validate((valid) => {
        if (valid) {
          integeralUpdata(this.info).then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.message);
              this.$emit('closeDialog')
            }else {
              this.$message.error(res.data.message);
            }
          }).catch(err=>{
            console.log(err);
          }) 
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  components: {},
  watch: {}
};
</script>
<style lang="scss">
.el-dialog--center .el-dialog__body{
padding: 0px !important;
}
</style>
<style scoped lang="scss">
@import "../assets/css/mixin";
.title-label-right {
  float: right;
  color: #169bd5;
}
</style>