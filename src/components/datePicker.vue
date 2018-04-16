<template>
  <div class="datePicker">
    <input v-model="inputDate" type="text" class="input-datePicker" @click="showDatePicker">
    <div v-show="datePickerShow" class="ui-datapicker-wrapper">
      <div class="ui-datapicker-header">
        <a v-repeat-click="prevDatePicker" href="#" class="ui-datapicker-btn ui-datapicker-prev-btn" >&lt;</a>
        <a v-repeat-click="nextDatePicker" href="#" class="ui-datapicker-btn ui-datapicker-next-btn" >&gt;</a>
        <span class="ui-datapicker-curr-month">{{this.year}} - {{this.month + 1 > 9 ? this.month + 1 : '0' + (this.month + 1)}}</span>
      </div>
      <div class="ui-datapicker-body">
        <table>
          <thead>
            <tr>
              <th>日</th>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in dataSource" :key="index">
              <td :class="{'other-month': month !== item.thisMonth,'mouse-enter': index === moveIndex && itemIndex === moveItemIndex}" v-for="(item, itemIndex) in data"
              :key="itemIndex" @click="selectDate(index, itemIndex)"
              @mouseenter="mouseEnter(index, itemIndex)"
              @mouseleave="mouseLeave"
              >{{item.showDate}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import repeatClick from '../directives/repeatClick.js'
export default {
  data () {
    return {
      dataSource: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
      },
      datapicker: {},
      year: null,
      month: null,
      firstDay: null,
      firstDayWeekDay: null,
      lastDayOfLastMonth: null,
      lastDateOfLastMonth: null,
      preMonthDayCount: 0,
      lastDay: null,
      lastDate: null,
      data: null,
      showDate: null,
      thisMonth: null,
      datePickerShow: false,
      inputDate: '',
      moveIndex: -1,
      moveItemIndex: -1,
      saveXY: false
    }
  },
  directives: {
    repeatClick: repeatClick
  },
  methods: {
    mouseEnter (x, y) {
      this.saveXY = false
      this.moveIndex = x
      this.moveItemIndex = y
    },
    mouseLeave () {
      if (this.saveXY) return
      this.moveIndex = -1
      this.moveItemIndex = -1
    },
    selectDate (x, y) {
      if (this.dataSource[parseInt(x)][y].thisMonth < this.month || (this.dataSource[parseInt(x)][y].thisMonth === 12 && this.month === 0)) {
        this.prevDatePicker()
      } else if (this.dataSource[parseInt(x)][y].thisMonth > this.month) {
        this.nextDatePicker()
      } else {
        this.moveIndex = x
        this.moveItemIndex = y
        this.saveXY = true // 记录点击位置
        this.inputDate = this.year + '-'
        this.inputDate += (this.dataSource[parseInt(x)][y].thisMonth + 1 > 9 ? this.dataSource[parseInt(x)][y].thisMonth + 1 : '0' + (this.dataSource[parseInt(x)][y].thisMonth + 1)) + '-'
        this.inputDate += this.dataSource[parseInt(x)][y].showDate > 9 ? this.dataSource[parseInt(x)][y].showDate : '0' + this.dataSource[parseInt(x)][y].showDate
        this.$emit('change', this.inputDate)
        this.$emit('input', this.inputDate) // 这里绑定了v-model,不知道什么原因
        this.datePickerShow = false
      }
    },
    prevDatePicker () {
      this.month -= 1
      if (this.month < 0) {
        this.year -= 1
        this.month = 11
      }
      this.getMonthData()
    },
    nextDatePicker () {
      this.month += 1
      if (this.month >= 12) {
        this.year += 1
        this.month = 0
      }
      this.getMonthData()
    },
    showDatePicker () {
      this.datePickerShow = true
      this.getMonthData()
    },
    getMonthData () {
      if (this.year === null || this.month === null) { // 获取本月数据
        let today = new Date()
        this.year = today.getFullYear()
        this.month = today.getMonth() // 当前月份
      }
      this.firstDay = new Date(this.year, this.month, 1) // 获取本月第一天
      this.firstDayWeekDay = this.firstDay.getDay() // 返回本月第一天是礼拜几：日-六[0,1,2,3,4,5,6]
      this.lastDayOfLastMonth = new Date(this.year, this.month, 0) // 获取上月最后一天
      this.lastDateOfLastMonth = this.lastDayOfLastMonth.getDate() // 获取上月有多少天
      this.lastDay = new Date(this.year, this.month + 1, 0) // 获取本月最后一天
      this.lastDate = this.lastDay.getDate() // 获取本月天数
      this.dataSource = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
      }
      for (let i = 0; i < 6 * 7; i++) {
        this.date = i - this.firstDayWeekDay + 1
        this.showDate = this.date
        this.thisMonth = this.month
        if (this.date <= 0) {
          // 上一月
          this.thisMonth = this.month - 1
          this.showDate = this.lastDateOfLastMonth + this.date
        } else if (this.date > this.lastDate) {
          // 下一月
          this.thisMonth = this.month + 1
          this.showDate = this.showDate - this.lastDate
        }
        if (this.thisMonth === -1) this.thisMonth = 12
        if (this.thisMonth === 13) this.thisMonth = 0
        this.dataSource[Math.floor(i / 7)].push({
          thisMonth: this.thisMonth,
          date: this.date,
          showDate: this.showDate
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.datePicker {
  position: relative;
  z-index: 3;
  .input-datePicker {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
    height: 24px;
    line-height: 24px;
    width: 230px;
    text-align: center;
    &:hover {
      outline: 0 none;
      border: 1px solid #1abcde
    }
    &:focus {
      outline: 0 none;
      border: 1px solid #aa6f16
    }
  }
  .ui-datapicker-wrapper {
    position: absolute;
    left: 0;
    top: 40px;
    width: 240px;
    font-size: 16px;
    color: #666;
    box-shadow: 2px 2px 8px 2px rgba(128, 128, 128, .3);
    z-index: 3;
    background-color: #fff;
    .ui-datapicker-header {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: #f0f0f0;
      border-bottom: 1px solid #ccc;
      font-weight: bold;
      .ui-datapicker-btn {
        font-family: serif;
        font-size: 20px;
        width: 20px;
        height: 50px;
        line-height: 50px;
        color: #1abcde;
        text-align: center;
        cursor: pointer;
        text-decoration: none;
        &.ui-datapicker-prev-btn {
          float: left;
        }
        &.ui-datapicker-next-btn {
          float: right;
        }
      }
    }
    .ui-datapicker-body {
      table {
        width: 100%;
        border-collapse: collapse;
        th,
        td {
          height: 30px;
          text-align: center;
        }
        th {
          font-size: 12px;
          height: 40px;
          line-height: 40px;
        }
        td {
          border: 1px solid #f0f0f0;
          font-size: 10px;
          cursor: pointer;
          &.other-month {
            background-color: #eee;
            opacity: .5;
          }
          &.mouse-enter {
            background-color: #1abcde;
          }
        }
      }
    }
  }
}
</style>
