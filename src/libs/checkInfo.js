import axios from 'axios'
// 版本信息核验
export default  async function (){
    // 只在production检验
    if (process.env.NODE_ENV !== 'production') {
        return
    }
    const local = INFO
    const { data: remote } = await axios.get('/info.json', {
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
    console.log(local, remote)
    if (local.timeStamp !== remote.timeStamp){
        setTimeout(() => {
            window.location.reload()
        }, 200)
    }
}