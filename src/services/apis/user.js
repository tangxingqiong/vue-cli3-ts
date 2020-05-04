import {request} from '../api'

export default {
    //用户信息
    getUserInfo: request('/index/user/me'),
    //登录
    login: request('/index/user/login', {method: 'post'}),
    //单点授权登录
    authUser: request('/index/user/auth-user', {method: 'post'}),
    //注册
    register: request('/index/user/register', {method: 'post'}),
    //找回密码
    findPasswordSendSms: request('/index/user/send-sms', {method: 'post'}),
    //找回密码发送邮件
    findPasswordSendEmail: request('/index/user/send-email', {method: 'post'}),
    //设置密码
    setPassword: request('/index/user/set-password', {method: 'post'}),
    // 查找用户
    findUser: request('/index/user/find', {method: 'post'}),
    // 修改密码
    editPassword: request('/index/user/update-password', {method: 'post'}),
    // 修改手机
    editMobile: request('/index/user/update-mobile', {method: 'post'}),
    // 修改邮箱
    editEmail: request('/index/user/update-email', {method: 'post'}),

    //获取用户权限
    getAuthLists: request('/index/auth/lists'),
    //判断用户是否拥有权限
    authCheck: request('/index/auth/check'),

    //合并文件http://api.pemcloud.com/admin/upload/chunks-merge
    chunksMerge: request('/admin/upload/chunks-merge', {method: 'post'}),

}