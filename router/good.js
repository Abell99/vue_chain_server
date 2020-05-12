const express = require('express')
const good = express.Router();
// 引入集合
const db_Good = require('../model/Good.js')

// 添加货物
good.post('/addgood', (req, res) => {
	db_Good.create(req.body)
		.then(result=>{
			return res.send({result,status:200,message:"货物添加成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"货物添加失败"})
		})
})
// 删除货物
good.delete('/deletegood/:_id', (req, res) => {
	db_Good.deleteMany(req.params)
		.then(result=>{
			return res.send({result,status:200,message:"货物删除成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"货物删除失败"})
		})
})
// 修改货物
good.put('/putgood/:_id', (req, res) => {
	db_Good.updateOne(req.params,req.body)
		.then(result=>{
			return res.send({result,status:200,message:"货物信息修改成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"货物信息修改失败"})
		})
})
// 查询货物
good.get('/getgood', (req, res) => {
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
	db_Good.find(query(req.query))
		.then(result=>{
			return res.send({result,status:200,message:"货物列表查询获取成功"})
		})
		.catch(error=>{
			return res.send({error,status:400,message:"访问货物列表失败"})
		})
})
module.exports = good