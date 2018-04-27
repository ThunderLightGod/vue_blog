import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Blog from '@/Blog/Blog'
import ElsFk from '@/ElsFk/ElsFk'
import AddBlog from '@/components/AddBlog'
import ShowBlogs from '@/components/ShowBlogs'
import BlogLogin from '@/components/BlogLogin'
import SingleBlog from '@/components/SingleBlog'
import {getCookie} from '../javascript/cookie'
import store from '../vuex/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'ShowBlogs',
      component: ShowBlogs
    },
    {
      path: '/Blog/:id',
      name: 'SingleBlog',
      component: SingleBlog,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/BlogEdit/:id',
      name: 'BlogEdit',
      component: AddBlog,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/AddBlog',
      name: 'AddBlog',
      component: AddBlog,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/BlogBe/BlogManager',
      name: 'BlogManager',
      component: ShowBlogs,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/BlogLogin',
      name: 'BlogLogin',
      component: BlogLogin
    },
    {
      path: '/Blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/ElsFk',
      name: 'ElsFk',
      component: ElsFk
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched[0].name === 'BlogManager') {
    store.commit('changeManager', {bool: true})
  } else {
    store.commit('changeManager', {bool: false})
  }
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (getCookie('userName')) {
      next()
    } else {
      next({
        path: '/BlogLogin',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
export default router
