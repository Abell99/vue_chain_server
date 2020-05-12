// 引入express框架
const express = require('express')
// 创建网站服务器
const app = express()
const path = require('path')

// 1.告诉express框架使用声明模板引擎渲染什么后缀的模板文件
app.engine('art',require('express-art-template'))
// 2.告诉express框架模板的存放位置在哪里
app.set('views', path.join(__dirname, '../../views'))
// 3.告诉express框架模板的默认后缀是什么
app.set('view engine', 'art')

// 创建路由
app.get('/index', (req, res) => {
	// render的作用:
		// 1.拼接模板路径
		// 2.拼接模板后缀
		// 3.绑定模板与数据
		// 4.将拼接的结果响应给客户端
	// 第二个参数用来渲染模板
	res.render('demo', {
		msg: 'message'
	})
})

// 监听端口
app.listen(3000)
console.log('网站服务器启动成功')