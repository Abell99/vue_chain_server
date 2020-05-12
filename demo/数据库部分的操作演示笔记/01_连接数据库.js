// 引入mongoose第三方包,从而来操作数据库
const mongoose = require('mongoose');

// 使用connect方法连接数据库
// 参数: 地址+名称  链接数据库的选项，可以直接复制粘贴
// 如果在请求的时候发现没有该名称的数据库，会自动添加一个这样的数据库
mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true,useNewUrlParser: true })
	// 连接数据库成功的时候执行
	.then(()=>console.log('数据库连接册成功'))
	// 连接数据库失败的时候执行,并将错误信息返回
	.catch(err=>console.log(err,'数据库连接失败'))