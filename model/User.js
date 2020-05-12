/* 
	User数据库集合
 */
const mongoose = require('mongoose');

// User						
// 字段名	类型	主键	外键	非空	限制	备注
// u_name	string			√		姓名
// u_sex	string			√	enum	性别
// u_role	string			√	enum	角色
// u_phone	number	√		√	minlength	手机号
// u_brithday	data			√		出生日期
// u_order	Array		√			订单/任务
// u_state	boolean			√	enum	状态
// u_address	string			√		住址
// u_jointime	data			√	default	创建时间

const userSchema = new mongoose.Schema({
	u_name: {
		type: String,
		required: [true,'用户名不能为空'],
		trim: true
	},
	u_psd: {
		type: String,
		required: [true,'用户密码不能为空'],
		trim: true
	},
	u_sex: {
		type: String,
		required: [true,'用户性别不能为空'],
		enum: {
			values: ['男', '女'],
			message: '用户的性别只能为男或者女'
		}
	},
	u_role: {
		type: String,
		required: [true,'用户的角色不能为空'],
		enum: {
			values: ['管理员', '配送专员', '商家'],
			message: '用户的角色只能为管理员,配送专员,或者商家'
		}
	},
	u_phone: {
		type: String,
		required: [true,'用户的手机号不能为空'],
		minlength: [3, '用户手机号最短为三位'],
		maxlength: [11, '用户手机号最长为11位']
	},
	u_brithday: {
		type: Date,
		default: Date.now,
	},
	u_order: {
		type: Array
	},
	u_state: {
		type: Boolean,
		required: [true,'用户的状态值不能为空'],
		default: true,
	},
	u_address: {
		type: Array,
		required: [true,'用户的住址不能为空']
	},
	u_jointime: {
		type: Date,
		default: Date.now
	},
	u_province: {
		type: String
	},
	u_city: {
		type: String
	},
	u_area: {
		type: String
	},
	u_town: {
		type: String
	}
});
const User = mongoose.model('User', userSchema)

module.exports = User