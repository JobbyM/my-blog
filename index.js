var express = require('express')
var app = express();

// 挂载根路由器
app.get('/', function(req, res){
  res.send('hello, express')
})

app.listen(3000)
