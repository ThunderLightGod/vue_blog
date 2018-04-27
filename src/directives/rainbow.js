module.exports = {
  install: function (Vue) {
    Vue.directive('rainbow', {
      bind (el, binding, vnode) {
        let color = '#' + Math.random().toString(16).slice(2, 8)
        el.style.color = color
      }
    })
  }
}
