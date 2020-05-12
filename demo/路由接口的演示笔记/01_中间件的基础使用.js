// 引入express框架
const express = require('express')
// 创建网站服务器
const app = express();

// 同样的请求如果想要同时触发,上游的请求可以只用next方法将之往下传递
app.get('/',(req,res,next)=>{
	req.name = '张三'
	// 调用next方法
	next()
})
app.get('/',(req,res)=>{
	res.send(req.name)
})
// 监听端口
app.listen(3000)
console.log('网站服务器启动成功')
