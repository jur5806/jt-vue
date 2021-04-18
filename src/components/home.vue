<template>
  <div>
    <!--  -->
    <el-container class="container">
      <!-- <lang-select class="right-menu-item hover-effect" /> -->
      <el-header class="header flex-box">
        <ul class="main-nav">
          <li class="main-nav-item">
            <i class="el-icon-setting"></i>
            <p>个人中心</p>
          </li>
          <!-- 跳转领导层 -->
         
          <li class="main-nav-item">
            <i class="el-icon-setting"></i>
            <p>管控中心1</p>
          </li>
          <li class="main-nav-item">
            <i class="el-icon-setting"></i>
            <p>管控中心//</p>
          </li>
          <li class="main-nav-item"><lang-select class="right-menu-item hover-effect" /><p>11</p></li>
        </ul>
        
        <h3 style="color: #fff;">HR人才推荐系统</h3>
        <ul class="header-right flex-box">
          <li>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-setting"></i>
                王小虎
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </span>
              <el-dropdown-menu slot="dropdown">
                <div  @click.stop="openSetings()">
                  <el-dropdown-item>账号设置</el-dropdown-item>
                </div>
                <el-dropdown-item>我的推荐</el-dropdown-item>
                <div  @click.stop="loginOut()">
                  <el-dropdown-item>退出账号</el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
          <!-- <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <div  @click.stop="openSetings()">
              <el-dropdown-item>账号设置</el-dropdown-item>
            </div>
            <el-dropdown-item>我的推荐</el-dropdown-item>
            <div  @click.stop="loginOut()">
              <el-dropdown-item>退出账号</el-dropdown-item>
            </div>
          </el-dropdown-menu> -->
        
        <!-- <span>王小虎</span> -->
      </el-header>
      <el-container style="height: 100%;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 100%;">
          <v-nav-menu></v-nav-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import * as getData from '../service/getData'
import * as global from '../config/mUtils'
import LangSelect from '../components/LangSelect/index'
export default {
  name: 'Home',
  components: {
    LangSelect
  },
  data () {
    return {}
  },
  methods: {
    openSetings () {
      console.log('456546')
      this.$router.push({path: '/accountSettings'})
    },
    loginOut() {
      this.$confirm("确认注销吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          getData.logout().then(res => {
            if(res.data.code == 200){
              window.sessionStorage.clear();
              this.$router.push({path: '/login'})
            };
          }).catch(_ => {
          console.log(_);
        });
      })
      .catch(() => {});
    },
  }
}
</script>
<style scoped lang="scss">
@import "../assets/css/mixin";

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.right-menu {
  float: right;
  height: 100%;
  line-height: 50px;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.container {
  width: 100%;
  height: 100%;
  background-color: #f8f8f9;
  /*min-width: 1300px;*/
  .header {
    height: 58px;
    padding: 0;
    background-color: #50566b;
    justify-content: space-between;
    > .el-menu {
      height: calc(100% - 90px);
      height: -moz-calc(100% - 90px);
      height: -webkit-calc(100% - 90px);
      border-right: none;
      background-color: transparent;
      text-align: left;

      &:not(.el-menu--collapse) {
        width: 270px;
        overflow: auto;
      }
    }
    .collapse {
      padding: 0 16px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;

      i {
        color: #2a92e7;
        font-size: 20px;
      }

      &:hover {
        background-color: rgba(42, 146, 231, 0.2);
      }
    }

    .g-searchinput {
      margin-left: 35px;
      width: 229px;
      height: 43px;
    }

    .crumb-box {
      flex: 1;
    }

    .user-box {
      margin-right: 30px;

      .btn {
        color: #657984;
        padding: 0 10px;
        height: 50px;
        line-height: 50px;
        cursor: pointer;

        &:hover {
          background-color: rgba(42, 146, 231, 0.2);
        }

        i {
          font-size: 20px;
        }
      }
    }

    .navbar li.el-menu-item:hover {
      background-color: rgb(80, 86, 107);
    }
  }

  .aside-cont {
    position: relative;
    background-color: #333743;

    .logo {
      position: relative;
      height: 90px;
      /*background-color: #f8f8f9;*/
      overflow: hidden;
      position: relative;
      text-align: center;
      padding: 0 10px;

      .f-imgtopbox {
        position: absolute;
        top: 20px;
        left: 50%;
        margin-left: -24px;
        @include wh(45px, 49px);
      }

      .f-imgtopbox2 {
        position: absolute;
        top: 20px;
        left: 50%;
        margin-left: -80px;
        @include wh(160px, 49px);
      }

      .img1 {
        width: 45px;
      }

      .img2 {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    > .el-menu {
      height: calc(100% - 90px);
      height: -moz-calc(100% - 90px);
      height: -webkit-calc(100% - 90px);
      border-right: none;
      background-color: transparent;
      text-align: left;

      &:not(.el-menu--collapse) {
        width: 270px;
        overflow: auto;
      }
    }

    .g-userinfo {
      position: relative;
      height: 90px;
      border-bottom: 2px solid #333743;

      .imgsboxs {
        position: relative;
        width: 52px;
        height: 52px;
        border: 1px solid #007de3;
        border-radius: 50%;
        margin-right: 20px;

        img {
          width: 52px;
          height: 52px;
          object-fit: cover;
          border-radius: 50%;
        }

        &:after {
          position: absolute;
          content: "";
          right: 0;
          bottom: 6px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #007de3;
          border: 1px solid #ffffff;
        }
      }

      .smallimgsboxs {
        position: absolute;
        margin: 0;
        top: 18px;
        left: 50%;
        margin-left: -26px;
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .main {
    position: relative;
    background: #ebeef2;
    padding: 10px 15px;
    box-sizing: border-box;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    flex: 1;

    .main-box {
      overflow: auto;
      /*padding: 15px;*/
      min-width: 930px;
      padding-bottom: 20px;
      flex: 1;
    }

    > .main-wrap {
      width: 100%;
      height: 100%;
      background: #fff;
      box-sizing: border-box;
    }
  }

  .main1 {
    position: relative;
    flex: 1;

    .main-box {
      overflow: auto;
      min-width: 1030px;
      flex: 1;
    }
  }
}

.img {
  width: 55px;
  height: 35px;
  margin-right: 10px;
}

.content-right {
  flex: 1;
}

.index-side-list {
  padding: 20px 10px;
  padding-left: 0;
  max-height: 100%;
  box-sizing: border-box;
  overflow: auto;

  li {
    display: flex;
    padding: 10px;
    width: 161px;
    border-left: 3px solid #333743;
    margin-top: 4px;

    h3 {
      color: #fff;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
    }

    p {
      color: rgba(51, 204, 255, 0.768627450980392);
      font-size: 10px;
    }

    i {
      font-size: 14px;
    }
  }

  .active {
    background: #14161b;
    border-left: 3px solid #0cb1f8;
    color: #fff;

    p {
      i,
      span {
        color: #fff;
      }
    }
  }

  .active2 {
    background: #0babf7;
    border: 1px solid #0babf7;

    p {
      color: #fff;
    }
  }
}

.side-btn {
  background: #333743;
  color: #0babf7;
  border: 1px solid rgba(11, 171, 247, 1);
  width: 100%;
}

.side-btn:hover,
.side-btn:focus {
  background: #333743;
  color: #0babf7;
  border: 1px solid rgba(11, 171, 247, 1);
}

.header-nav {
  /*width: 60%;*/
  margin-left: 20px;

  li {
    /*flex: 1;*/
    text-align: center;
    border-bottom: 4px solid #50566b;
    color: #fff;
    margin-left: 20px;
    padding: 18px 20px;
    cursor: pointer;

    p {
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
    }
  }

  li:hover {
    border-bottom: 4px solid #0babf7;
    color: #0babf7;
  }

  .active {
    border-bottom: 4px solid #0babf7;
    color: #0babf7;
  }
}

.system-name {
  padding-left: 20px;
  text-align: left;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
 {
  transform: translateX(-200px);
  opacity: 0;
}

.g-elmenu {
  width: 160px;
}

.dialog__checkSystem {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
  z-index: 1000;
}

.toggle_system {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #3c4152;
  min-height: 126px;

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    padding: 12px;
    padding-top: 2px;

    li {
      width: 108px;
      height: 100px;
      border: 1px solid #3c4152;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      margin-left: 20px;
      margin-top: 10px;
      text-align: center;
      color: #fff;
      cursor: pointer;

      p {
        line-height: 24px;
        font-size: 12px;
        margin-top: -15px;
      }
    }

    .active {
      border: 1px solid #0fc5fc;
    }
  }
}

.system_icon {
  width: 88px;
  height: 88px;
}

.dialog-wrap-show {
  animation: dialog-show 0.3s ease-in-out;
}

.dialog-wrap-hidden {
  animation: dialog-hidden 0.3s ease-in-out;
}

.main-nav {
  display: flex;
  min-width: 89px;

  .main-nav-item {
    display: flex;
    align-items: center;
    height: 100%;
    text-align: center;
    color: #fff;
    margin-left: 20px;
    padding: 8px 20px;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    background: rgba(255, 255, 255, 0);

    p {
      margin-left: 5px;
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
    }

    .iconfont {
      font-size: 22px;
    }
  }

  .active {
    background: #0099ff;
    color: #fff;
  }
}

@keyframes dialog-show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dialog-hidden {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>
