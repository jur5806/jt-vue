<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
      <v-LibrarySideMenv></v-LibrarySideMenv>
        <!-- SideMenu -->
    </el-aside>
    <el-main>
      <!-- books -->
      <v-LibraryBooks class="books-area"></v-LibraryBooks>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'AppLibrary',
  data () {
    return {}
  },
  methods: {}
}
</script>
<style scoped>
.books-area {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
}
</style>
