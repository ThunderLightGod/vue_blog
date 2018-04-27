<template>
  <div class="header">
      <nav class="fixed-top">
        <div class="logo">
          <router-link to="'/'">博客天地</router-link>
        </div>
        <ul>
          <li v-for="item in $store.state.navList" :key="item.id" v-if="item.show">
            <a href="#" @click="headerClick(item.url, item.title)">{{item.title}}</a>
          </li>
        </ul>
      </nav>
  </div>
</template>
<script>
export default {
  methods: {
    headerClick (url, title) {
      this.$router.push({path: url})
      this.$emit('headerClick', title)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #333;
  height: 50px;
  width: 100%;
  nav {
    background-color: #333;
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
}
nav ul li a,nav .logo a {
  line-height: 50px;
  text-decoration: none;
  display: inline-block;
  height: inherit;
  color: #fff;
}
@media screen and (max-width: 769px) {
  .header {
    .nav {
      width: 100%;
      margin: 0 auto;
      ul {
        li {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
