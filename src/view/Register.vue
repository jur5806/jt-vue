<template>
  <body id="paper">
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">用户注册</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="name">
      <el-input type="text" v-model="loginForm.name"
                auto-complete="off" placeholder="真实姓名"></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input type="text" v-model="loginForm.phone"
                auto-complete="off" placeholder="电话号码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="loginForm.email"
                auto-complete="off" placeholder="E-Mail"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
import * as getData from '../service/getData'
import * as global from '../config/mUtils'

export default{
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
      rules: {
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {validator: checkChinese, trigger: ['blur', 'change']},
        ],
        name: [{required: true, message: '真实姓名不能为空', trigger: 'blur'}],
        phone: [{required: true, message: '电话号码不能为空', trigger: 'blur'},
        {pattern: global.phoneRule5, message: '联系方式格式错误'}],
      },
      checked: true,
      loginForm: {
        username: '',
        password: '',
        name: '',
        phone: '',
        email: ''
      },
      loading: false
    }
  },
  methods: {
    register () {
      var _this = this
      getData.register({
        username: this.loginForm.username,
        password: this.loginForm.password,
        name: this.loginForm.name,
        phone: this.loginForm.phone,
        email: this.loginForm.email
      }).then(resp => {
        console.log(resp)
        if (resp.data.code === 200) {
          this.$alert('注册成功', '提示', {
            confirmButtonText: '确定'
          })
          _this.$router.replace('/login')
        } else {
          this.$alert(resp.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      }).catch(failResponse => {})
    }
  }
}
</script>
<style>
  #paper {
    background:url("../assets/img/bg/eva1.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
