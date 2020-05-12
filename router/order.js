const express = require('express')
const order = express.Router();
// 引入集合
const db_Order = require('../model/Order.js')

// 添加订单
order.post('/addorder', (req, res) => {
	db_Order.create(req.body)
		.then(result=>{
			return res.send({result,status:200,message:"订单添加成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"订单添加失败"})
		})
})
// 删除订单
order.delete('/deleteorder/:_id', (req, res) => {
	db_Order.deleteMany(req.params)
		.then(result=>{
			return res.send({result,status:200,message:"订单删除成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"订单删除失败"})
		})
})
// 修改订单
order.put('/putorder/:_id', (req, res) => {
	db_Order.updateOne(req.params,req.body)
		.then(result=>{
			return res.send({result,status:200,message:"订单信息修改成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"订单信息修改失败"})
		})
})
// 根据拥有者查询订单
order.get('/getorderuser', (req, res) => {
	// 限制查询条件
	console.log(req.query)
	const query = function(query){
		var rules = {}
		for(var item in query){
			rules[item] =  {$regex: eval(`/${query[item]}/ig`)}
		}
		console.log(rules)
		return rules	
	}
	// 根据查询条件查询
	db_Order.find(query(req.query))
		.then(result=>{
			return res.send({result,status:200,message:"订单列表查询获取成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"访问订单列表失败"})
		})
})
// 查询订单
order.get('/getorder', (req, res) => {
	// 限制查询条件
	console.log(req.query)
	const query = function(query){
		var rules = {}
		for(var item in query){
			rules[item] =  {$regex: eval(`/${query[item]}/ig`)}
		}
		console.log(rules)
		return rules	
	}
	// 根据查询条件查询
	db_Order.find(query(req.query)).populate('o_user').populate('o_server')
		.then(result=>{
			return res.send({result,status:200,message:"订单列表查询获取成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"访问订单列表失败"})
		})
})

module.exports = order