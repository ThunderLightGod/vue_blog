<script>
import RepeatClick from '../directives/repeatClick.js'
export default {
  data () {
    return {
      currentValue: 0
    }
  },
  directives: {
    repeatClick: RepeatClick
  },
  props: {
    step: { // 步数，默认为1
      type: Number,
      default: 1
    },
    max: { // 最大值，默认为Infinity
      type: Number,
      default: Infinity
    },
    min: { // 最小值，默认为-Infinity
      type: Number,
      default: -Infinity
    },
    name: { // 空间名称
      type: String,
      default: 'number'
    },
    disabled: { // 控件禁用，默认为不禁用
      type: Boolean,
      default: false
    },
    label: String,
    controlsPosition: { // 组件显示布局，默认两边
      type: String,
      default: 'both'
    },
    controls: {
      type: Boolean,
      default: true
    },
    size: { // 组件显示大小，默认大
      type: String,
      default: 'large'
    }
  },
  computed: {
    minDisabled () { // 禁用减少span标签
      return this._decrease(this.currentValue, this.step) < this.min
    },
    maxDisabled () { // 禁用增加span标签
      return this._increase(this.currentValue, this.step) > this.max
    },
    precision () { // 取当前数值和step的小数位数最大值，即显示数值精确到多少位
      const { currentValue, step, getPrecision } = this
      return Math.max(getPrecision(currentValue), getPrecision(step))
    },
    controlsAtRight () { // 控制按钮在右边的模式
      return this.controlsPosition === 'right'
    },
    inputNumberSize () { // 控制组件大小
      return this.size
    }
  },
  methods: {
    toPrecision (num, precision) { // 格式化num
      if (precision === undefined) precision = this.precision
      return parseFloat(parseFloat(Number(num).toFixed(precision)))
    },
    getPrecision (value) { // 获取传递的数字的小数部分长度
      if (value === undefined) return 0
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    },
    handleBlur (event) { // 向父组件传递input元素触发失去焦点事件
      this.$emit('blur', event)
    },
    handleFocus (event) { // 向父组件传递input元素触发获得焦点事件
      this.$emit('focus', event)
    },
    setCurrentValue (newVal) { // 改变input元素显示的数值，同时向父组件传递触发input元素的onchange事件和oninput事件
      const oldVal = this.currentValue
      if (newVal >= this.max) newVal = this.max
      if (newVal <= this.min) newVal = this.min
      this.$emit('change', newVal, oldVal)
      this.$emit('input', newVal) // 这里绑定了v-model,不知道什么原因
      this.currentValue = newVal
    },
    handleInputChange (event) { // 触发input的onchange事件,对输入的值进行范围验证
      const newVal = event === '' ? undefined : Number(event.target.value)
      if (!isNaN(newVal) || event === '') {
        this.setCurrentValue(newVal)
      }
    },
    _increase (val, step) { // 数值按步数减少
      if (typeof val !== 'number' && val !== undefined) return this.currentValue
      const precisionFactor = Math.pow(10, this.precision)
      return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor)
    },
    _decrease (val, step) { // 数值按步数增加
      if (typeof val !== 'number' && val !== undefined) return this.currentValue

      const precisionFactor = Math.pow(10, this.precision)
      return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor)
    },
    increase () { // span元素onClick点击事件，增加步数
      if (this.disabled || this.maxDisabled) return
      const value = this.currentValue || 0
      const newVal = this._increase(value, this.step)
      this.setCurrentValue(newVal)
    },
    decrease () { // span元素onClick点击事件，减少步数
      if (this.disabled || this.minDisabled) return
      const value = this.currentValue || 0
      const newVal = this._decrease(value, this.step)
      this.setCurrentValue(newVal)
    },
    onkeydown (event) { // 键盘↑↓触发的事件
      if (event.target !== event.currentTarget) return
      if (event.keyCode === 38) {
        this.increase()
      } else if (event.keyCode === 40) {
        this.decrease()
      }
    }
  },
  mounted () {
    if (this.disabled) { // 组件禁用清除input输入
      this.currentValue = ''
    }
  },
  render: function (h) { // render渲染模板，运用了element-ui的样式
    return (
      <div
        class={{'el-input-number': true,
          'is-disabled': this.disabled,
          'is-without-controls': !this.controls,
          'is-controls-right': this.controlsAtRight && this.controls, // 加上 && this.controls在禁用按钮时右边显示的控制按钮样式也去掉
          ['el-input-number--' + this.inputNumberSize]: this.inputNumberSize }}
      >
        {this.controls // 对应v-if指令
          ? <span
            class={{'el-input-number__decrease': true, 'is-disabled': this.minDisabled}}
            v-repeat-click={'decrease'} >
            <i class={{'el-icon-minus': !this.controlsAtRight, 'el-icon-arrow-down': this.controlsAtRight}}></i>
          </span>
          : ''
        }
        {this.controls // 对应v-if指令
          ? <span
            class={{'el-input-number__increase': true, 'is-disabled': this.maxDisabled}}
            v-repeat-click={'increase'} >
            <i class={{'el-icon-plus': !this.controlsAtRight, 'el-icon-arrow-up': this.controlsAtRight}}></i>
          </span>
          : ''
        }
        <input
          class={{'el-input__inner': true,
            'is-disabled': this.disabled,
            ['el-input--' + this.inputNumberSize]: this.inputNumberSize }}
          type="text"
          ref="inputNumber"
          disabled={this.disabled}
          label={this.label}
          value={this.currentValue}
          name={this.name}
          min={this.min}
          max={this.max}
          step={this.step}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleInputChange}
          onKeydown={this.onkeydown}
        />
      </div>
    )
  }
}
</script>
<style scoped>
.el-input__inner.is-disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
}
.el-input__inner.el-input--medium{
    height: 36px;
    line-height: 36px;
}
.el-input__inner.el-input--small{
    height: 32px;
    line-height: 32px;
}
.el-input__inner.el-input--mini{
    height: 28px;
    line-height: 28px;
}
</style>
