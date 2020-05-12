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

// -------------------------------------------------
// 删除一条
// findOneAndDelete----查询到一条符合的文档并删除
// User.findOneAndDelete({name: '王五'})
// 	.then(result=>{console.log(result+'删除成功就返回删除的内容')})
// -------------------------------------------------
// 删错多条
// deleteMany----删除所有符合条件的数据
// 返回参数: n--删除了多少条  ok--'1'为成功,'0'为失败
User.deleteMany({name:'abel'})
	.then(result=>{console.log(result)})