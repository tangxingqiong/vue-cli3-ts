/**
 * webpack打包后的vue项目本地运行命令：node app.js
 *  */
const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// 访问静态资源
app.use(express.static(path.resolve(__dirname, 'dist')))

// 访问单页
app.get('*', function (req, res) {
  var html = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')
  res.send(html)
})

// 监听
app.listen(3000, ()=> {
    console.log('Example app listening on port 3000!')
    console.log('http://localhost:3000')
})
