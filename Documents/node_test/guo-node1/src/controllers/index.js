/**
 * @Author: guozimo
 * @Date: 2018-10-26 23:37:42
 * @Last Modified by: guozimo
 * @Last Modified time: 2018-10-26 23:37:42
 */
// exports.Demo = require('./demo')
exports.getArticleList = async (ctx, next) => {
  // await
  // ctx.body = ret
  console.log('进入s.do===')
  console.log('ctx======',ctx)
//如果请求数据为空 展示空404页面 否则展示请求回数据的页面
  console.log('ctx.query',ctx.query)
  await ctx.render('answer', {
    title: ''
  })
}
