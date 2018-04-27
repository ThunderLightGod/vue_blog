<template>
  <div id="app">
    <blog-header @headerClick="headerClick"></blog-header>
    <router-view/>
    <blog-footer></blog-footer>
    <blog-sidebar :sideBarShow="sideBarShow" @sidebarClick="sidebarClick" :sideBarList="sideBarList"></blog-sidebar>
    <button v-show="backButtonShow" class="back-to-top" @click="backHandle">返回顶部</button>
  </div>
</template>

<script>
import BlogHeader from './components/BlogHeader.vue'
import BlogFooter from './components/BlogFooter.vue'
import BlogSidebar from './components/BlogSidebar.vue'
import {delCookie, getCookie} from './javascript/cookie'
export default {
  name: 'App',
  data () {
    return {
      sideBarShow: false,
      backButtonShow: false,
      sideBarList: [
        {
          url: '/',
          title: '首页',
          show: true
        },
        {
          url: '/AddBlog',
          title: '添加博客文章',
          show: true
        },
        {
          url: '/BlogBe/BlogManager',
          title: '查看博客文章',
          show: true
        }
      ]
    }
  },
  created () {
    if (getCookie('userName')) {
      this.$store.commit('changeLogin', {bool: true})
    }
  },
  methods: {
    backHandle (e) {
      if (window.scrollTo) {
        e.preventDefault()
        window.scrollTo({'behavior': 'smooth', 'top': 0})
      }
    },
    maskHandle () {
      this.sideBarShow = false
    },
    sidebarClick (value) {
      this.sideBarShow = false
    },
    headerClick (value) {
      if (value === '菜单栏') {
        this.sideBarShow = true
      }
      if (value === '注销') {
        this.$store.commit('changeLogin', {bool: false})
        this.$store.commit('saverouterPath', {path: ''})
        delCookie('userName')
        delCookie('userId')
        this.$message.success('您已退出登录！')
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollTop === 0) {
        this.backButtonShow = false
      } else {
        this.backButtonShow = true
      }
    })
  },
  components: {
    BlogHeader: BlogHeader,
    BlogFooter: BlogFooter,
    BlogSidebar: BlogSidebar
  }
}
</script>

<style lang="scss">
input:-webkit-autofill {
  background-color: #fff !important;
  -webkit-box-shadow: inset 0 0 0 1000px white !important;
}
.back-to-top {
  background: #312d29;
  color: #eee;
  padding: 6px 12px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, .1);
  letter-spacing: 4px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  border: 1px solid #999888;
  cursor: pointer;
}
@media screen and (max-width: 769px) {
  .back-to-top {
    width: 100%;
    margin: 90px auto;
    h3 {
      margin-left: 0px;
    }
  }
}
</style>
