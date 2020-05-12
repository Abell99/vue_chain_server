const express = require('express')
const app = express()

// 在url地址中采取哈希的方式
app.get('/:id/:name/:age',(req,res)=>{
	res.send(req.params)
})

app.listen(3000)
console.log('服务器启动成功')