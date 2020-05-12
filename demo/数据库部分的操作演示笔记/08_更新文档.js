const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true,useNewUrlParser: true })
	.then(()=>console.log('数据库连接册成功'))
	.catch(err=>console.log(err,'数据库连接失败'))
	
const userSchema = new mongoose.Schema({
	name: String,
	age: Number,
	email: String,
	password: String,
	hobbies: [String]
})
const User = mongoose.model('user',userSchema)

// ---------------------------------------------------
// 更新单个
// updateOne----更新单个
// 传递参数： 要查询的条件   要修改的值
// 回调参数:  n--改变的数量  ok--'1'成功的信息
User.updateOne({name: '张三疯'},{name: '张三风'})
	.then(result=>{console.log(result)})
// 更改多个
// updateMany----更新多个
// 传递参数： 要查询的条件   要修改的值
// 回调参数:  n--改变的数量  ok--'1'成功的信息
User.updateMany({},{age: 56})
	.then(result=>{console.log(result)})