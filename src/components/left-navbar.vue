<template>
  <el-menu
    :default-active="url"
    class="aside-cont navbar g-elmenu"
    background-color="#333743"
    active-text-color="#fff"
    text-color="#33CCFF"
    router
    :unique-opened="true"
    :collapse="isCollapse"
    style="width: 202px;font-size: 12px;"
    :key="url"
  >
  <!-- v-if侧边栏权限 -->
    <template v-for="(item,index) in sideList">{{item.leaf}}
      <el-submenu :index="index+''" v-if="item.leaf" :key="index">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item
          v-for="(child,childIndex) in item.children"
          :index="child.path"
          :key="index+childIndex+''"
        >{{child.name}}
        </el-menu-item>
        <!-- <template v-for="(childchild,myIndex) in isHaveChildren(item.children, true)" >
          <el-submenu :index="index+myIndex+'dd'"  :key="myIndex">
             <template slot="title">
              <span style="font-size:12px">{{childchild.name}}</span>
            </template>
             <el-menu-item
              v-for="(grandchild,grandchildIndex) in childchild.children" 
              :index="grandchild.path"
              :key="index+grandchildIndex+'ddds'"
            >{{grandchild.name}}
            </el-menu-item>
          </el-submenu>
        </template > -->
      </el-submenu>
      <!-- <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index">
        <i :class="'iconfont '+ item.icon"></i>
        <span>{{item.name}}</span>
      </el-menu-item> -->
    </template>
  </el-menu>
</template>

<script>

export default {
  data() {
    return {
      url: "",
      isCollapse: false,
      sideList: []
    };
  },
  props: ["urlList"],
  created() {
    this.url = this.$route.meta.activePath || this.$route.path;
    console.log(this.url)
    this.sideList = this.urlList;
    console.log(this.sideList)
  },
  mounted() {
  },
  computed: {},
  methods: {
    isHaveChildren(data, isHave) {
      // console.log(data)
      let res = data.filter( item => {
        if(isHave) {
          if(item.children) {
            return item
          }
        } else {
          if(!item.children) {
            return item
          }
        }
      })
      // console.log(res, 'data')
      return res
    }
  },
  components: {},
  watch: {
    // $route(val) {
    //   this.url = this.$route.meta.activePath || this.$route.path;
    // },
    urlList: {
      handler(val) {
        if (val) {
          this.url = this.$route.meta.activePath || this.$route.path;
          this.sideList = val;
        }
      },
      immediate: true
    }
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/mixin";

.el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
  border-left: 3px solid $bg;
  font-size: 12px;
}

.el-menu-item span,
.el-submenu__title span,
.el-submenu__title i {
  font-size: 14px;
  color: $blue;
}

.el-menu-item .iconfont,
.el-submenu__title .iconfont {
  color: $blue;
  margin-right: 10px;
  font-size: 14px;
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
  line-height: 20px;
}

.el-menu-item.is-active,
.el-submenu__title.is-active {
  background-color: $active-bg !important;
  border-left: 3px solid $line-color;
}

.el-menu-item.is-active span,
.el-submenu__title.is-active span {
  color: $fc;
}

.el-menu-item.is-active i,
.el-submenu__title.is-active i {
  margin-right: 10px;
  font-size: 14px;
  color: $fc;
}

.g-elmenu .is-opened .el-submenu__title span {
  color: $blue;
}

.g-elmenu .is-opened i {
  color: $blue;
}
</style>
