/* 
	User数据库集合
 */
const mongoose = require('mongoose');

// 字段名	类型	主键	外键	非空	限制	备注
// o_id	number	√		√		订单ID
// o_user	number		√	√		下单用户
// o_server	number		√	√		接单人员
// o_order	Array			√		订单内容
// o_jointime	data			√	default	创建时间
// o_state	boolean			√	enum	状态

const orderSchema = new mongoose.Schema({
	o_user: {
		type: mongoose.Schema.Types.ObjectId, ref:'User',
		require: [true, '请为订单提供下单用户']
	},
	o_username: {
		type: String,
		require: [true, '请为订单提供下单用户']
	},
	o_server: {
		type: mongoose.Schema.Types.ObjectId, ref:'User',
		require: [true, '请为订单提供接单人员']
	},
	o_servername: {
		type: String,
		require: [true, '请为订单提供接单用户']
	},
	o_order: {
		type: Object
	},
	o_jointime: {
		type: Date,
		default: Date.now
	},
	o_state: {
		type: Boolean,
		required: [true,'订单状态值不能为空'],
		default: true,
	}
})

const Order= mongoose.model('Order', orderSchema)

module.exports = Order