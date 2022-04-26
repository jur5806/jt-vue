<template>
  <div style="text-align: left">
    <el-form :model="loginForm" :rules="rules" ref="adminInfo2"
              label-width="120px">
      <el-form-item prop="username" label="账号：">
        <el-input type="text" v-model="loginForm.username" maxlength="10"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码：">
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：" prop="name">
        <el-input type="text" v-model="loginForm.name" 
                  auto-complete="off" placeholder="真实姓名"></el-input>
      </el-form-item>
      <el-form-item  label="电话号码：" prop="phone">
        <el-input type="text" v-model="loginForm.phone"
                  auto-complete="off" placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item label="E-Mail：" prop="email">
        <el-input type="text" v-model="loginForm.email" 
                  auto-complete="off" placeholder="E-Mail"></el-input>
      </el-form-item>
    </el-form>
    <p style="text-align:center">
      <el-button type="primary" style="width: 40%;background: #505458;border: none;text-align:center" v-on:click="register">添加</el-button>
    </p>
  </div>
</template>

<script>
import * as getData from '../service/getData'
import * as global from '../config/mUtils'
    export default {
        name: 'BulkRegistration',
      data () {
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
          dialogFormVisible: false,
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
          loginForm: {
            username: '',
            password: '',
            name: '',
            phone: '',
            email: ''
          }
        }
      },
      methods: {
        clear () {
          this.loginForm = {
            username: '',
            password: '',
            name: '',
            phone: '',
            email: ''
          },
          this.dialogFormVisible = false
        },
        register () {
          this.$refs['adminInfo2'].validate((valid) => {
            if (valid) {
              getData.register({
                  username: this.loginForm.username,
                  password: this.loginForm.password,
                  name: this.loginForm.name,
                  phone: this.loginForm.phone,
                  email: this.loginForm.email
                })
                .then(resp => {
                  if (resp.data.code === 200) {
                    
                    this.$alert('注册成功', '提示', {
                      confirmButtonText: '确定'
                    })
                    // this.clear()
                    this.$emit('onSubmit')
                    this.$emit('close')
                  } else {
                    this.$alert(resp.data.message, '提示', {
                      confirmButtonText: '确定'
                    })
                  }
                })
                .catch(failResponse => {})
            } else {
              return false
            }
          });
        }
      }
    }
</script>

<style scoped>
  .add-button {
    margin: 18px 0 0 10px;
  }
</style>
