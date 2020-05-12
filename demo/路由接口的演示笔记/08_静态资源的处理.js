const express = require('express')
const app = express()

// 使用中间件拦截请求,实现静态资源访问功能
const path = require('path')
const path_public = path.join(__dirname, '../../public')
//第一个参数可选，为虚拟路径
app.use('/static',express.static(path_public))
//根据url路径可以直接访问

app.listen(3000)
console.log('服务器启动成功')