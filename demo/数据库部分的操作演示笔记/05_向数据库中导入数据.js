// 前提，配置mongoimport命令
// 向数据库中导入数据(json格式文档)

// 配置环境

// mongoDB导入数据依赖mongoimport命令，但是mongoimport默认不在系统环境变量中，因此要优先配置环境

// - 搜索mongoimport.exe文件所在目录
//   C:\Program Files\MongoDB\Server\4.1\bin
// - 添加到系统环境中去

// 语法

// mongoimport -d 数据库名称 -c 集合名称 -file 要导入的数据文件
