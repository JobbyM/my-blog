var config = require('config-lite')(__dirname)
var Mongolass = require('mongolass')
var mongolass = new Mongolass()
mongolass.connect(config.mongodb)
