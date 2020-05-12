const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => console.log('running......'))
	.catch(err => console.log(err, '数据库连接失败'))
	
// ------------------------------------------------------
// 用户集合
const User = mongoose.model('User',new mongoose.Schema({name:{type:String}}))
// 文章集合
const Post = mongoose.model('Post',new mongoose.Schema({
	title: {type: String},
	// 使用ID将文章集合和作者集合进行关联
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}))

// 创建用户
// User.create({name: 'itheima'}).then(result => console.log(result))
// 创建文章
// Post.create({title: '123', author: '5e947323594f822e1061092b'})
// 	.then(result => console.log(result))

// 联合查询 
// populate()----这里面指定的就是外联键
Post.find({title: '123'}).populate('author')
	//在输出的时候，外联键会替换为用户信息输出
	.then((result) => console.log(result))