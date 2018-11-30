// 判定现在的环境
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
console.log(env,'env=====')
// 版本号
// const version = __VERSION__ || '开发环境'

// 多环境接口 url
const baseUrl = {
  prod: 'https://passport.csdn.net',
  dev: 'https://passport.csdn.net'
}

// 多环境图片地址
const imageUrl = {
 // dev: 'http://local.csdnimg.cn:8080/src/images',
  dev: 'https://csdnimg.cn/weapp/csdn_weapp',
  // 测试环境先走服务器上资源 新增图片再放本地
  prod: 'https://csdnimg.cn/weapp/csdn_weapp'
// 新增图片后面直接加图片名称即可 /333.png
}
// webSocet Url
const socketUrl = {
  dev: 'wss://exam.zmgongzuoshi.top/api/v1/ws/pk/',
  prod: 'wss://exam.sunlands.site/api/s__SVERSION__/ws/pk/'
}
module.exports = {
  imageUrl: imageUrl[env],
  baseUrl: baseUrl[env],
  socketUrl: socketUrl[env]
}
