<template>
  <div>
      <ul ref="rating" id="rating" class="rating">
          <li v-for="(item, index) in evaluation"
          v-on:mouseenter="StarMouseEnter(index)"
          v-on:mouseleave="StarMouseLeave"
          @click="StarClick(index)"
          class="rating-item"
          :title="item"
          :class="index < num ? (num - index > 0.5 ? 'onStar' : 'onHalfStar') : 'offStar'"
          :key="index"></li>
      </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num: 2,
      evaluation: ['很不好', '不好', '一般', '好', '很好'],
      temp: 0,
      mousePositionX: 0,
      mouseFlag: false,
      moveDistance: 0
    }
  },
  created () {
    this.temp = this.num
  },
  methods: {
    StarMouseEnter (index) {
      this.mousePositionX = this.$refs.rating.offsetLeft
      this.$refs.rating.onmousemove = this.moveHandler
    },
    StarMouseLeave () {
      if (!this.mouseFlag) {
        this.num = this.temp
      }
      this.$refs.rating.onmousemove = null
    },
    moveHandler (e) {
      this.mouseFlag = false
      this.moveDistance = e.pageX - this.mousePositionX
      this.num = this.moveDistance / this.$refs.rating.children[0].clientWidth
    },
    StarClick (index) {
      this.mouseFlag = true
      this.temp = this.num
    }
  }
}
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
ul li {
    padding: 0;
    margin: 0;
}
li {
    list-style-type: none;
}
.rating {
    width: 155px;
    margin: 500px auto;
}
.rating-item {
    float: left;
    width: 31px;
    height: 31px;
    cursor: pointer;
    background: url('/static/images/iVPGGC.png')
}
.onStar {
  background-position: 0 -40px;
}
.offStar {
  background-position: 0 0;
}
.onHalfStar {
  background-position: 0 -80px;
}
</style>
