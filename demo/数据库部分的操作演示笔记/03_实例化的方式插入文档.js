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

// 经过观察我们发现,数据库并没有被创建成功,这是因为数据库默认在有插入数据的情况下,不进行数据库的创建

// 往集合中插入数据的一个过程,就是利用集合这个构造函数,实例化对象的一个过程
const course = new Course({
	name: 'node.js基础',
	author: 'Abel',
	isPublished: true
})
// 在插入之后,应该执行保存的一个操作
course.save()