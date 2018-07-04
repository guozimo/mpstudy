import wepy from 'wepy'
import { baseUrl, docUrl } from '@/utils/config'
let index = 0

const wxRequest = async (params = {}, url, silence = false) => {
  if (!silence) {
    if (!index++) {
      wepy.showLoading({
        title: '加载中',
        icon: 'loading',
        mask: true
      })
    }
  }
  const res = await wepy.request({
    url: url,
    method: params.method || 'GET',
    data: Object.assign({}, params.data, {
      timestamp: Date.now()
    }),
    header: {
      'ReqChannel': 'MASTER',
      'Content-Type': 'application/json',
      'Authorization': wepy.getStorageSync('Authorization'),
      charset: 'utf-8'
    }
  })
  if (!silence) {
    if (!--index) {
      wepy.hideLoading()
    }
  }
  if (res.statusCode >= 400) {
    !silence && wepy.showToast({
      title: '加载失败, 请稍后重试',
      icon: 'loading'
    })
    return null
  } else if (res.statusCode === 401) {
    wepy.redirectTo({
      url: '/pages/homePage/homePage?status=9'
    })
  } else {
    return res.data
  }
}

// 获取章节列表
const getChapters = params => wxRequest(params, `${baseUrl}/planType/chapters`)
// 获取做题计划
const getAnswerPlans = params => wxRequest(params, `${baseUrl}/answerPlans`, true)
module.exports = {
  getChapters,
  getAnswerPlans
}
