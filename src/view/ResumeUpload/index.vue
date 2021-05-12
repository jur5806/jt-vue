<template>
<div class="app-container">
  <el-form ref="form" :model="form" label-width="120px">
    <el-row>
      <el-col :span="8">
        <el-form-item label="姓名">
          <el-input v-model="form.recommendedName" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="籍贯">
          <el-select v-model="form.recommendedProvince" placeholder="please select your zone">
            <el-option label="上海" value="上海" />
            <el-option label="北京" value="北京" />
            <el-option label="杭州" value="杭州" />
            <el-option label="广州" value="广州" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-form-item label="推荐人id">
          <el-input v-model="form.tjId" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="毕业院校">
          <el-input v-model="form.recommendedSchool" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="所修专业">
          <el-input v-model="form.recommendedMajor" />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="电子邮箱">
          <el-input v-model="form.recommendedEmail" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="出生日期">
          <el-date-picker v-model="form.recommendedBirth" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="政治面貌">
          <el-input v-model="form.recommendedPolitical" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="婚姻状况">
          <el-input v-model="form.recommendedMarital" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系方式">
          <el-input v-model="form.recommendedTelephone" />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-form-item label="job time">
        <el-date-picker v-model="form.rcEndTime" type="date" placeholder="Pick a date" style="width: 100%;" />
    </el-form-item> -->
    <!-- <el-form-item label="紧急">
      <el-switch v-model="form.delivery" />
    </el-form-item> -->
    <!-- <el-form-item label="job type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="视频面试" name="type" />
        <el-checkbox label="电话面试" name="type" />
        <el-checkbox label="线下面试" name="type" />
      </el-checkbox-group>
    </el-form-item> -->
    <el-form-item label="education">
      <el-radio-group v-model="form.recommendedEducation">
        <el-radio label="junior college" value="1"/>
        <el-radio label="undergraduate" value="2"/>
        <el-radio label="master" value="3"/>
        <el-radio label="doctor" value="4"/>
      </el-radio-group>
    </el-form-item>
    <!-- <el-form-item label="job form">
      <el-input v-model="form.rcDescribe" type="textarea" />
    </el-form-item> -->
    <el-form-item label="自我评价以及荣誉情况">
      <el-input v-model="form.recommendedSelfEvaluation" type="textarea" />
    </el-form-item>
    <el-form-item label="专业技能">
      <el-input v-model="form.rcDescribe" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发送</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
    <el-form-item prop="image_uri" style="margin-bottom: 30px;">
      <Upload v-model="form.image_uri" />
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
import * as getData from '../../service/getData.js'
import Upload from '@/components/Upload/SingleImage3'
export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        stationName: '',  //JOB name
        workPlace: '', //工作地点
        date1: '',
        date2: '',
        delivery: false, //紧急
        type: [],
        resource: 0,
        eductionClass: '', //教育等级
        rcEndTime: '',  //结束日期
        rcDescribe: '', //职位描述
        positionTypeId: '',  //职位类型
        rcDepartmentNum: '', //岗位人数需求
        recommendedBirth: '',
        recommendedSchool: '',
        recommendedSelfEvaluation:'',
        recommendedProvince:'',
        recommendedName:'',
        recommendedEducation: 0,
        tjId: 0,
        recommendedEmail: '',
        recommendedMajor:'',
        recommendedMarital:'',

      }
    }
  },
  methods: {
    formatEducation(data) {
    if(data === "junior college" || data === "大专"){
      return 1
    } else if(data === "undergraduate" || data === "本科"){
      return 2
    } else if(data ==="master" || data === "硕士"){
      return 3
    } else if(data === "doctor" || data ==="博士") {
      return 4
    }
   },
    onSubmit() {
      this.form.recommendedEducation = this.formatEducation(this.form.recommendedEducation)
      getData.resumetAdd({
        recommendedName: this.form.recommendedName,
        tjId: this.form.tjId,
        recommendedProvince: this.form.recommendedProvince,
        recommendedSchool: this.form.recommendedSchool,
        recommendedSelfEvaluation: this.form.recommendedSelfEvaluation,
        recommendedMajor:this.form.recommendedMajor,
        recommendedEmail: this.form.recommendedEmail,
        recommendedMarital: this.form.recommendedMarital,
        recommendedTelephone: parseInt(this.form.recommendedTelephone),
        // delivery: this.form.delivery,
        // rcEndTime: this.form.rcEndTime,
        recommendedBirth: this.form.recommendedBirth,
        // email: this.form.email,
        rcDescribe: this.form.rcDescribe,
        rcDepartmentNum: this.form.rcDepartmentNum,
        recommendedEducation: this.form.recommendedEducation
      })
      .then(resp => {
        if (resp.data.code === 200) {
          this.$alert('发布成功', '提示', {
            confirmButtonText: '确定'
          })
          // this.clear()
          this.$emit('onSubmit')
        } else {
          this.$alert(resp.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      }).catch(failResponse => {})
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>