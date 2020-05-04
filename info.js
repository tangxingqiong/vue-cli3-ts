const timeStamp = Date.now()
const fs = require('fs')
const path = require('path')

const info = {
    timeStamp
}
console.log('writing info333333')
fs.writeFileSync(path.resolve(__dirname, './public/info.json'), JSON.stringify(info))

module.exports = info