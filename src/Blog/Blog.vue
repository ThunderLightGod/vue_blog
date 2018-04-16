<template>
  <div class="main-wrapper">
    <blog-header @headerClick="headerClick" :nav-list="navList"></blog-header>
    <div class="content">
      <section class="green-section">
        <div class="wrapper">
          <div>
            <h2>一个标题</h2>
            <div class="hr"></div>
            <p>一起学习一起学习一起学习一起学习一起学习</p>
          </div>
          <div class="icon-group">
            <span class="icon">item</span>
            <span class="icon">item</span>
            <span class="icon">item</span>
          </div>
        </div>
      </section>
      <section class="gray-section">
        <div class="article-preview clearfix">
          <div class="text-section">
            <h2>又有一个标题</h2>
            <div class="sub-heading">
              副标题
            </div>
            <p>又有一个标题又有一个标题又有一个标题</p>
          </div>
          <div class="img-section">
            <img src="/static/images/apic23847_sc115.com.jpg" alt="">
          </div>
        </div>
        <div class="article-preview clearfix">
          <div class="img-section">
            <img src="/static/images/tooopen_sy_158723161481.jpg" alt="">
          </div>
          <div class="text-section">
            <h2>又有一个标题</h2>
            <div class="sub-heading">
              副标题
            </div>
            <p>又有一个标题又有一个标题又有一个标题</p>
          </div>
        </div>
      </section>
      <section class="purple-section">
        <div class="wrapper">
          <div class="heading-wrapper">
            <h2>有一个标题</h2>
            <div class="hr"></div>
            <div class="sub-heading">
              一起学习一起学习一起学习一起学习一起学习
            </div>
          </div>
          <div class="card-group clearfix">
            <div class="card">
              <h3>标题三</h3>
              <p>一起学习一起学习一起学习一起学习一起学习</p>
            </div>
            <div class="card">
              <h3>标题三</h3>
              <p>一起学习一起学习一起学习一起学习一起学习</p>
            </div>
            <div class="card">
              <h3>标题三</h3>
              <p>一起学习一起学习一起学习一起学习一起学习</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <blog-footer></blog-footer>
    <div v-show="mask" class="mask" @click="maskHandle"></div>
    <blog-sidebar :sideBarShow="sideBarShow" @sidebarClick="sidebarClick" :sideBarList="sideBarList"></blog-sidebar>
    <button v-show="backButtonShow" class="back-to-top" @click="backHandle">返回顶部</button>
    <!-- <date-picker v-model="myInput"></date-picker> -->
  </div>
</template>
<script>
import '../assets/styles/normalize.css'
import datePicker from '../components/datePicker.vue'
import BlogHeader from './BlogHeader.vue'
import BlogFooter from './BlogFooter.vue'
import BlogSidebar from './BlogSidebar.vue'
export default {
  data () {
    return {
      mask: false,
      sideBarShow: false,
      myInput: '',
      backButtonShow: false,
      navList: [
        {
          url: '',
          title: '首页'
        },
        {
          url: '',
          title: '标题1'
        },
        {
          url: '',
          title: '菜单栏'
        }
      ],
      sideBarList: [
        {
          url: '',
          title: '首页'
        },
        {
          url: '',
          title: '标题1'
        },
        {
          url: '',
          title: '菜单栏'
        }
      ]
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
      this.mask = false
      this.sideBarShow = false
    },
    sidebarClick (value) {
      // if (value === '菜单栏') {
      //   this.mask = false
      //   this.sideBarShow = false
      // }
    },
    headerClick (value) {
      if (value === '菜单栏') {
        this.mask = true
        this.sideBarShow = true
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
    datePicker: datePicker,
    BlogFooter: BlogFooter,
    BlogHeader: BlogHeader,
    BlogSidebar: BlogSidebar
  }
}
</script>
<style lang="scss" scoped>
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
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4)
}
.main-wrapper {
  background: #444 url('/static/images/510539206f8de.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  .green-section {
    text-align: center;
    background: #089db0;
    color: #fff;
    padding: 100px 0;
    .wrapper {
      max-width: 1080px;
      margin: 0 auto;
      .hr {
        background: #0689a3;
        width: 60%;
      }
      .icon-group {
        margin-top: 50px;
        .icon {
          display: inline-block;
          width: 80px;
          height: 80px;
          border: 1px solid #1089a1;
          background: rgb(20, 174, 201);
          transform: rotate(45deg);
          margin: 0px 20px;
        }
      }
    }
  }
  .gray-section {
    background: rgb(43, 61, 78);
    .article-preview {
      font-size: 0;
      & > div {
        float: left;
      }
      &:nth-child(odd) {
        background: rgba(255, 255, 255, 0.05);
      }
      .img-section {
        width: 45%;
        img {
          width: 100%;
        }
      }
      .text-section {
        color: #fff;
        width: 55%;
        position: relative;
        top: 50px;
        left: 40px;
        & > div {
          max-width: 90%;
        }
        h2 {
          margin-bottom: 20px;
        }
        p {
          font-size: 18px;
          letter-spacing: 1px;
        }
        .sub-heading {
          line-height: 30px;
          font-size: 21px;
          margin-bottom: 35px;
        }
      }
    }
  }
  .purple-section {
    padding: 80px;
    background: #262149;
    color: #fff;
    .heading-wrapper {
      text-align: center;
      .hr {
        background: #373259;
        width: 60%;
      }
      .sub-heading {
        line-height: 30px;
        font-size: 21px;
        margin-bottom: 35px;
      }
    }
    .card-group {
      .card {
        float: left;
        width: 50%;
        min-height: 300px;
        padding: 20px;
        box-sizing: border-box;
        h3 {
          text-align: center;
        }
        &:nth-child(1) {
          background: rgba(0, 0, 0, 0.05)
        }
        &:nth-child(2) {
          background: rgba(0, 0, 0, 0.09)
        }
        &:nth-child(3) {
          background: rgba(0, 0, 0, 0.13)
        }
      }
    }
  }
}
.hr {
  width: 100%;
  margin: 20px auto;
  height: 2px;
}
h2 {
  margin: 0;
  font-size: 30px;
}
h3 {
  margin: 0;
  font-size: 24px;
}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
p {
  font-size: 18px;
  letter-spacing: 1px;
}
</style>
