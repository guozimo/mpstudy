const env = require('./config')
if (env.env === 'prod') {
  exports.app_key = 'd881719daaf9fa327732be69d32bf651' // 请在此行填写从阿拉丁后台获取的appkey
  exports.getLocation = false // 默认不获取用户坐标位置
  exports.getUserinfo = false // 默认不获取用户头像昵称
  exports.appid = 'wx2115aba2ed1f96b9' // 用于用户登录、微信转发群信息、二维码等微信官方功能
  exports.appsecret = ''// 用于用户登录、微信转发群信息、二维码等微信官方功能
  exports.defaultPath = 'pages/index/index'// 小程序的默认首页
  exports.getShareUserInfo = false  // 分享时默认不获取用户信息
}
