/**
 * @Author: guozimo
 * @Date: 2018-10-26 23:37:42
 * @Last Modified by: guozimo
 * @Last Modified time: 2018-10-26 23:37:42
 */
// exports.Demo = require('./demo')
var http = require('http')
const request = require('request-promise-native')
exports.getArticleList = async (ctx, next) => {
// 如果请求数据为空 展示空404页面 否则展示请求回数据的页面
  let res = await request('http://loc-i.csdn.net:3000/json')
  const newData = JSON.parse(res)
  console.log(newData.item, 'newData', typeof (newData.item))
  await ctx.render('answer', {
    title: '',
    dataList: newData.item
  })
}
