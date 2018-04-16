export default {
  bind (el, binding, vnode) {
    let oDiv = el
    let interval = null
    let startTime
    const handler = () => vnode.context[binding.expression || binding.value].apply() // this指向指令执行时的值
    const clear = () => {
      if (new Date() - startTime < 100) { // 鼠标点击一次
        handler()
      }
      clearInterval(interval)
      interval = null
    }
    oDiv.onmousedown = function (e) { // 侦听指令绑定的元素的onmousedown事件
      if (e.button !== 0) return // button为0时表示按下的是鼠标左键
      startTime = new Date()
      document.onmouseup = clear // 侦听文档的onmouseup事件，清除setInterval,
      clearInterval(interval)
      interval = setInterval(handler, 100) // 鼠标连点
    }
  }
}
