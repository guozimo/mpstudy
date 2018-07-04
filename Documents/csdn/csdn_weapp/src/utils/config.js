// 判定现在的环境
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
// 版本号
// const version = __VERSION__ || '开发环境'

// 多环境接口 url
const baseUrl = {
  // dev: 'https://exam.zmgongzuoshi.top/api/v1',
  // prod: 'https://exam.sunlands.site/api/s__SVERSION__'
  dev: 'https://exam.sunlands.site/api/s1'
}

// 多环境图片地址
const imageUrl = {
  prod: 'https://r.exam.sunlands.site/s__SVERSION__',
  dev: 'http://static.sunlands.niubishanshan.top:8083'
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
