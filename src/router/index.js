import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '作业编制', icon: 'dashboard' }
    }]
  },

  {
    path: '/table',
    component: Layout,
    children: [{
      path: '/table',
      name: 'Table',
      component: () => import('@/views/table/index'),
      meta: { title: '题库管理', icon: 'el-icon-s-help' }
    }]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: '/form',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '班级管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/baogao',
    component: Layout,
    children: [
      {
        path: '/baogao',
        name: 'Baogao',
        component: () => import('@/views/baogao/index'),
        meta: { title: '作业填写', icon: 'nested' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/test/index'),
        meta: { title: '页面测试', icon: 'nested' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
   /*  redirect: '/nested', */
    children: [
      {
        path: '/nested',
        name: 'Nested',
        component: () => import('@/views/nested/index'),
        meta: { title: '课程管理', icon: 'nested' }
      }
    ]
  },

  {
    path: '/tree',
   /*  redirect: '/tree', */
    component: Layout,
    children: [
      {
        path: '/tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '作业管理', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router