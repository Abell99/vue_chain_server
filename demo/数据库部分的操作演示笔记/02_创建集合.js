const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true,useNewUrlParser: true })
	.then(()=>console.log('数据库连接册成功'))
	.catch(err=>console.log(err,'数据库连接失败'))
	
// 创建集合规则
// 集合中的对象，就是集合中每一列的数据类型
const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	isPublished: Boolean
});
// 使用集合规则创建集合
// 创建集合的时候要求集合首字母大写，但是在数据库中，会变成小写，并且为复数：
// 例如:Course => courses
const Course = mongoose.model('Course', courseSchema)