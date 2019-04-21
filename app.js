
const Koa = require('koa')
const middleware = require('./lib/middleware')
const config = require('./config/config')
const reply = require('./reply')
const app = new Koa()

app.use(middleware(config, reply.reply)) 

app.listen(9090)