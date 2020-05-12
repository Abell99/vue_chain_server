const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true,useNewUrlParser: true })
	.then(()=>console.log('数据库连接册成功'))
	.catch(err=>console.log(err,'数据库连接失败'))
const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	isPublished: Boolean
})
const Course = mongoose.model('Course', courseSchema)

// 通过调用实例化对象的方法插入文档
// 方法的参数:
// 1.插入的内容
// 2.回调函数
// Course.create({name:'javascript',author:'Abel',isPublished: true},(err,doc)=> {
// 	// 失败的时候
// 	console.log(err)
// 	// 成功的时候
// 	console.log(doc)
// })
// 所有与数据库相关的操作都是异步的,因此,可以使用promise方法来处理回调
Course.create({name:'Vue.js',author:'Abel',isPublished: true})
	.then(err=>{
		console.log(err)
	})
	.catch(result=>{
		console.log(result)
	})