import Vue from 'vue'
import VueRouter from 'vue-router'

// import { LoadingBarConfig } from 'iview';
import checkInfo from '@/libs/checkInfo.js'
import {routers} from './router.js'
import store from '../store/index.js';

Vue.use(VueRouter)

//路由配置
const RouterConfig = {
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: routers
}

export const router = new VueRouter(RouterConfig)

//不用验证用户登录状态的页面
const notIncluded = ['error-500', 'login', 'register', 'password', 'email', 'sms', 'auth']

router.beforeEach((to, from, next) => {
    // 版本校验
    checkInfo()
    
    if (to.name && notIncluded.indexOf(to.name) < 0) {
        Promise.all([
            // store.dispatch('getUserInfo'),
        ]).then((result) => {
            //初始化创建项目权限
            // store.commit('setProjectAddAuth', result[1].data)
            //初始化导航
            store.commit('initMenulist')
            next()
        }).catch(err => {
            next({
                name: 'login'
            })
            // next()
        })
    } else {
        if (!to.name) {
            next({
                name: 'error-500'
            })
            return
        }
        next();
    }
})
