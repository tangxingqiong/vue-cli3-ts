import store from '@/store'

// 路由加载拼接
export function importFile(path){
    return ()=> import(/* webpackChunkName: "[request]" */ `@/views/${path}.vue`)
}

/**
 * 下载文件
 * @description 下载表格文件时，接口请求需要设置 responseType: "blob"
 *  */
export function downloadFile(filename, content){
    let element = document.createElement('a')
    let url = URL.createObjectURL(content)

    element.setAttribute('href', url)
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}

/**
 * @description 时间处理 返回年-月-日
 * @param {String} val 需要处理的时间字符
 * @param {Boolean} showTime 是否需返回时：分：秒
 */
export function formatDate(val, showTime){
    let result = ''
    if(val){
        let start = new Date(val.replace(/-/g, "/"))
        let y = start.getFullYear()
        let m = (start.getMonth() + 1) >= 10 ? (start.getMonth() + 1) : '0'+(start.getMonth() + 1)
        let d = start.getDate() >= 10 ? start.getDate() : '0'+start.getDate()
        if(showTime){
            let h = start.getHours() >= 10 ? start.getHours() : '0'+start.getHours()
            let mi = start.getMinutes() >=10 ? start.getMinutes() : '0'+start.getMinutes()
            let s = start.getSeconds() >=10 ? start.getSeconds() : '0'+start.getSeconds()
            result = `${y}-${m}-${d} ${h}:${mi}:${s}`
        }else{
            result = `${y}-${m}-${d}`
        }
    }
    return result
}

/**
 * 选择并读取文件
 */
export function selectFile(types = '.*'){
    return new Promise((resolve, reject) =>{
        let input:any = document.createElement('input')
        input.type = 'file'
        input.addEventListener('change', function(e){
            let file = input.files[0]
            let reg = new RegExp(types)
            if(reg.test(file.type)){
                resolve(file)
            }else{
                reject('不支持的文件类型')
            }
            input.remove()
        })
        input.click()
    })
}

/**
 * 读取文件
 *  */
export function readFile(file, method='Text'){
    return new Promise((resolve, reject)=>{
        let reader = new FileReader()
        reader.onload = ()=>{
            resolve(reader.result)
        }
        reader.onerror = reject

        //读取方式
        if(method == 'Text'){
            reader.readAsText(file)
        }else if(method = 'BinaryString'){
            reader.readAsBinaryString(file)
        }
    })
}

//点击不在区域  隐藏
// handleDocumentClick(){
//     Var _this = this;
//     document.addEventListener('click', function(e){
//         Var sp = document.getElementsByClassName('contextmenu')[0]
//         if(sp){
//             if(!sp.contains){
//                 _this.myVal = false;
//             }
//         }
//     })
// }


/**
 * 深拷贝
 */
function cloneDeep(obj){
    var newObj={};
    for(var i in obj){
        newObj[i]=obj[i];
    }
    return newObj;
}



// 识别是否有其他窗口
// export function detectOtherWindows () {
//     let defer = new Deferred()
// }


//每隔三位小数加逗号
export function formatNum(num) {
    var num = (num || 0).toString();
    var result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
