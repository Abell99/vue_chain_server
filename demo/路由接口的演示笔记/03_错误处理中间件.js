const express = require('express')
const app = express()
const fs = require('fs')

// 手动抛出一个错误,抛出同步错误
app.get('/index', (req, res) => {
	throw new Error('index路由抛出了一个错误信息')
})

// 抛出异步错误
app.get('',(req, res, next)=> {
	fs.readFile('./demo.txt','utf8',(err,result)=> {
		if(err!=null){
			next(err)
		}else{
			res.send(result)
		}
	})
})

// 错误处理中间件
app.use((err, req, res, next) => {
	res.status(500).send(err.message)
})
app.listen(3000)
console.log('running......')
 