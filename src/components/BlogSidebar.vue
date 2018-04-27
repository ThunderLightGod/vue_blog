<template>
  <div>
    <div v-show="sideBarShow" class="mask" @click="maskHandle"></div>
    <div id="sidebar" :class="{'sideBarShow': sideBarShow}">
      <ul>
        <li v-for="(item, index) in sideBarList" :key="index">
          <a href="#" @click="sidebarClick(item.url)">
            {{item.title}}
          </a>
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
    sidebarClick (url) {
      this.$router.push({path: url})
      this.$emit('sidebarClick', url)
    },
    maskHandle () {
      this.$emit('maskHandle', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.4);
  z-index: 1;
}
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
  z-index: 2;
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
