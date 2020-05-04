/**
 * webpack打包后的vue项目本地运行命令：node app.js
 *  */
const express = require('express')
const app = express()
// const fs = require('fs')

app.use(express.static('dist'))

app.listen(3000, ()=> {
    console.log('Example app listening on port 3000!')
    console.log('http://localhost:3000')
})