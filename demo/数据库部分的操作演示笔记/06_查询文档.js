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
// -----------------------------------
// 查询所有
// 根据条件查找文档(条件为空，则查找所有文档)
// 无条件查询
// User.find().then(result=>{
// 	console.log(result)
// })
// ------------------------------------
// 查询有无
// findOne()方法用来检测是否存在，返回一条文档，默认返回当前集合中的第一条文档
// User.findOne({name:'李四'}).then(result=>{
// 	console.log(result)
// })
// --------------------------------------
// 匹配条件:范围
// $gt----大于   $lt----小于
// User.find({age:{$gt:20,$lt:40}}).then(result=>{
//  console.log(result)
// })
// --------------------------------------
// 匹配条件:包含
// $in----包含
// User.find({hobbies:{$in:['足球']}}).then(result=>{
//  console.log(result)
// })
// ---------------------------------------
// 选择查询字段
// select----查询固定字段
// select方法的字段中,需要查询的字段直接写上,不想要查询的字段在前面加上一个'-'即可完美解决
// User.find().select('name email -_id').then(result=>{
//  console.log(result)
// })
// --------------------------------------
// 排序
// sort----升降序排序
// 升序则为+,降序则为-
// User.find().sort('-age').then(result=>{
//  console.log(result)
// })
// ---------------------------------------
// 分页
//limit----跳过多少条数据  skip----限制查询数量
// User.find().skip(2).limit(2).then(result=>{
//  console.log(result)
// })   