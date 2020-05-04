import axios from 'axios'
//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers['Content-Type'] = 'application/json'

//在axios发送数据之前对需要发的数据进行处理
// axios.defaults.transformRequest = function (obj){
//   var str = [];
//   console.log(obj);
//   console.log('a');
//   for(var p in obj){
//     let value = obj[p];
//     if(value === undefined){
//       continue
//     }
//     if(typeof value == 'object'){
//       value = JSON.stringify(value)
//     }
//     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(value));
//   }
//   console.log(str);
//   return str.join("&")
// }

// const baseURL = 'https://shenzhen.zbj.com/index2018/api/user/'
const baseURL = process.env.VUE_APP_API
// console.log('process.env',window.location.origin)

const ajax = axios.create({
  headers: {},
  method: "get",
  timeout: 30000,
  baseURL,
  widthCredentials: true //当前请求为跨域类型时是否在请求中协带cookie
})

export {baseURL}
export {ajax}
export default {
  install(Vue){
    Vue.prototype.$ajax = config => {
      return ajax(config).then(res => {
        return res.data;
      })
    }
  }
}
