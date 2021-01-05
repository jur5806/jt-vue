<template>
  <!-- <el-card>
      用户名:<input type="text" v-model="loginForm.username" placeholder="请输入用户名"/>
      <br><br>
      密码： <input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
      <br><br>
      <button v-on:click="login">登录</button>
  </el-card> -->
  <div>
    <el-form class="login-contenter" label-position="left" label-width="0px">
      <h3 class="login_title"> 系统登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username" placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" placeholder="密码">
        </el-input>
      </el-form-item>
        <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as getData from '../service/getData'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      let data = {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      getData.checkLogin(data).then(res => {
        if (res.data.code === 200) {
          this.$router.replace({path: '/index'})
        }
      })
        .catch(failResponse => {
        })
    }
  }
}
</script>
<style>
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
</style>
