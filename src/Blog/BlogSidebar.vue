<template>
  <div>
    <div id="sidebar" :class="{'sideBarShow': sideBarShow}">
      <ul>
        <li v-for="(item, index) in sideBarList" :key="index">
          <a href="#" :url="item.url" @click="sidebarClick(item.title)">{{item.title}}</a>
        </li>
      </ul>
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
    sideBarList: {
      type: Array,
      required: true
    },
    sideBarShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    sidebarClick (title) {
      this.$emit('sidebarClick', title)
    }
  }
}
</script>
<style lang="scss" scoped>
#sidebar {
  width: 250px;
  background: #333;
  color: #fff;
  position: fixed;
  top: 0;
  right: -250px;
  bottom: 0;
  padding: 20px 0;
  transition: right 0.5s;
  &.sideBarShow {
    position: fixed;
    right: 0;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    a {
      color: #fff;
      padding: 10px 30px;
      display: inline-block;
      text-decoration: none;
      width: 100%;
      &:hover {
        background: #444;
      }
    }
  }
}
</style>
