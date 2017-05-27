var path = require('path')
var express = require('express')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var flash = require('connect-flash')
var config = require('config-lite')(__dirname)
var routes = require('./routes')
var pkg = require('./package')
var winston = require('winston')
var expressWinston = require('express-winston')


var app = express();

// 设置存放模块文件的目录
app.set('views', path.join(__dirname, 'views'))
// 设置模块引擎为ejs
app.set('view engine', 'ejs')


// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// session 中间件
app.use(session({
  name: config.session.key, // 设置cookie 中保存session id 的字段名称
  secret: config.session.secret, // 通过设置secret 来计算hash 值并放在cookie 中，使产生的signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为false， 强制创建一个session， 即使用户未登录
  cookie: {
    maxAge: config.session.maxAge // 过期时间，过期后cookie 中的session id 自动删除
  },
  store: new mongoStore({// 将session 存储到mongodb
    url: config.mongodb // mongodb 地址
  })
}))

// flash 中间件，用来显示通知
app.use(flash())

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true // 保留后缀
}))

// 设置模块全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

// 添加模块必需的三个变量
app.use(function(req, res, next){
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))
// 路由
routes(app)
// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))

// error page
app.use(function(err, req, res, next){
  res.render('error', {
    error: err
  })
})

if(module.parent){
  module.exports = app
}else{
  // 监听端口，启动程序
  var port = process.env.PORT || config.port
  app.listen(port, function(){
       console.log(`${pkg.name} listening on port ${port}`)
  })

}
