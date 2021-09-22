import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layouts/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/carts',
    name: 'carts',
    component: () => import('../views/carts/Carts.vue'),
    meta: {
      title: '我的购物车'
    }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('../views/pay/Pay.vue'),
    meta: {
      title: '填写订单信息'
    }
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('../views/search/Search.vue'),
        meta: {
          title: '搜索'
        }
      },
      {
        path: '/details',
        name: 'details',
        component: () => import('../views/details/Details.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'details') document.title = to.query.name
  else
    document.title = to.meta.title
  next()
})

export default router
