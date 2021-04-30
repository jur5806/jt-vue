<template>
  <div>
    <el-row style="height: 840px">
      <v-LibrarySearchBar @onSearch="searchResult" ref="searchBar"></v-LibrarySearchBar>
      <el-tooltip effect="fark" placement="right"
                  v-for="(item, index) in books" :key="index">
        <p slot="content" style="font-size: 14px; margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px; margin-bottom: 6px;">
          <span>{{item.author}}</span>
          <span>{{item.date}}</span>
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
        <el-card class="book" body-style="padding:10px" shadow="hover">
          <div class="cover" @click="editBook(item)">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
            <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
          </div>
          <div class="author">{{item.author}}</div>
        </el-card>
      </el-tooltip>
      <v-LibraryEditForm @onSubmit="loadBooks()" ref="edit"></v-LibraryEditForm>
    </el-row>
    <el-row>
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pagesize"
      :total="books.length">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
import * as getData from '../../service/getData'
export default {
  data () {
    return {
      // books: [
      //   {
      //     cover: 'https://i.loli.net/2019/04/10/5cada7e73d601.jpg',
      //     title: '三体',
      //     author: '刘慈欣',
      //     date: '2019-05-05',
      //     press: '重庆出版社',
      //     abs: '文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……'
      //   }
      // ]
      books: [],
      currentPage: 1,
      pagesize: 17
    }
  },
  mounted () {
    this.loadBooks()
  },
  methods: {
  // 加载书籍
    loadBooks () {
      getData.getBooks()
        .then(res => {
          if (res && res.status === 200) {
            this.books = res.data.data
            console.log(this.books)
          }
        })
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    // 模糊搜索
    searchResult () {
      getData.searchBookPages(this.$refs.searchBar.keywords)
        .then(res => {
          if (res && res.status === 200) {
            this.book = res.data
          }
        })
    },
    // 删除
    deleteBook (id) {
      this.$confirm('确认要删除改数据信息，是否继续？', '删除书籍', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: id
        }
        getData.deleteBooks(data)
          .then(res => {
            if (res && res.status === 200) {
              this.loadBooks()
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 编辑书籍
    editBook (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        press: item.press,
        abs: item.abs,
        category: {
          id: item.category.id.toString(),
          name: item.category.name
        }
      }
    }

  }
}
</script>
<style scoped>
  .book{
    width: 135px;
    margin-bottom:20px;
    height:233px;
    float:left;
    margin-right:15px
  }
  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }
  .el-icon-delete {
    cursor: pointer;
    float: right;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>
