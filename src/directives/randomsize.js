module.exports = {
  install: function (Vue) {
    Vue.directive('randomsize', {
      bind (el, binding, vnode) {
        let size = Math.floor(Math.random() * 12 + 1) + 10
        el.style.color = size
      }
    })
  }
}
