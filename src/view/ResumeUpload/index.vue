<template>
<div class="app-container">

  <el-form ref="form" :model="form" label-width="120px" :rules="rules">
    <h3 class="title text-left">个人基础信息：</h3>
    <div style="background: #fff;padding-top:20px">
      <el-row >
        <el-col :span="10">
          <el-form-item label="姓名" prop="recommendedName">
            <el-input v-model="form.recommendedName" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="联系方式" prop="recommendedTelephone">
            <el-input v-model="form.recommendedTelephone" placeholder="请输入联系方式"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="10">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="年龄" prop="recommendedAge">
            <el-input v-model="form.recommendedAge" placeholder="请输入年龄" maxlength="3"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="民族" prop="recommendednation">
            <el-input v-model="form.recommendednation" placeholder="请输入民族"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="电子邮箱" prop="recommendedEmail">
            <el-input v-model="form.recommendedEmail" placeholder="请输入电子邮箱"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="出生日期" prop="recommendedBirth">
            <el-date-picker v-model="form.recommendedBirth" type="date" 
            placeholder="请选择出生日期" style="width: 100%;" value-format="yyyy-MM-dd hh:mm:ss" :picker-options="pickerOptions"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="政治面貌" prop="recommendedPolitical">
            <el-select v-model="form.recommendedPolitical" placeholder="请选择政治面貌">
              <el-option label="群众" value="群众" />
              <el-option label="共青团员" value="共青团员" />
              <el-option label="党员" value="党员" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="婚姻状况" prop="recommendedMarital">
            <el-select v-model="form.recommendedMarital" placeholder="请选择婚姻状况">
              <el-option label="未婚" value="未婚" />
              <el-option label="已婚" value="已婚" />
              <el-option label="离异" value="离异" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="籍贯" prop="recommendedProvince">
            <el-input v-model="form.recommendedProvince" placeholder="请输入籍贯"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="家庭地址" prop="recommendedAddress">
            <el-input v-model="form.recommendedAddress" placeholder="请输入家庭地址" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="身份证号" prop="recommendedIdcard">
            <el-input v-model="form.recommendedIdcard" placeholder="请输入身份证号" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <h3 class="title text-left" >学历信息：</h3>
    <div style="background: #fff;padding-top:20px">
      <el-row >
        <el-col :span="10">
          <el-form-item label="就读状况" prop="recommendedAttend">
            <el-select v-model="form.recommendedAttend" placeholder="请选择就读状况">
              <el-option label="在读中" value="在读中" />
              <el-option label="已毕业" value="已毕业" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="学历" prop="recommendedEducation">
            <el-select v-model="form.recommendedEducation" placeholder="请选择学历">
              <el-option label="大专以下" value="1" />
              <el-option label="大专" value="2" />
              <el-option label="本科" value="3" />
              <el-option label="研究生" value="4" />
              <!-- <el-option label="硕士" value="5" /> -->
              <el-option label="其他" value="5" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.recommendedAttend == '已毕业'">
        <el-col :span="10">
          <el-form-item label="毕业院校" prop="recommendedSchool">
            <el-input v-model="form.recommendedSchool" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="毕业时间" prop="recommendedFinalDate">
            <el-date-picker v-model="form.recommendedFinalDate" type="date" 
            placeholder="请选择毕业时间" style="width: 100%;" value-format="yyyy-MM-dd hh:mm:ss"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="所修专业" prop="recommendedMajor">
            <el-input v-model="form.recommendedMajor" placeholder="请输入所修专业" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <h3 class="title text-left">技能荣誉：</h3>
    <div style="background: #fff;padding-top:20px">
      <el-row >
        <el-col :span="10">
          <el-form-item label="英语等级水平">
            <el-select v-model="form.recommendedEnglish" placeholder="请选择英语等级水平">
              <el-option label="无" value="" />
              <el-option label="CET-4" value="CET-4" />
              <el-option label="CET-6" value="CET-6" />
              <el-option label="雅思托福" value="雅思托福" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="计算机等级">
            <el-select v-model="form.recommendedComputer" placeholder="请选择计算机等级">
              <el-option label="无" value="" />
              <el-option label="一级" value="一级" />
              <el-option label="二级" value="二级" />
              <el-option label="三级" value="三级" />
              <el-option label="四级" value="四级" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="10">
          <el-form-item label="荣获证书">
            <el-input v-model="form.recommendedSchool" placeholder="请输入1-3个荣誉证书"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="专业技能">
            <el-input v-model="form.recommendedMajor" placeholder="请输入专业技能"/>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row >
        <el-col :span="20">
          <el-form-item label="荣获证书">
            <el-input v-model="form.recommendedGainCertificate" type="textarea" placeholder="请填写1-3个荣誉证书" :rows="4"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="20">
          <el-form-item label="专业技能">
            <el-input v-model="form.recommendedProfessionalInfo" type="textarea" placeholder="请填写专业技能" :rows="4"/>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <h3 class="title text-left">工作信息：</h3>
    <div style="background: #fff;padding-top:20px">
      <el-row >
        <el-col :span="20">
          <el-form-item label="工作经历">
            <el-input v-model="form.recommendedWorkInfo" type="textarea" placeholder="请填写工作经历" :rows="4"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="20">
          <el-form-item label="项目经验">
            <el-input v-model="form.recommendedProgramInfo" type="textarea" placeholder="请填写项目经验" :rows="4"/>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <h3 class="title text-left">其他信息：</h3>
    <div style="background: #fff;padding-top:20px">
      <el-row >
        <el-col :span="20">
          <el-form-item label="自我评价">
            <el-input v-model="form.recommendedSelfEvaluation" type="textarea" placeholder="请填写自我评价" :rows="4"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="简历图片" label-width="120px" prop="cover">
            <el-input v-model="form.recommendedPhoto" autocomplete="off" placeholder="图片 URL"></el-input>
            <el-upload
              class="img-upload"
              ref="upload"
              action="/march/covers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </div>

    <!-- <el-form-item label="自我评价以及荣誉情况">
      <el-input v-model="form.recommendedSelfEvaluation" type="textarea" />
    </el-form-item>
    <el-form-item label="专业技能">
      <el-input v-model="form.rcDescribe" type="textarea" />
    </el-form-item> -->
    <div style="width: 100%;display:flex;justify-content: center;">
      <el-form-item style="margin: 10px 0 20px 0">
        <el-button type="primary" @click="onSubmit">发送</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </div>
    
    
    <!-- <el-form-item prop="image_uri" style="margin-bottom: 30px;">
      <Upload v-model="form.image_uri" />
    </el-form-item> -->
  </el-form>
  </div>
</template>
<script>
import * as getData from '../../service/getData.js'
import Upload from '@/components/Upload/SingleImage3'
import * as global from '../../config/mUtils'

export default {
  components: {
    Upload
  },
  data() {
    return {
      fileList: [],
      form: {
        tjId: '',
        hrId: '',
        recruitId: '',
        sex: 0,
        recommendedName: '',
        recommendedProvince: '',
        recommendednation: '',
        recommendedEmail: '',
        recommendedBirth: '',
        recommendedPolitical: '',
        recommendedMarital: '',
        recommendedTelephone: '',
        recommendedAddress: '',
        recommendedIdcard: '',
        recommendedAttend: '',
        recommendedEducation: '',
        recommendedSchool: '',
        recommendedMajor: '',
        recommendedEnglish: '',
        recommendedComputer: '',
        recommendedProfessionalInfo: '',
        recommendedWorkInfo: '',
        recommendedProgramInfo: '',
        recommendedSelfEvaluation: '',
        recommendedPhoto: '',
        recommendedGainCertificate: '',
        recommendedAge: '',
      },
      url: '',
      rules: {
        recommendedName:[
          { required: true, message: "请输入被推荐人姓名", trigger: "blur" }
        ],
        recommendedTelephone: [
          { required: true, message: "请输入被推荐人联系方式", trigger: "blur" },
          { pattern: global.phoneRule, message: '联系方式格式不正确'},
        ],
        sex: [
          {required: true,message:"请选择性别",trigger:["blur","change"]},
        ],
        recommendedAge: [
          {required: true,message:"请输入年龄",trigger:["blur","change"]},
          { pattern: global.number, message: '年龄格式不正确'},
        ],
        recommendednation: [
          {required: true,message:"请输入民族",trigger:["blur","change"]},
        ],
        recommendedEmail: [
          {required: true,message:"请输入Email",trigger:["blur","change"]},
        ],
        recommendedBirth: [
          {required: true,message:"请选择出生日期",trigger:["blur","change"]},
        ],
        recommendedPolitical: [
          {required: true,message:"请选择政治面貌",trigger:["blur","change"]},
        ],
        recommendedMarital: [
          {required: true,message:"请选择婚姻状况",trigger:["blur","change"]},
        ],
        recommendedProvince: [
          {required: true,message:"请输入籍贯",trigger:["blur","change"]},
        ],
        recommendedAddress: [
          {required: true,message:"请输入家庭地址",trigger:["blur","change"]},
        ],
        recommendedIdcard: [
          {required: true,message:"请输入身份证号",trigger:["blur","change"]},
        ],
        recommendedAttend: [
          {required: true,message:"请选择就读状况",trigger:["blur","change"]},
        ],
        recommendedEducation: [
          {required: true,message:"请选择学历",trigger:["blur","change"]},
        ],
        recommendedSchool: [
          {required: true,message:"请输入毕业院校",trigger:["blur","change"]},
        ],
        recommendedFinalDate: [
          {required: true,message:"请选择毕业时间",trigger:["blur","change"]},
        ],
        recommendedMajor: [
          {required: true,message:"请输入所修专业",trigger:["blur","change"]},
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      
    }
  },
  mounted() {
    this.form.tjId= sessionStorage.getItem('userId') || 110;
    this.form.hrId = this.$route.query.hrId || 116;
    this.form.recruitId = this.$route.query.recruitId || 1;
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.recommendedGainCertificate = this.form.recommendedGainCertificate.replace('^','\n');
          this.form.recommendedProfessionalInfo = this.form.recommendedProfessionalInfo.replace('^','\n');
          this.form.recommendedWorkInfo = this.form.recommendedWorkInfo.replace('^','\n');
          this.form.recommendedProgramInfo = this.form.recommendedProgramInfo.replace('^','\n');
          this.form.recommendedSelfEvaluation = this.form.recommendedSelfEvaluation.replace('^','\n');
          getData.resumetAdd(this.form)
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
        } else {
          this.$message({
            message: "表单验证失败",
            type: "error"
          });
          return false;
        }
    })
    },
    onCancel() {
      if(this.$route.query.recruitId) {
        this.$router.push({
          path: `/detail/${this.$route.query.recruitId}`
        })
      }
    },
    handleRemove (file, fileList) {
    },

    handlePreview (file) {
    },

    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择1个文件，本次选择了${files.lenght}个文件，共选择了${files.length + fileList.length}个文件`)
    },

    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除${file.name}?`)
    },

    handleSuccess (response) {
      this.url = response
      this.form.recommendedPhoto = this.url
      this.$message.warning('上传成功')
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.title{
  font-size: 20px;
  padding: 5px;
  margin: 10px 0;
}
</style>