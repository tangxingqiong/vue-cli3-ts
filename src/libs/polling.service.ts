/**
 * @description 轮询事件
 * 
 * @param {Function} request
 * @param {Number} delay
 * @param {Number} gap
 * @eg
 * import Polling from '@/libs/polling.service'
 * const requestFunc = api().then(res => {
 *  console.log(res.data)
 * })
 * this.polling = new Polling(requestFunc, 5000, 5000)
 * this.plooing.start()
 */
export default class Polling {
    interval: any
    requesting: boolean
    request: any
    delay: number
    gap: number
    constructor (request, delay = 1000, gap = 3000) {
        this.interval = null
        this.requesting = false
        this.request = request
        // 1s后开始第一次轮询
        this.delay = delay
        // 5秒轮询一次
        this.gap = gap
    }
    start () {
        const doRequest = () => {
            if (!this.requesting) {
                this.requesting = true
                // request有可能在stop中被清除
                if(this.request) {
                    this.request().finally(() => {
                        this.requesting = false
                    })
                }
            }
        }
        setTimeout (() => {
            doRequest()
            this.interval = setInterval(doRequest, this.gap)
        }, this.delay)
    }
    stop () {
        // 清除所有引用，防止内存泄漏
        clearTimeout(this.interval)
        this.interval = null
        this.request = null
    }
}
