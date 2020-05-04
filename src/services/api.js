import {ajax} from '@/libs/vue-http-plugin.js'
import store from '@/store'
import {Message} from 'view-design';

import user from './apis/user'
import design from './apis/design'

//request拦截器
ajax.interceptors.request.use(config => {
    config.headers.Authorization = store.getters.token
    // if(config.data){
    //     let objType = Object.prototype.toString.call(config.data)
    //     if(objType == '[object FormData]'){
    //         config.data.append('Authorization', store.getters.Authorization)
    //     }
    //     if(objType == '[object Object]'){
    //         config.data.Authorization = store.getters.Authorization
    //     }
    // }
    // if(config.params){
    //     let objType = Object.prototype.toString.call(config.params)
    //     if(objType == '[object FormData]'){
    //         config.params.append('Authorization', store.getters.Authorization)
    //     }
    //     if(objType == '[object Object]'){
    //         config.params.Authorization = store.getters.Authorization
    //     }
    // }
    return config
})

//登录问题状态码
const statusCode = [11001, 11002, 11003];

export function request(url, setting = {}) {
    return function (data = {}, config = {}) {
        //合并参数，优先级 config > {url} > setting
        config = Object.assign({}, setting, {url}, config)
        //get和delete 自动把data转为params
        if (setting.method == 'post' || setting.method == 'put') {
            config.data = data
        } else {
            config.params = data
        }
        config.timeout = 0;
        // console.log('config', config)
        return ajax(config).then(res => {
            if (res.data.status === 0) {
                res.data.success = true
                return res.data
            } else {
                res.data.success = false
                // config.reportError !== false && Message.error(res.data.message)
                if (config.reportError !== false) {
                    if (statusCode.indexOf(res.data.status) > -1) {
                        Message.error("请先登录")
                    } else {
                        Message.error(res.data.message)
                    }
                }
                if (statusCode.indexOf(res.data.status) > -1) {
                    window.location.href = '/login'
                }
                if (config.reportErrorData !== false) {
                    return Promise.reject(res.data)
                }else{
                    return res.data
                }
            }
        }, error => {
            Message.error('请求失败')
            return Promise.reject()
        })
    }
}

export default {
    company: {
        //设计审查---项目列表
        lists: request('/index/company/lists'),
    },
    region: {
        //获取省市
        region: request('/index/region/lists'),
    },
    project: {
        //创建项目
        projectAdd: request('/index/project/add', {method: 'post'}),
        //主项目列表
        getProjectMainList: request('/index/project-main/lists'),
        //项目列表
        getProjectLists: request('/index/project/lists'),
        // 搜索俊发项目
        searchJunfaProject: request('/index/project/search-junfa-project', {method: 'post'})
        

    },
    task: {
        //下载审查表
        downReviewExcel: request('/design/review/down-review-excel'),
        //上传审查表
        uploadReviewExcel: request('/design/review/upload-review-excel'),
        //任务列表
        getTaskLists: request('/design/task/lists'),
        // 流程打回
        rollback: request('./design/review/step-rollback', {method: 'post'})
    },
    user, design
}
