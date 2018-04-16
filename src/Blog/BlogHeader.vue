<template>
  <div>
      <nav class="fixed-top">
        <div class="logo">
          <a href="#">王二小</a>
        </div>
        <ul>
          <li v-for="(item, index) in navList" :key="index">
            <a href="#" :url="item.url" @click="headerClick(item.title)">{{item.title}}</a>
          </li>
        </ul>
      </nav>
      <div id="banner">
        <div class="inner">
          <h1>王二小</h1>
          <p class="sub-heading">一起学习一起学习一起学习一起学习一起学习</p>
          <button>了解我</button>
          <div class="more">
            更多
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    navList: {
      type: Array,
      required: true
    }
  },
  methods: {
    headerClick (title) {
      this.$emit('headerClick', title)
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: transparent;
  height: 50px;
  & ul {
    list-style: none;
    margin: 0;
    float: right;
    & li {
      display: inline-block;
      line-height: 50px;
      margin-right: 20px;
    }
  }
  & .logo {
    display: inline-block;
    line-height: 50px;
    margin-right: 20px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2px;
    padding-left: 40px;
  }
}
nav ul li a,nav .logo a {
  line-height: 50px;
  text-decoration: none;
  display: inline-block;
  height: inherit;
  color: #fff;
}
#banner {
  background: rgba(0, 0, 0, .3);
  height: 700px;
  & .inner {
    max-width: 300px;
    text-align: center;
    margin: 0 auto;
    position: relative;
    top:160px;
    & h1 {
      margin: 0;
      padding: 15px 0px;
      border-top: 2px solid #fed;
      border-bottom: 2px solid #fed;
      color: #fff;
    }
    & .more {
      margin-top: 270px;
    }
    & .sub-heading {
      line-height: 30px;
      margin: 30px;
    }
  }
  & button {
    border: 1px solid #11bb99;
    background: #11BBAA;
    color: #eee;
    padding: 14px 40px;
    border-radius: 8px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, .1);
    letter-spacing: 4px;
  }
}
</style>
