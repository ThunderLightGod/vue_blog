<template>
  <div>
    <div ref="game" id="game" class="game">
      <div
        v-for="(items, itemsIndex) in gameData" :key="itemsIndex">
        <div
          v-for="(item, itemIndex) in items"
          :class="{'none': item === 0, 'done': item === 1, 'current': item === 2}"
          :style="{'top': itemsIndex * 20 + 'px', 'left': itemIndex * 20 + 'px'}"
          :key="itemIndex">
          </div>
      </div>
    </div>
    <div class="next" id="next">
      <div
        v-for="(items, itemsIndex) in nextData" :key="itemsIndex">
        <div
          v-for="(item, itemIndex) in items"
          :class="{'none': item === 0, 'done': item === 1, 'current': item === 2}"
          :style="{'top': itemsIndex * 20 + 'px', 'left': itemIndex * 20 + 'px'}"
          :key="itemIndex">
          </div>
      </div>
    </div>
    <div class="info">
      <div>已用时：<span id="time">0</span>秒</div>
      <div>已得分：<span id="score">0</span>分</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nextData: [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0]
      ],
      gameData: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      nextDiv: null,
      gameDiv: null,
      data: [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0]
      ],
      origin: {
        x: 0,
        y: 0
      }
    }
  },
  created () {
    this.bindKeyEvent()
  },
  methods: {
    bindKeyEvent () {
      document.onkeydown = (e) => {
        if (e.keyCode === 38) {
          // up
        } else if (e.keyCode === 39) {
          // right
        } else if (e.keyCode === 40) {
          // down
          this.gameDown()
        } else if (e.keyCode === 37) {
          // left
        } else if (e.keyCode === 32) {
          // space
        }
      }
    },
    gameDown () {
      this.origin.x += 1
      debugger
      this.setGameData()
    },
    setGameData () {
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.data[0].length; j++) {
          this.gameData[this.origin.x + i][this.origin.y + j] = this.data[i][j]
        }
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
.game {
  width: 200px;
  height: 400px;
  background: #f2faff;
  border-left: 1px solid blue;
  border-right: 1px solid blue;
  border-bottom: 1px solid blue;
  position: absolute;
  top: 10px;
  left: 10px;
}
.next {
  width: 80px;
  height: 80px;
  background: #f2faff;
  position: absolute;
  top: 10px;
  left: 250px;
  border: 1px solid blue;
}
.info {
  position: absolute;
  top: 100px;
  left: 250px;
}
.none, .current, .done {
  width: 20px;
  height: 20px;
  position: absolute;
  box-sizing: border-box;
}
.none {
  background: #f2faff;
}
.current {
  background: pink;
  border: 1px solid red;
}
.done {
  background: gray;
  border: 1px solid black;
}
</style>
