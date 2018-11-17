const Koa = require('koa')

const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')

const config = require('../config')
const logUtil = require('./utils/logUtil')
// const { responseFormatter } = require('./middlewares')

const index = require('./routes/index')
const users = require('./routes/users')
const path = require('path')
// const api = require('./api')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(require('koa-less')(__dirname + '/views/style/so_style.less', {
  dest: path.join(__dirname, 'public'),
  force: true
}))
console.log('__dirname==', __dirname)
// app.use(require('koa-less')(`${__dirname}/public`))
app.use(require('koa-static')(`${__dirname}/public`))
app.use(views(`${__dirname}/views`, { extension: 'ejs' }))
// app.use(responseFormatter)
// logger
console.log(`当前时间 ${Date.now()}: debug 的数据是 config: `, config)
if (config.log) {
  app.use(async (ctx, next) => {
    const start = new Date()
    try {
      await next()
      const spend = Date.now() - start
      logUtil.logResponse(ctx, spend)
    } catch (error) {
      const spend = Date.now() - start
      logUtil.logError(ctx, error, spend)
    }
  })
}

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// api提供的增删改查
// app.use(api.routes(), api.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.log(err)
  console.error('server error', err, ctx)
  ctx.body = '服务器异常'
})
//
app.use(async (ctx, next) => {
  await ctx.redirect('/404')
})
module.exports = app
