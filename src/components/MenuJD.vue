<template>
<div>
  <div class="wrap" v-on:mouseenter="wrapMouseEnter" v-on:mouseleave="wrapMouseLeave">
      <ul>
          <li :class="{'active':active === index}"  v-for="(item, index) in menuData" :key="index"  v-on:mouseenter="overMune(index)">
            <span>{{item.menuList}}</span>
          </li>
      </ul>
      <div ref="sub" id="sub" :class="{'none': show}" v-on:mouseenter="mouseInSub = true" v-on:mouseleave="mouseInSub = false">
        <div id="a" class="sub_content">
          <dl v-for="(item, index) in menuData[active === -1 ? 0 : active].menuListData" :key="index">
            <dt>
              <a href="#">{{item.menuListTitle}}<i>&gt;</i></a>
            </dt>
            <dd v-for="menuDetail in item.menuListDetail" :key="menuDetail">
              <a href="#">{{menuDetail}}</a>
            </dd>
          </dl>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      active: -1,
      show: true,
      timer: null,
      mouseInSub: false,
      mouseTrack: [],
      offsetPos: {}
    }
  },
  props: {
    menuData: {
      type: Array,
      required: true
    }
  },
  components: {
  },
  methods: {
    moveHandler (e) {
      this.mouseTrack.push({
        x: e.pageX,
        y: e.pageY
      })
      if (this.mouseTrack.length > 3) {
        this.mouseTrack.shift()
      }
    },
    wrapMouseLeave () {
      this.show = true
      this.active = -1
      document.onmousemove = null
    },
    wrapMouseEnter () {
      this.show = false
      document.onmousemove = this.moveHandler
    },
    overMune (index) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      let currMousePos = this.mouseTrack[this.mouseTrack.length - 1]
      let leftCorner = this.mouseTrack[this.mouseTrack.length - 2]
      let delay = this.needDelay(this.$refs.sub, leftCorner, currMousePos)
      if (delay) {
        this.timer = setTimeout(() => {
          if (!this.mouseInSub) {
            this.active = index
            this.show = false
            this.timer = null
          }
        }, 500)
      } else {
        this.active = index
        this.show = false
      }
    },
    vector (a, b) {
      return {
        x: b.x - a.x,
        y: b.y - a.y
      }
    },
    vectorProduct (v1, v2) {
      // return v1.x * v2.y - v2.x * v1.y
      return v1.x * v2.x + v1.y * v2.y
    },
    sameSign (a, b) {
      return (a ^ b) >= 0
    },
    isPointInTrangle (p, a, b, c) {
      let pa = this.vector(p, a)
      let pb = this.vector(p, b)
      let pc = this.vector(p, c)
      let t1 = this.vectorProduct(pa, pb)
      let t2 = this.vectorProduct(pb, pc)
      let t3 = this.vectorProduct(pa, pc)
      return this.sameSign(t1, t2) && this.sameSign(t2, t3)
    },
    needDelay (elem, leftCorner, currMousePos) {
      if (!currMousePos || !leftCorner) {
        return
      }
      this.offsetPos.left = 0
      this.offsetPos.top = 0
      this.offset(elem)
      let topLeft = {
        x: this.offsetPos.left,
        y: this.offsetPos.top
      }
      let bottomLeft = {
        x: this.offsetPos.left,
        y: this.offsetPos.top + elem.clientHeight
      }
      return this.isPointInTrangle(currMousePos, leftCorner, topLeft, bottomLeft)
    },
    offset (elem) {
      this.offsetPos.left = elem.offsetLeft
      this.offsetPos.top = elem.offsetTop
      let current = elem.offsetParent
      while (current !== null) {
        this.offsetPos.left += (current.offsetLeft + current.clientLeft)
        this.offsetPos.top += (current.offsetTop + current.clientTop)
        current = current.offsetParent
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
  position: relative;
  width: 200px;
  left: 50px;
  top: 50px;
  background: #6c6669;
  padding: 15px 0;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
  color: #fff;
  border-right-width: 0;
}
li{
  height: 40px;
  line-height: 40px;
  padding-left: 12px;
  cursor: pointer;
  font-size: 14px;
  position: relative;
}
li.active{
  background: #999395;
}
li span:hover{
  color: #c81623;
}
.none{
  display: none;
}
#sub{
  width: 600px;
  min-height: 270px;
  position: absolute;
  border: 1px solid #f7f7f7;
  background: #f7f7f7;
  box-shadow: 2px 0 5px rgba(0,0,0,.3);
  left: 200px;
  top: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
}
.sub_content a{
  text-decoration: none;
  color: #666;
  font-size: 12px;
}
.sub_content dd a{
  border-left: 1px solid #e0e0e0;
  padding: 0 10px;
  margin: 4px 0;
}
.sub_content dl{
 overflow: hidden;
}
.sub_content dt{
  float: left;
  width: 70px;
  clear: left;
  font-weight: bold;
  position: relative;
}
.sub_content dd{
  float: left;
  margin-left: 5px;
  border-top: 1px solid #eee;
  margin-bottom: 5px;
}
</style>
