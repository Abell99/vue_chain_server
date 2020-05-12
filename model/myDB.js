// 引入数据库模块
const Mongoose = require('mongoose')
Mongoose.connect('mongodb://localhost/chain', { useUnifiedTopology: true,useNewUrlParser: true })
	// 连接数据库成功的时候执行
	.then(()=>console.log('数据库连接册成功'))
	// 连接数据库失败的时候执行,并将错误信息返回
	.catch(err=>console.log(err,'数据库连接失败'))

	
// 引入集合
const db_User = require('./User.js')
const db_Good = require('./Good.js')
const db_Order = require('./Order.js')
// 导出数据库模块
module.exports = Mongoose	

