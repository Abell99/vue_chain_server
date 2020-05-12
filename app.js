// 入口文件
// 引入express框架
const express = require('express')
// 创建网站服务器
const app = express()
// 引入数据库模块化后的对象
const mongoose = require('./model/myDB.js')
// 引入path模块
const path = require('path')
// 引入fs模块
const fs = require('fs')
// 引入body-parser模块
const bodyParser = require('body-parser')
// 用于处理文件上传
var multer=require('multer')
// 设置跨域和相应数据格式
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  if (req.method == 'OPTIONS') res.sendStatus(200)
  /*让options请求快速返回*/ else next()
})

// 配置body-parser模块
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// 引入promisify
const promisify = require('util').promisify
// 1.告诉express框架使用声明模板引擎渲染什么后缀的模板文件
app.engine('art',require('express-art-template'))
// 2.告诉express框架模板的存放位置在哪里
app.set('views', path.join(__dirname, './views'))
// 3.告诉express框架模板的默认后缀是什么
app.set('view engine', 'art')

// 写在最前面,维护网站的时候打开
// app.use((req, res)=>{
// 	res.send('不好意思，服务器正在维护')
// })

// 进入路由的入口,告知服务器,自己的请求信息
app.use((req, res, next)=>{
	console.log('发起了路由请求,请求地址为'+req.url)
	next()
})


// 引入模块路由
const user = require('./router/user.js')
// 挂载use中间件
app.use('/user', user)

const good = require('./router/good.js')
// 挂载use中间件
app.use('/good', good)

const order = require('./router/order.js')
// 挂载use中间件
app.use('/order', order)

// 处理文件上传
// ------------------------------------------------------------------方案一
// var createFolder = function(folder){
//  try{
//   fs.accessSync(folder); 
//  }catch(e){
//   fs.mkdirSync(folder);
//  } 
// };
 
// var uploadFolder = './upload/';
 
// createFolder(uploadFolder);
 
// // 通过 filename 属性定制
// var storage = multer.diskStorage({
//  destination: function (req, file, cb) {
//   cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
//  },
//  filename: function (req, file, cb) {
//   // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
//   let suffix=file.mimetype.split('/')[1];//获取文件格式
//   cb(null, file.fieldname + '-' + Date.now()+'.'+suffix); 
//  }
// });
 
// // 通过 storage 选项来对 上传行为 进行定制化
// var upload = multer({ storage: storage })
 
// app.post('/profile',upload.single('file'),function(req,res,next){
// //req.body contains the text fields
//  console.log(req.file,'------',req.body,'-------',req.file.path);
//  // res.end(req.file.buffer);
//  // console.log(req.file.buffer.toString().length);
  
//  res.end('ok');
// })
// ---------------------------------------------------------------------------------方案二

app.post('/upload', multer({
  //设置文件存储路径
  dest: 'public/img'
}).array('file', 1), function (req, res, next) {
  let files = req.files;
  let file = files[0];
  let fileInfo = {};
  let path = 'public/img/' + Date.now().toString() + '_' + file.originalname;
  fs.renameSync('./public/img/' + file.filename, path);
  //获取文件基本信息
  fileInfo.type = file.mimetype;
  fileInfo.name = file.originalname;
  fileInfo.size = file.size;
  fileInfo.path = path;
  res.json({
    code: 0,
    msg: 'OK',
    data: fileInfo
  })
});
// -------------------------------------------------------------------------------------

// 静态文件资源服务
// ------------------------------------------------------------------------------------
app.use('/public', express.static(path.join(__dirname, 'public')))
// --------------------------------------------------------------------------------------


// 自定义404页面
app.use((req, res)=>{
	res.status(404).render('accident',{
		msg: '不好意思，发生了404错误，找不到您要访问的网址！！！'
	})
})
// 错误信息集中处理
app.use((err, req, res, next) => {
	res.status(500).render('accident',{
		msg: err.message
	})
})

// 监听端口
app.listen(1314)
console.log('网站服务器启动成功')

// module.exports = {
//   dev: {
//     // proxyTable: proxyConfig.proxyList, // 无效，不使用，20190422
//     proxyTable: {
//       '/api': {
//           target: 'http://localhost:1314',//后端接口地址
//           changeOrigin: true,//是否允许跨越
//           pathRewrite: {
//               '^/api': 'http://localhost:1314',//重写,
//           }
//       }
//     },
//   }
// }
module.exports = app