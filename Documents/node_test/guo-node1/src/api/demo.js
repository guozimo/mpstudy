/*
 * @Author: guozimo
 * @Date: 2018-10-26 16:09:22
 * @Last Modified by: 郭子墨
 * @Last Modified time: 2018-11-05 18:27:39
 */
const router = require('koa-router')()
const { Demo } = require('../controllers')

/**
 * 示例为正常的 restful 接口, 顺序依次为
 * 增 删 改 查
 */
router.put('/', Demo.create)
router.delete('/:id', Demo.delete)
router.post('/:id', Demo.update)
router.get('/:id?', Demo.get)

module.exports = router
