var path = require('path')
var express = require('express')
var app = express();
var indexRouter = require('./routes/index')
var userRouter = require('./routes/users')

app.set('views', path.join(__dirname, 'views')) // 设置存放模块文件的目录
app.set('view engine', 'ejs') // 设置模块引擎为ejs

app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(3000)
