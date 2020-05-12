const express = require('express')
const app = express()
const fs = require('fs')
// 基于promise的异步函数处理,需要导入promisify
const promisify = require('util').promisify
// 将所需要的异步函数从新包装
const readFile = promisify(fs.readFile)

// 异步函数请求发生错误的时候的错误处理
app.get('/abc', async (req, res, next)=>{
	try {
		await readFile('./dem.js')
	}catch(ex){
		next(ex)
	}
})

// 错误处理中间件
app.use((err, req, res, next) => {
	res.status(500).send(err.message)
})
app.listen(3000)
console.log('running......')
 