import BaseLayout from '@/views/layout/base.vue'
// import DesignLayout from '@/layout/design.vue'

export default [
  {
    path: '/',
    title: "首页",
    name: "project",
    icon: "ios-home-outline",
    redirect: '/index',
    component: BaseLayout,
    children: [
        {
            path: 'index',
            title: "首页",
            name: "index",
            component: () => import('@/views/index/index.vue'),
        }
    ]
  },
  {
    path: '/media',
    title: "媒体任务",
    name: "media",
    icon: "ios-briefcase-outline",
    component: BaseLayout,
    children: [
        {
            path: 'task',
            title: "媒体任务",
            name: "media-task",
            component: () => import('@/views/media/task.vue'),
        }
    ]
  },
  {
    path: '/user',
    title: "用户管理",
    name: "user",
    icon: "ios-people-outline",
    component: BaseLayout,
    children: [
        {
            path: 'userManage',
            title: "用户管理",
            name: "userManage",
            component: () => import('@/views/index/index.vue'),
        }
    ]
  },
  {
    path: '/capital',
    title: "资金管理",
    name: "capital",
    icon: "ios-stats-outline",
    component: BaseLayout,
    children: [
        {
            path: 'capitalManage',
            title: "资金管理",
            name: "capitalManage",
            component: () => import('@/views/capitalManage/capitalManage.vue'),
        }
    ]
  },
  {
    path: '/articleConsultation',
    title: "文章咨询",
    name: "articleConsultation",
    icon: "ios-paper-outline",
    component: BaseLayout,
    children: [
        {
            path: 'consultation',
            title: "文章咨询",
            name: "consultation",
            component: () => import('@/views/index/index.vue'),
        }
    ]
  },
  {
    path: '/systemSetup',
    title: "系统设置",
    name: "systemSetup",
    icon: "ios-settings-outline",
    component: BaseLayout,
    children: [
        {
            path: 'setup',
            title: "系统设置",
            name: "setup",
            component: () => import('@/views/index/index.vue'),
        }
    ]
  }
]
