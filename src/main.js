// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResoure from 'vue-resource'
import './javascript/Ie9Oninput'
import store from './vuex/store'
import vRainbow from './directives/rainbow.js'
import vRandomsize from './directives/randomsize.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/rainbow.css'

Vue.use(ElementUI)
Vue.use(vRainbow)
Vue.use(vRandomsize)
Vue.directive('img', function (el, binding) {
  // 简单压缩图片
  el.width = 200
  // 设置手型
  el.style.cursor = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDxnIGlkPSJtYWduaWZ5aW5nX2dsYXNzX2FkZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICA8cGF0aCBkPSJNMjMuMzQxMTI1LDIwLjE1OTI1IEwxNi43NDY3NSwxMy41NjQ4NzUgQzE3LjUzOCwxMi4yMjU3NSAxOCwxMC42NjgzNzUgMTgsOSBDMTgsNC4wMjkzNzUgMTMuOTcwNjI1LDAgOSwwIEM0LjAyOTM3NSwwIDAsNC4wMjkzNzUgMCw5IEMwLDEzLjk3MDYyNSA0LjAyOTM3NSwxOCA5LDE4IEMxMC42NjgzNzUsMTggMTIuMjI1NzUsMTcuNTM4IDEzLjU2NDg3NSwxNi43NDY3NSBMMjAuMTU5MjUsMjMuMzQwNzUgQzIwLjU2NjEyNSwyMy43NDgzNzUgMjEuMTI4NjI1LDI0IDIxLjc1LDI0IEMyMi45OTI3NSwyNCAyNCwyMi45OTI3NSAyNCwyMS43NSBDMjQsMjEuMTI4NjI1IDIzLjc0OCwyMC41NjYxMjUgMjMuMzQxMTI1LDIwLjE1OTI1IFogTTksMTUuNzUgQzUuMjcyMTI1LDE1Ljc1IDIuMjUsMTIuNzI3ODc1IDIuMjUsOSBDMi4yNSw1LjI3MjEyNSA1LjI3MjEyNSwyLjI1IDksMi4yNSBDMTIuNzI3ODc1LDIuMjUgMTUuNzUsNS4yNzIxMjUgMTUuNzUsOSBDMTUuNzUsMTIuNzI3ODc1IDEyLjcyNzg3NSwxNS43NSA5LDE1Ljc1IFogTTEyLjc1LDcuODc1IEwxMC4xMjUsNy44NzUgTDEwLjEyNSw1LjI1IEMxMC4xMjUsNC42Mjg2MjUgOS42MjEzNzUsNC4xMjUgOSw0LjEyNSBDOC4zNzg2MjUsNC4xMjUgNy44NzUsNC42Mjg2MjUgNy44NzUsNS4yNSBMNy44NzUsNy44NzUgTDUuMjUsNy44NzUgQzQuNjI4NjI1LDcuODc1IDQuMTI1LDguMzc4NjI1IDQuMTI1LDkgQzQuMTI1LDkuNjIxMzc1IDQuNjI4NjI1LDEwLjEyNSA1LjI1LDEwLjEyNSBMNy44NzUsMTAuMTI1IEw3Ljg3NSwxMi43NSBDNy44NzUsMTMuMzcxMzc1IDguMzc4NjI1LDEzLjg3NSA5LDEzLjg3NSBDOS42MjEzNzUsMTMuODc1IDEwLjEyNSwxMy4zNzEzNzUgMTAuMTI1LDEyLjc1IEwxMC4xMjUsMTAuMTI1IEwxMi43NSwxMC4xMjUgQzEzLjM3MTM3NSwxMC4xMjUgMTMuODc1LDkuNjIxMzc1IDEzLjg3NSw5IEMxMy44NzUsOC4zNzkgMTMuMzcxMzc1LDcuODc1IDEyLjc1LDcuODc1IFoiIGlkPSJTaGFwZSIgZmlsbD0iIzAwMDAwMCI+PC9wYXRoPgogIDwvZz4KPC9zdmc+), auto'
  // 创建一张大图
  let img = new window.Image()
  // 设置大图图片地址和小图一样
  img.src = el.src
  // 设置大图图片css样式，在页面垂直居中
  img.style.position = 'fixed'
  img.style.maxWidth = img.style.maxHeight = '90%'
  img.style.top = 0
  img.style.right = 0
  img.style.bottom = 0
  img.style.left = 0
  img.style.margin = 'auto'
  img.style.zIndex = 10086
  // 设置大图手型
  img.style.cursor = 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDxnIGlkPSJtYWduaWZ5aW5nX2dsYXNzX21pbnVzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxwYXRoIGQ9Ik0yMy4zNDExMjUsMjAuMTU5MjUgTDE2Ljc0Njc1LDEzLjU2NDg3NSBDMTcuNTM4LDEyLjIyNTc1IDE4LDEwLjY2ODM3NSAxOCw5IEMxOCw0LjAyOTM3NSAxMy45NzA2MjUsMCA5LDAgQzQuMDI5Mzc1LDAgMCw0LjAyOTM3NSAwLDkgQzAsMTMuOTcwNjI1IDQuMDI5Mzc1LDE4IDksMTggQzEwLjY2ODM3NSwxOCAxMi4yMjU3NSwxNy41MzggMTMuNTY0ODc1LDE2Ljc0Njc1IEwyMC4xNTkyNSwyMy4zNDA3NSBDMjAuNTY2MTI1LDIzLjc0ODM3NSAyMS4xMjg2MjUsMjQgMjEuNzUsMjQgQzIyLjk5Mjc1LDI0IDI0LDIyLjk5Mjc1IDI0LDIxLjc1IEMyNCwyMS4xMjg2MjUgMjMuNzQ4LDIwLjU2NjEyNSAyMy4zNDExMjUsMjAuMTU5MjUgWiBNOSwxNS43NSBDNS4yNzIxMjUsMTUuNzUgMi4yNSwxMi43Mjc4NzUgMi4yNSw5IEMyLjI1LDUuMjcyMTI1IDUuMjcyMTI1LDIuMjUgOSwyLjI1IEMxMi43Mjc4NzUsMi4yNSAxNS43NSw1LjI3MjEyNSAxNS43NSw5IEMxNS43NSwxMi43Mjc4NzUgMTIuNzI3ODc1LDE1Ljc1IDksMTUuNzUgWiBNMTIuNzUsNy44NzUgTDUuMjUsNy44NzUgQzQuNjI4NjI1LDcuODc1IDQuMTI1LDguMzc4NjI1IDQuMTI1LDkgQzQuMTI1LDkuNjIxMzc1IDQuNjI4NjI1LDEwLjEyNSA1LjI1LDEwLjEyNSBMMTIuNzUsMTAuMTI1IEMxMy4zNzEzNzUsMTAuMTI1IDEzLjg3NSw5LjYyMTM3NSAxMy44NzUsOSBDMTMuODc1LDguMzc5IDEzLjM3MTM3NSw3Ljg3NSAxMi43NSw3Ljg3NSBaIiBpZD0iU2hhcGUiIGZpbGw9IiMwMDAwMDAiPjwvcGF0aD4KICA8L2c+Cjwvc3ZnPg==), auto'
  // 侦听大图点击事件，点击移除大图
  img.addEventListener('click', () => {
    document.body.removeChild(img)
  })
  // 侦听小图点击事件，点击插入大图
  el.addEventListener('click', () => {
    document.body.appendChild(img)
  })
})
Vue.directive('highlight', (el, binding) => {
  Vue.nextTick(() => {
    let blocks = Array.from(el.querySelectorAll('pre code'))
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  })
})
Vue.config.productionTip = false
Vue.use(VueResoure)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
