<template>
  <div>
    <el-menu
      default-active="0"
      class="categories"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      active-text-color="red">
      <el-menu-item v-for="(item, index) in leftMenu" :key="index" :index="item.id">
        <!-- <template slot="title"> -->
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        <!-- </template> -->
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-menu-item>
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      leftMenu: [
        {name: '全部', id: 0, path: '', icon: 'el-icon-location'},
        {name: '文学', id: 1, path: '', icon: 'el-icon-setting'},
        {name: '流行', id: 2, path: '', icon: 'el-icon-document'},
        {name: '文化', id: 3, path: '', icon: 'el-icon-menu'},
        {name: '生活', id: 4, path: '', icon: 'el-icon-location'},
        {name: '科技', id: 5, path: '', icon: 'el-icon-setting'},
        {name: '技术', id: 6, path: '', icon: 'el-icon-menu'}
      ],
      cid: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      this.cid = key
      this.$emit('indexSelect')
    }

  }
}
</script>
<style scoped>
.categories {
  /* position: fixed;
  margin-left: 50%;
  left: -600px;
  top: 100px;
  width: 150px; */
}

</style>
