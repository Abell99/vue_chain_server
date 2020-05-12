const express = require('express')
const app = express()

// req.query接收get请求参数
app.get('/',(req,res)=>{
	res.send(req.query)
})

// 接收post参数需要借助第三方包body-parser
const bodyParser = require('body-parser')
// 配置body-parser模块
app.use(bodyParser.urlencoded({extended:false}))
// 接收请求
app.post('/add',(req,res)=>{
	res.send(req.body)
})

app.listen(3000)
console.log('服务器启动成功')