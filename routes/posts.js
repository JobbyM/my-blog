var express = require('express')
var router = express.Router()

var checkLogin = require('../middlewares/check').checkLogin

// GET /posts 所有用户或特定用户的文章页
// GET /posts?author=xxx
router.get('/', function(req, res, next){
  res.render('posts')
})

// POST /posts 发表一篇文章
router.post('/', checkLogin, function(req, res, next){
  res.send(req.flash())
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function(req, res, next){
  res.send(req.flash())
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', checkLogin, function(req, res, next){
  res.send(req.flash())
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function(req, res, next){
  res.send(req.flash())
})

// GOST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function(req, res, next){
  res.send(req.flash())
})

// GET /posts/:postId/remove 删除一篇文章
router.post('/:postId/remove', checkLogin, function(req, res, next){
  res.send(req.flash())
})

// POST /posts/:postId/comment 创建一条留言
router.get('/:postId/comment', checkLogin, function(req, res, next){
  res.send(req.flash())
})

// GET /posts/:postId/comment/:commmentId/remove 删除一条留言
router.get('/:postId/comment/:commmentId/remove', checkLogin, function(req, res, next){
  res.send(req.flash())
})


module.exports = router
