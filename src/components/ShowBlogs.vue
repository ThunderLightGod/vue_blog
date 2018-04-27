<template>
  <div id="show-blogs">
    <div class="left">
      <div class="people" v-if="$store.state.isLogin">
        <div>{{author}}</div>
        <div class="introduction" v-if="$store.state.isManager">
          <el-input @blur="commitIntroduction" type="textarea" v-model="user.introduction"></el-input>
        </div>
        <div class="intro" v-else>
          {{user.introduction}}
        </div>
      </div>
      <div class="search">
        <span><i class="el-icon-search"></i>搜索</span>
        <el-input type="search" v-model="search"></el-input>
      </div>
      <div class="typeList">
        <a v-randomsize v-rainbow v-for="typeItem in typeList" :key="typeItem.id" @click="typeSearch(typeItem.type)">
          {{typeItem.type}}
        </a>
      </div>
    </div>
    <div class="right" v-if="blogList.length > 0">
      <div v-for="blogItem in blogList" :key="blogItem.id" class="single-blog">
        <h3>
          <router-link :to="'/Blog/' + blogItem.id" v-html="blogItem.title"></router-link>
        </h3>
        <div class="type-date">
          <div class="type">
            <ul>
              <li v-rainbow v-for="categorieItem in blogItem.categories" :key="categorieItem">
                {{categorieItem}}
              </li>
            </ul>
          </div>
          <div class="date">发表于&nbsp;{{blogItem.date | formatDate}}&nbsp;<span class="el-icon-time"></span></div>
        </div>
        <article class="desc">
          {{blogItem.desc | snippet}}
        </article>
        <div class="edit" v-if="$store.state.isManager">
          <router-link class="btn" :to="'/BlogEdit/' + blogItem.id">编辑</router-link>
        </div>
        <div class="edit" v-else>
          <router-link class="btn" :to="'/Blog/' + blogItem.id">阅读全文</router-link>
        </div>
      </div>
      <el-pagination
      class="pagination"
      :total="count"
      :current-page="currentPage"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 100]"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next ,jumper">
      </el-pagination>
    </div>
    <div v-else-if="blogList.length === 0 && isrequire" class="no-blog">
      <div class="face">
        <div class="left-eye"></div>
        <div class="right-eye"></div>
        <div class="top-mouth"></div>
        <div class="bottom-mouth"></div>
      </div>
      <div class="info">没有找到您要寻找的博客文章</div>
    </div>
  </div>
</template>
<script>
import {formatDate} from '../javascript/formatDate'
import {getCookie} from '../javascript/cookie'
export default {
  data () {
    return {
      user: {
        id: '',
        userName: '',
        passWord: '',
        introduction: ''
      },
      blogList: [],
      search: '',
      count: 0,
      limit: 10,
      currentPage: 1,
      author: '',
      typeList: [
        {
          id: 0,
          type: 'Vue.js'
        },
        {
          id: 1,
          type: 'Node.js'
        },
        {
          id: 2,
          type: 'React.js'
        },
        {
          id: 3,
          type: '其他'
        }
      ],
      type: '',
      isrequire: false
    }
  },
  created () {
    this.author = getCookie('userName')
    this.getUser()
    this.getBlogList()
  },
  methods: {
    typeSearch (type) {
      this.currentPage = 1
      this.type = type
      this.getBlogList()
    },
    getUser () {
      if (this.$store.state.isLogin) {
        this.$http.get('api/userList/' + getCookie('userId')).then(res => {
          this.user = res.body
          this.user.introduction = this.user.introduction ? this.user.introduction : '这个人很懒，什么也没留下'
        }).catch(err => {
          this.$message.error(err.data.message)
        })
      }
    },
    getBlogList () {
      let params = {
        author: this.$store.state.isManager ? this.author : undefined,
        _page: this.currentPage ? this.currentPage : 1,
        _sort: 'date',
        _order: 'DESC',
        _limit: this.limit ? this.limit : undefined,
        title_like: this.search ? this.search : undefined,
        categories: this.type ? this.type : undefined
      }
      this.isrequire = false
      this.$http.get('api/blogList', {params: params}).then((res) => {
        this.$nextTick(() => {
          this.isrequire = true
          if (this.search !== '') {
            let reg = this.search
            res.body.forEach(item => {
              item.title = item.title.replace(reg, '<span style="background: #ffff00;">' + reg + '</span>')
            })
          }
          this.blogList = res.body
          this.count = parseInt(res.headers.map['x-total-count'][0])
        })
      }).catch(err => {
        this.isrequire = true
        this.$message.error(err.data.message)
      })
    },
    commitIntroduction () {
      let params = this.user
      this.$http.patch('api/userList/' + getCookie('userId'), params).then(res => {
        this.$message.success('修改个人简介成功！')
      }).catch(err => {
        this.$message.error(err.data.message)
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getBlogList()
    },
    handleSizeChange (val) {
      this.limit = val
      this.currentPage = 1
      this.getBlogList()
    }
  },
  filters: {
    formatDate (value) {
      var date = new Date(value)
      return formatDate(date, 'yyyy-MM-dd')
    },
    snippet (value) {
      if (value.length > 25) {
        value = value.slice(0, 25) + '...'
      }
      return value
    }
  },
  watch: {
    '$route' (to, from) {
      this.author = getCookie('userName')
      this.getUser()
      this.getBlogList()
    },
    search: function () {
      this.getBlogList()
    }
  }
}
</script>
<style lang="scss" scoped>
#show-blogs {
  width: 1000px;
  margin: 50px auto;
  overflow: hidden;
  zoom: 1;
  &::after {
    clear: both;
    content: '';
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .left {
    width: 20%;
    float: left;
    text-align: center;
    .people {
      width: 100%;
      padding: 10px 0;
      font-size: 18px;
      font-weight: 100;
      line-height: 30px;
      margin-top: 20px;
      .intro {
        font-size: 14px;
        border-top: 2px dotted #658;
        margin-top: 20px;
      }
      .introduction {
        width: 60%;
        margin: 20px auto;
        border-top: 2px dotted #658;
        padding-top: 20px;
      }
    }
    .search {
      width: 80%;
      margin: 40px auto;
      span {
        margin-bottom: 10px;
        display: inline-block;
      }
    }
    .typeList {
      width: 80%;
      margin: 0 auto;
      text-align: center;
      line-height: 2;
      a {
        margin: 10px 20px;
        display: inline-block;
        cursor: pointer;
      }
    }
  }
  .right {
    width: 70%;
    float: left;
    margin-left: 50px;
    padding-left: 40px;
    border-left: 2px dotted #eee;
    .single-blog {
      padding: 20px;
      margin: 0 10px 50px 10px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 0 8px rgba(10, 13, 11, .1);
      h3 {
        width: 100%;
        word-break: break-word;
        margin: 0;
        display: inline-block;
        line-height: 1.2;
        vertical-align: top;
        padding-left: 15px;
        text-align: center;
        a {
          color: #555;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background: #000;
            visibility: hidden;
            transform: scaleX(0);
            transition-duration: .2s;
            transition-timing-function: ease-in-out;
            transition-delay: 0s;
          }
        }
        a:hover {
          &::before {
            visibility: visible;
            transform: scaleX(1)
          }
        }
      }
      .desc {
        margin-top: 10px;
        padding: 10px 30px;
        color: #444;
      }
      .edit {
        margin-top: 40px;
        text-align: center;
        .btn {
          display: inline-block;
          padding: 0 20px;
          font-size: 14px;
          color: #fff;
          background: #222;
          border: 2px solid #222;
          border-radius: 2px;
          transition-property: background-color;
          line-height: 2;
          transition-duration: .2s;
          transition-timing-function: ease-in-out;
          transition-delay: 0s;
          &:hover {
            background: #fff;
            color: #222;
            border-color: #222;
          }
        }
        a {
          text-decoration: none;
        }
      }
      .type-date {
        height: 30px;
        line-height: 0px;
        overflow: hidden;
        font-size: 12px;
        padding-bottom: 6px;
        border-bottom: 1px dotted #999;
        .type {
          ul {
            padding: 0;
            li {
              float: left;
              list-style: none;
              background: #fff;
              margin: 0 10px;
              padding: 5px;
              color: rgb(201, 72, 21);
              border-radius: 10px;
            }
          }
        }
        .date {
          float: right;
          color: #999;
        }
      }
      .reader {
        margin-top: 40px;
        text-align: center;
        .btn {
          display: inline-block;
          padding: 0 20px;
          font-size: 14px;
          color: #fff;
          border: 2px solid #222;
          background: #222;
          border-radius: 2px;
          transition-property: background-color;
          line-height: 2;
          transition-duration: .2s;
          transition-timing-function: ease-in-out;
          transition-delay: 0s;
          transition-delay: 0s;
          &:hover {
            background: #fff;
            color: #222;
            border-color: #222;
          }
        }
        a {
          text-decoration: none;
        }
      }
    }
  }
}
.no-blog {
  width: 70%;
  float: left;
  margin-left: 50px;
  padding-left: 40px;
  border-left: 2px dotted #eee;
  .face {
    width: 200px;
    margin: 0 auto;
    border-radius: 150px;
    border: 6px solid #444;
    height: 200px;
    position: relative;
    .left-eye {
      width: 15px;
      height: 15px;
      position: absolute;
      top: 57px;
      left: 50px;
      border: 6px solid #444;
      border-radius: 18px;
      background: #444;
    }
    .right-eye {
      width: 15px;
      height: 15px;
      position: absolute;
      top: 57px;
      left: 120px;
      border: 6px solid #444;
      border-radius: 18px;
      background: #444;
    }
    .top-mouth {
      width: 60px;
      height: 60px;
      position: absolute;
      top: 105px;
      left: 60px;
      border: 10px solid #444;
      border-radius: 55px;
    }
    .bottom-mouth {
      width: 80px;
      height: 45px;
      position: absolute;
      top: 140px;
      left: 60px;
      background: #fff;
    }
  }
  .info {
    text-align: center;
    font-size: 20px;
    margin: 20px;
  }
}
@media screen and (max-width: 769px) {
  #show-blogs {
    width: 100%;
    .left {
      width: 100%;
    }
    .right {
      width: 70%;
      margin-left: 0px;
      padding-left: 0px;
      border-left: none;
      border-top: 2px dotted #333;
      padding-top: 50px;
      position: relative;
      z-index: 1;
      min-height: 500px;
    }
    .no-blog {
      width: 100%;
      margin-left: 0;
      padding-left: 0;
      border-left: none;
      border-top: 2px dotted #333;
      padding-top: 50px;
    }
    .pagination {
      overflow: scroll;
    }
  }
}
</style>
