const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => console.log('running......'))
	.catch(err => console.log(err, '数据库连接失败'))

// -----------------------------------------------
// mongoose验证
// 类似于vue的表单验证，不过是作用于创建表格的时候
const postSchema = new mongoose.Schema({
	title: {
		// 定义字段类型
		type: String,
		// 限制不能为空
		required: [true, '请传入文章标题'],
		// 限制字符串最小长度
		minlength: [1, 'title最小长度为1'],
		// 限制字符串最大长度
		maxlength: [5, 'title最大长度为5'],
		// 清除字符串空格
		trim: true,

	},
	age: {
		type: Number,
		// 限制数值最小值
		min: [0, '年龄最小只能为0'],
		// 限制数值最大值
		max: [150, '年龄最大只能为100']
	},
	publishDate: {
		type: Date,
		// 默认值,Date.now返回当前时间
		default: Date.now,
		message:'时间选项只能填入时间类型的参数'
	},
	category: { //分类
		type: String,
		// 枚举，列举出当前字段可以拥有的值
		enum: {
			values: ['html', 'css', 'javascript', 'node.js'],
			message: '分类名称要在一定的范围内才可以'
		}
	},
	author: {
		type: String,
		// 自定义验证
		validate: {
			// 自定义验证属性参数说明:
			// 返回类型: 布尔类型,
			// 传入参数: 要验证的值
			validator: v => {
				return v && v.length > 4
			},
			//自定义错误信息
			message: '传递的值不符合验证规则'
		}
	}
})
const Post = mongoose.model('post', postSchema)

Post.create({
		title: 'abe11222',
		age: -8,
		category: 'htm',
		author: '123'
	})
	.then(resule => console.log(resule))
	.catch(error => {
		// 获取错误信息对象
		const err = error.errors
		// 循环错误信息对象
		for (var attr in err) {
			// 将错误信息打印到控制台中去
			console.log('数据库报错，在' + attr +'列中,错误信息为:'+err[attr]['message'])
		}
	})
