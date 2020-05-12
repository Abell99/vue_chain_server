const express = require('express')
const app = express()

app.use((req, res, next) => {
	console.log('请求来到了use中间件，它的请求地址为：' + req.url)
	next()
})
app.use('/user', (req, res, next) => {
	console.log('这里是/user的请求，但还是处于use中间件中')
	next()
})
app.get('/user', (req,res) => {
	res.send('这里是真正的get请求下的user路由请求')
})

app.listen(3000)
console.log('running......')
