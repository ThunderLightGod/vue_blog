import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    navList: [
      {
        id: '0',
        url: '/',
        title: '首页',
        show: true
      },
      {
        id: '1',
        url: '/BlogLogin',
        title: '登录',
        show: true
      },
      {
        id: '2',
        url: '/',
        title: '注销',
        show: false
      },
      {
        id: '3',
        url: '/',
        title: '菜单栏',
        show: true
      }
    ],
    isLogin: false,
    routerPath: '',
    isManager: false
  },
  mutations: {
    changeManager (state, obj) {
      state.isManager = obj.bool
    },
    changeLogin (state, obj) {
      state.isLogin = obj.bool
      state.navList[1].show = !state.isLogin
      state.navList[2].show = state.isLogin
    },
    saverouterPath (state, obj) {
      state.routerPath = obj.path
    }
  }
})
export default store
