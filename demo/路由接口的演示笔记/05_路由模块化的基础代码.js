const express = require('express')
const app = express()
// 创建路由对象
const home = express.Router()
// 将路由对象匹配请求参数
app.use('/home',home)
// 创建二级路由
home.get('/index',(req,res)=>{
	res.send('欢迎来到博客首页界面')
})

// 监听端口
app.listen(3000)