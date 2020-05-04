import BaseLayout from '@/views/layout/base.vue'
import menuPage from '@/router/menuPage'

//子页面展示并且在顶部菜单显示的路由写在appRouter里
export const appRouter = menuPage

// 作为Main组件的子页面展示但是不在顶部菜单显示的路由写在otherRouter里
export const otherRouter = [
    
]

export const page500 = {
    path: '/500',
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
}

//所有上面定义的路由都要写在下面的routers里
export const routers = [
    ...appRouter,
    ...otherRouter,
    page500
]
