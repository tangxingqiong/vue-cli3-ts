import Vue from 'vue'
export default {
    state: {
        token: localStorage.getItem('token'),
        //用户信息
        userInfo: {}
    },
    mutations: {
        setToken(state, token){
            state.token = token
            localStorage.setItem('token', token)
        },
        //设置用户信息
        setUserInfo(state, data){
            state.userInfo = data;
        },
    },
    actions: {
        //获取用户基本信息
        getUserInfo({commit, state}){
            return new Promise((resolve, reject) => {
                if(state.userInfo.name){
                    resolve(state.userInfo)
                    return
                }
                Vue.prototype.$api.user.getUserInfo({}).then(res => {
                    if(res.status !== 0){
                        reject(res)
                        return
                    }
                    commit('setUserInfo', res.data || {})
                    resolve(res.data)
                }).catch(reject)
            })
        },
    },
    getters: {
        token: state => state.token
    }
}