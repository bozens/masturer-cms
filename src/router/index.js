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
    icon: 'svg-name'             the icon show in the sidebar
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
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'name',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/list',
    name: 'activity',
    meta: { title: '活动掠影', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/activity/list'),
        meta: { title: '活动列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/activity/add'),
        meta: { title: '添加活动', icon: 'tree' }
      },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/activity/edit')
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'activity',
    meta: { title: '育儿知识', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'articleList',
        component: () => import('@/views/article/list'),
        meta: { title: '文章列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'articleAdd',
        component: () => import('@/views/article/add'),
        meta: { title: '添加文章', icon: 'tree' }
      },
      {
        path: 'edit',
        name: 'articleEdit',
        component: () => import('@/views/article/edit')
      }
    ]
  },
  {
    path: '/lesson',
    component: Layout,
    redirect: '/lesson/list',
    name: 'activity',
    meta: { title: '课程设置', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'lessonList',
        component: () => import('@/views/lesson/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'lessonAdd',
        component: () => import('@/views/lesson/add'),
        meta: { title: '添加课程', icon: 'tree' }
      },
      {
        path: 'edit',
        name: 'lessonEdit',
        component: () => import('@/views/lesson/edit')
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: 'table',
    meta: { title: '老师风采', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'teacherList',
        component: () => import('@/views/teachers/list'),
        meta: { title: '老师列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'teacherAdd',
        component: () => import('@/views/teachers/add'),
        meta: { title: '新增老师', icon: 'tree' }
      },
      {
        path: 'edit',
        name: 'teacherEdit',
        component: () => import('@/views/teachers/edit')
      }
    ]
  },
  {
    path: '/vip',
    component: Layout,
    redirect: '/vip/list',
    name: 'table',
    meta: { title: '会员墙', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'teacherList',
        component: () => import('@/views/vip/list'),
        meta: { title: '会员列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'teacherAdd',
        component: () => import('@/views/vip/add'),
        meta: { title: '新增会员', icon: 'tree' }
      }
    ]
  },
  {
    path: '/honor',
    component: Layout,
    redirect: '/honor/list',
    name: 'honor',
    meta: { title: '荣誉', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'honorList',
        component: () => import('@/views/honor/list'),
        meta: { title: '荣誉列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'honorAdd',
        component: () => import('@/views/honor/add'),
        meta: { title: '添加荣誉', icon: 'tree' }
      },
      {
        path: 'edit',
        name: 'honorEdit',
        component: () => import('@/views/honor/edit')
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '上传图片测试', icon: 'form' }
      }
    ]
  },
  {
    path: '/appointment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'appointment',
        component: () => import('@/views/appointment/index'),
        meta: { title: '预约', icon: 'form' }
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
