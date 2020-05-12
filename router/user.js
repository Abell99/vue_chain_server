const express = require('express')
const user = express.Router();
// 引入集合
const db_User = require('../model/User.js')

// 增加用户
user.post('/adduser', (req, res) => {
	db_User.create(req.body)
		.then(result=>{
			return res.send({result,status:200,message:"用户添加成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"访问用户添加失败"})
		})
})
// 删除用户
user.delete('/deleteuser/:_id', (req, res) => {
	db_User.deleteMany(req.params)
		.then(result=>{
			return res.send({result,status:200,message:"用户删除成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"用户删除失败"})
		})
})
// 修改用户信息
user.put('/putuser/:_id', (req, res) => {
	db_User.updateOne(req.params,req.body)
		.then(result=>{
			return res.send({result,status:200,message:"用户信息修改成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"用户信息修改失败"})
		})
})
// 查询用户,带页数的
user.get('/getuser/:skip/:limit', (req, res) => {
	// console.log(req.params.skip)
	// console.log(typeof req.params.skip)
	// 限制查询条件
	const query = function(query){
		var rules = {}
		for(var item in query){
			rules[item] =  {$regex: eval(`/${query[item]}/ig`)}
		}
		console.log(rules)
		return rules	
	}
	
	// 根据查询条件查询
	db_User.find(query(req.query)).skip(Number(req.params.skip)).limit(Number(req.params.limit))
		.then(result=>{
			return res.send({result,status:200,message:"用户列表查询获取成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"访问用户列表失败"})
		})
})

user.get('/getalluser/', (req, res) => {
	// console.log(req.params.skip)
	// console.log(typeof req.params.skip)
	// 限制查询条件
	const query = function(query){
		var rules = {}
		for(var item in query){
			if(query[item]){
				rules[item] =  {$regex: eval(`/${query[item]}/ig`)}
			}		
		}
		console.log(rules)
		return rules	
	}
	
	// 根据查询条件查询
	db_User.find(query(req.query)).skip(Number(req.params.skip)).limit(Number(req.params.limit))
		.then(result=>{
			return res.send({result,status:200,message:"用户列表查询获取成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"访问用户列表失败"})
		})
})

// 登录
user.post('/login', (req, res) => {
	console.log(req.body)
	db_User.findOne(req.body)
		.then(result=>{
			return res.send({result,status:200,message:"存在该用户"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"不存在该用户"})
		})
})

module.exports = user