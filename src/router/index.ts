/*
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-31 10:34:09
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-05 16:52:25
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getToken } from '@/utils/cookies'
import home from '@/pages/index.vue'
import login from '@/pages/login.vue'
import register from '@/pages/register.vue'
import myOrder from '@/pages/myOrder.vue'
import editMsg from '@/pages/editMsg.vue'
import store from '@/store'
import shoppingCart from '@/pages/shoppingCart.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: (_) => {
      return { path: '/login' }
    },
  },
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    component: myOrder,
  },
  {
    path: '/editMsg',
    name: 'editMsg',
    component: editMsg
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/shoppingCart',
    name: 'shoppingCart',
    component: shoppingCart
  },
  {
    path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
    redirect: (_) => {
      return { path: '/404' }
    },
  },
]
const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    }
  },
})
//路由前置守卫
router.beforeEach((to, from ,next) => {
  if(to.path !== '/login' && to.path !== '/404' && to.path !== '/register') {
    const token = String(getToken())
    console.log(token)
    if(token === null || token === '' || token === 'undefined') {
      ElMessage({
        message: '登录状态错误',
        type: 'error'
      })
      router.push("/login")
      // next()
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router