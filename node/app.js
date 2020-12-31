const express = require('express')
const http = require('http')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.all("*", function(req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	//跨域允许的请求方式 
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	if (req.method.toLowerCase() == 'options')
		res.sendStatus(200); //让options尝试请求快速结束
	else
		next();
})
// const mysql_config = {
//     host:'qdm19942899.my3w.com',
//     port:'3306',
//     user:'qdm19942899',
//     password:'sql283251605.',
//     database:'qdm19942899_db',
//     multipleStatements: true,//多条语句
//     useConnectionPooling: true  
// }
const mysql_config = {
    host:'192.168.0.119',
    port:'3306',
    user:'root',
    password:'root',
    database:'bendi',
    multipleStatements: true,//多条语句
    useConnectionPooling: true  
}
let connection = mysql.createConnection(mysql_config)

connection.on('error', function(err) {
   
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('需要重新连接');
      connection = mysql.createConnection(mysql_config)
    } else {
        throw err;
    }
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

// 登录
app.post('/login', (req, res) => {
	let sql = `select * from level_teacher  where account='${req.body.account}' and password = '${req.body.password}'`
	let info = req.body
	if(info.type == 0){
		sql = `select * from  level_user  where account='${req.body.account}' and password = '${req.body.password}'`
	}
	
	connection.query(sql, (err, result) => {
		
		if (err || !result.length) {
			res.send({
				status: 400,
				msg: '账号或密码错误',
				data: result
			})
			return
		}
		
		res.send({
			status: 200,
			msg: '操作成功',
			data: result[0]
		})

	})
})

// 添加请假
app.post('/student/add_vacate', (req, res) => {
	let info = req.body
	let sql = `insert into level_information set?`
	connection.query(sql, info, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
		res.send({
			status: 200,
			msg: '添加成功',
			data: []
		})
	})
})
// 修改密码
app.post('/modifypwd', (req, res) => {
	let sql = `update level_user set password = ${req.body.password} where id = ${req.body.id}`
	if(req.body.status === '1'){
	
	sql = `update level_teacher set password = ${req.body.password} where id = ${req.body.id}`
	}
	console.log(sql)
	connection.query(sql, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
		res.send({
			status: 200,
			msg: '修改成功',
			data: []
		})

	})
})
// 修改请假状态
app.post('/updatestatus', (req, res) => {
	let sql = `update level_information set status = ${req.body.status} where id = ${req.body.id}`
	
	connection.query(sql, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
		res.send({
			status: 200,
			msg: '修改成功',
			data: []
		})

	})
})
// 添加用户
app.post('/adduser', (req, res) => {
	let sql = `insert into level_teacher set?`
	let info = req.body
	if(info.grade_id){
		sql = `insert into level_user set?`
	}

	connection.query(sql, info, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
		res.send({
			status: 200,
			msg: '注册成功',
			data: result
		})

	})
})

// 添加教师
app.post('/addteacher', (req, res) => {
	let sql = `insert into level_teacher set?`
	let info = req.body
	if(info.grade_id){
		sql = `insert into level_user set?`
	}

	connection.query(sql, info, (err, result) => {
		if (err) {
			return console.log(err.message)
		}
		res.send({
			status: 200,
			msg: '成功添加',
			data: result
		})

	})
})
// 获得教师列表
app.get('/api/getproduct',(req,res)=>{
	let sql = "SELECT * from product"
	connection.query(sql,(err,result)=>{
		res.send({  
			status:200,
			data:result,
			msg:'请求成功'
		})
	})
})
// 删除教师
app.post('/deleteteacher',(req,res)=>{
	let sql = `delete  from level_teacher where id=${req.body.id}`
	connection.query(sql,(err,result)=>{
		res.send({  
			status:200,
			data:result,
			msg:'请求成功'
		})
	})
})
// 查询请假订单详情
app.get('/getdetail',(req,res)=>{

	let sql = `SELECT * from level_information where id = ${req.query.id}`

	connection.query(sql,(err,result)=>{
		res.send({
			status:200,
			data:result[0],
			msg:'请求成功'
		})
	})
})
//查询 待审核 未审核 已通过
app.post('/getinformation',(req,res)=>{
	let info = req.body
	let sql = `SELECT * from level_information where grade_id = ${info.id} and status = ${info.status}`
	if(info.grade_id){
		sql = `SELECT * from level_information where stu_id = ${info.account} and status = ${info.status}`
	}
	connection.query(sql,(err,result)=>{
		res.send({
			status:200,
			data:result,
			msg:'请求成功'
		})
	})
})


//按照时间查询 根据status 增加不同的查询条件
app.get('/findtimelist',(req,res)=>{
	let info = req.query
	// 默认教师查询
	let sql = `SELECT * from level_information where grade_id = ${info.grade_id} and start_time>='${info.start_time}' and end_time<'${info.end_time}'`
	if(info.status==0){
		sql = `SELECT * from level_information where stu_id = ${info.account} and  start_time>='${info.start_time}'and end_time<'${info.end_time}'`
	}else if(info.status == 2){
		sql = `SELECT * from level_information where  start_time>='${info.start_time}' and end_time<'${info.end_time}'`

	}
	connection.query(sql,(err,result)=>{
		res.send({
			status:200,
			data:result,
			msg:'请求成功'
		})
	})
})
//按类型查询
app.get('/findtypelist',(req,res)=>{
	let info = req.query
	// 默认教师查询
	let sql = `SELECT * from level_information where grade_id = ${info.grade_id} and type='${info.type}'`
	if(info.status==0){
		sql = `SELECT * from level_information where stu_id = ${info.account} and  type='${info.type}'`
	}else if(info.status == 2){
		sql = `SELECT * from level_information where  type='${info.type}'`



	}
	connection.query(sql,(err,result)=>{
		res.send({
			status:200,
			data:result,
			msg:'请求成功'
		})
	})
})

app.listen(6969, () => {
	console.log('6969端口已经开启...')
})
