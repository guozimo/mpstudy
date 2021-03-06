const router = require('koa-router')()
const search = require('../controllers/index')
var fs = require('fs')
// 默认一级路由是/ router.prefix('/')

// 首页路由 / https://so.csdn.net/so/

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: ''
  })
})
router.get('/so', async (ctx, next) => {
  await ctx.render('index', {
    title: ''
  })
})
router.get('/json', async (ctx, next) => {
  let jsonData = {}
  await new Promise((resolve, reject) => { // 读image文件夹
    fs.readFile('./data.json', 'utf-8', function (err, json) {
      if (err) ctx.throw(err)
      jsonData = json // 将所有的文件夹名字放到外面来。
      resolve() // resolve过后，await语句才结束
    })
  })
  ctx.body = jsonData
  // console.log('外层读取到ctx===', ctx.body)
})
router.get('/404', async (ctx, next) => {
  await ctx.render('404', {
  })
})
// 数据获取回来再render页面 去controller中进行操作 搜索跳转路由 相当于跳转过来
router.get('/so/search/s.do', search.getArticleList)
// router.url('/so/search/s.do', { query: 'q=1' })
// '/formId/:formId'
// 404页面
// 搜索结果页面 https://so.csdn.net/so/search/s.do?q=%E6%98%AF%E7%9A%84
// 搜索结果全部  https://so.csdn.net/so/search/s.do?q=%E6%98%AF%E7%9A%84&t=&o=&s=&l=
// 搜索结果 博客 https://so.csdn.net/so/search/s.do?q=%E6%98%AF%E7%9A%84&t=blog&o=&s=&l=
// 搜索结果下载  https://so.csdn.net/so/search/s.do?q=%E6%98%AF%E7%9A%84&t=doc&o=&s=all&l=
// 搜索结果论坛  https://so.csdn.net/so/search/s.do?q=%E6%98%AF%E7%9A%84&t=discuss&o=simi&s=&l=

// 搜索结果学院 https://so.csdn.net/so/search/s.do?q=%E6%98%AF%E7%9A%84&t=discuss&o=simi&s=&l=
// 搜索结果问答 https://so.csdn.net/so/search/s.do?q=%E6%98%AF%E7%9A%84&t=ask&o=&s=&l=
// 搜索结果图文课 https://so.csdn.net/so/search/s.do?q=%E6%98%AF%E7%9A%84&t=gitchat&o=&s=&l=

/* ======================================================================= */
module.exports = router
