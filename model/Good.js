/* 
	User数据库集合
 */
const mongoose = require('mongoose');

// 字段名	类型	主键	外键	非空	限制	备注
// g_class	string			√	enum	分类
// g_name	string	√		√		货品名称
// g_price	number			√	min	单价
// g_unit	string			√		量级单位
// g_number	number			√	min	存量
// g_state	boolean			√	enum	状态
// g_img    string						图片

const goodSchema = new mongoose.Schema({
	g_class: {
		type: String,
		required: [true, '货物类型不能为空'],
		trim: true
	},
	g_name: {
		type: String,
		required: [true, '货物名称不能为空'],
		trim: true
	},
	g_price: {
		type: Number,
		required: [true, '货物单价不能为空']
	},
	g_unit: {
		type: String,
		required: [true, '货物量词不能为空']
	},
	g_number: {
		type: Number,
		required: [true, '货物存量不能为空']
	},
	g_state: {
		type: Boolean,
		required: [true, '货物的状态值不能为空'],
		default: true,
	},
	g_img: {
		type: String,
		default: '/img/demo.jpg'
	}
})

const Good= mongoose.model('Good', goodSchema)

module.exports = Good