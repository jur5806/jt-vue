<!--
 * @Author: your name
 * @Date: 2021-04-03 13:27:47
 * @LastEditTime: 2022-04-30 14:22:07
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jt-vue\src\view\Login.vue
-->
<template>
  <body id="paper">
    <el-form :model="loginForm" class="login-container" label-position="left"
             label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox class="login_remember" v-model="checked"
                   label-position="left"><span style="color: #505458">记住密码</span></el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="login">登录</el-button>
        <router-link to="register"><el-button type="primary" style="width: 40%;background: #505458;border: none">注册</el-button></router-link>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import * as getData from '../service/getData'
import * as global from '../config/mUtils'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: [],
      checked: ''
    }
  },
  created(){
    if(global.getCookie('userName')&&global.getCookie('password')){
      this.loginForm.username = global.getCookie('userName');
      this.loginForm.password = global.getCookie('password');
      this.checked = true
    }
  },
  methods: {
    login () {
      console.log(this.$store.state)
      let data = {
        username: this.loginForm.username,
        password: this.loginForm.password,
      }
      if(this.checked){
        global.setCookie('userName',this.loginForm.username,7)
        global.setCookie('password',this.loginForm.password,7)
      }
      getData.checkLogin(data).then(res => {
        if (res.data.code === 200) {
          this.$store.commit('login', this.loginForm)
          var path = this.$route.query.redirect
          global.setSession('userName',res.data.data.username);
          global.setSession('userId',res.data.data.id);
          global.setStore('user', JSON.stringify(res.data.data))
          
          console.log(path)
          this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
        }else{
          this.$message({
              type: "error",
              message: res.data.message
            });
        }
      })
        .catch(failResponse => {
        })
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
    margin: 0;
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
