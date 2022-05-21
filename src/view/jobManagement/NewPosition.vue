<template>
  <div class="app-container">
    <!-- <el-button
      type="primary"
      size="mini"
      @click="$router.go(-1)"
      style="margin: 10px"
      >返回</el-button
    > -->
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      style="background: #fff; padding: 30px 0;height:95%;"
      :rules="rules"
    >
      <el-row>
        <el-col :span="10">
          <el-form-item label="职位标题" prop="stationTitle">
            <el-input
              v-model="form.stationTitle"
              placeholder="请输入职位标题"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="岗位名称" prop="stationName">
            <el-input v-model="form.stationName" placeholder="请输入岗位名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="招聘截止时间" prop="rcEndTime">
            <el-date-picker
              v-model="form.rcEndTime"
              type="date"
              placeholder="请选择结束时间"
              style="width: 100%"
              value-format="yyyy-MM-dd hh:mm:ss"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="招聘数量" prop="rcDepartmentNum">
            <el-input v-model="form.rcDepartmentNum" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="学历要求">
            <el-select
              v-model="form.eductionClass"
              placeholder="请选择学历要求"
            >
              <el-option label="初中以上" value="1" />
              <el-option label="高中及中专以上 " value="2" />
              <el-option label="大专及以上" value="3" />
              <el-option label="本科及以上" value="4" />
              <el-option label="研究生及以上" value="5" />
              <el-option label="不做要求" value="6" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="岗位状态">
            <el-radio-group v-model="form.departmentState">
              <el-radio :label="1">急招</el-radio>
              <el-radio :label="2">长期招</el-radio>
              <el-radio :label="3">短期招</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="工作地址">
            <el-select v-model="form.workPlace" placeholder="请选择工作地址">
              <el-option label="上海" value="上海" />
              <el-option label="北京" value="北京" />
              <el-option label="杭州" value="杭州" />
              <el-option label="广州" value="广州" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="工作要求">
            <el-input
              v-model="form.rcDescribe"
              type="textarea"
              placeholder="请填写工作要求"
              :rows="4"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="薪资福利">
            <el-input
              v-model="form.rcSalaryWelfare"
              type="textarea"
              placeholder="请填写薪资福利"
              :rows="4"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import { date } from '../../config/mUtils.js'
import * as getData from "../../service/getData.js";
import * as global from "../../config/mUtils";

export default {
  data() {
    return {
      form: {
        stationTitle: "",
        stationName: "",
        rcEndTime: "",
        rcDepartmentNum: 1,
        workPlace: "",
        departmentState: 1,
        eductionClass: "",
        delivery: "",
        rcDescribe: "",
        rcSalaryWelfare: '',
        hrId: "",
      },
      rules: {
        stationTitle: [
          { required: true, message: "请输入岗位标题", trigger: "blur" },
        ],
        stationName: [
          { required: true, message: "请输入职位名称", trigger: "blur" },
        ],
        rcEndTime: [
          { required: true, message: "请选择结束时间", trigger: "change" },
        ],
        rcDepartmentNum: [
          { required: true, message: "请输入招聘数量", trigger: "blur" },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
    };
  },
  methods: {
    formatEducation(data) {
      if (data === "junior college" || data === "大专") {
        return 1;
      } else if (data === "undergraduate" || data === "本科") {
        return 2;
      } else if (data === "master" || data === "硕士") {
        return 3;
      } else if (data === "doctor" || data === "博士") {
        return 4;
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // this.form.eductionClass = this.formatEducation(this.form.eductionClass)
          // this.form.rcDescribe = this.form.rcDescribe.replace("\n", "^");
          if (sessionStorage.getItem("userId")) {
            this.form.hrId = sessionStorage.getItem("userId");
          } else {
            this.form.hrId = 110;
          }
          getData
            .recruitAdd(this.form)
            .then((resp) => {
              if (resp.data.code === 200) {
                this.$alert("发布成功", "提示", {
                  confirmButtonText: "确定",
                });
                // this.clear()
                this.$router.go(-1);
                this.$emit("onSubmit");
              } else {
                this.$alert(resp.data.message, "提示", {
                  confirmButtonText: "确定",
                });
              }
            })
            .catch((failResponse) => {});
        } else {
          this.$message({
            message: "表单验证失败",
            type: "error",
          });
          return false;
        }
      });
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>