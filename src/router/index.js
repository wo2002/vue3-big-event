import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
// createRouter 创建路由实例
// 配置 history 模式
// 1. history模式：createWebHistory  地址栏不带 #
// 2. hash =模式： createWebHashHistory 地址栏带 #

const router = createRouter({
  // BASE_URL配置由vite,js中的base配置项
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        { path: '/article/channel', component: () => import('@/views/artical/ArticalChannel.vue') },
        { path: '/article/manage', component: () => import('@/views/artical/ArticalManage.vue') },
        { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') },
        { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
        { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') }
      ]
    }
  ]
})

//登录访问拦截 =>默认是直接放行的
// 返回值：
// undefined / true 直接放行
// false 拦回from的地址页面
// 具体路径 或 路径对象 拦截到相应的地址
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
})

export default router
