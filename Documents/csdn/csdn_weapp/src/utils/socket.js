
import wepy from 'wepy'
import PubSub from 'pubsub-js'
import {
  socketUrl
} from './config'
/* eslint-disable */
class Socket {
  constructor() {
    this.init()
    this.Socket = null
    this.heart = true
    this.timer = null
  }

  static getInstance() {
    if (!Socket.instance) {
      Socket.instance = new Socket()
    }
    return Socket.instance
  }
  // 初始化
  init() {
    this.bindLinkEvent()
  }
  // 创建长链接
  async createSocketLink() {
    if (this.Socket) {
      return
    }
    const token = wepy.getStorageSync('Authorization')
    this.Socket = wx.connectSocket({
      url: socketUrl + token
    })

    wx.onSocketOpen(() => {
      PubSub.publish('WAIT.CONNECT')
    })
  }
  closeSocketLink() {
    // 断开前未链接 socket 直接退出
    if (!this.Socket) return
    wx.closeSocket()
  }
  // 绑定链接事件
  bindLinkEvent() {
    wx.onSocketMessage((msg) => {
      this.handleMsg(msg)
    })
    wx.onSocketClose((msg) => {
      this.Socket = null
    })
  }
  sleep(T) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, T)
    })
  }
  // 绑定系统事件
  async handleMsg(msg) {
    /* eslint-disable */
    console.log('服务端推送消息：', msg.data)
    switch (msg.data) {
      case '1':
        this.heart = true
        break
      case 'FIND':
        // 找到对手
        PubSub.publish('WAIT.FIND')
        break
      case 'START':
      // 开始比赛
        PubSub.publish('WAIT.START')
        PubSub.publish('RES.START')
        break
      case 'NEXT':
      // 获取下一题
        await this.sleep(1000)
        PubSub.publish('FIGHT.NEXT')
        break
      case 'READY':
      // 对方以答题
        PubSub.publish('FIGHT.READY')
        break
      case 'END':
      // 结束
        await this.sleep(1000)
        PubSub.publish('FIGHT.END')
        break
      case 'ERROR':
      // 对方离开
        PubSub.publish('WAIT.ERROR')
        PubSub.publish('RES.ERROR')
        break
      case 'CLOSE':
        PubSub.publish('WAIT.CLOSE')
        break
      case 'GIVE_UP':
      // 比赛中对方离开
        PubSub.publish('FIGHT.GIVE_UP')
        PubSub.publish('READY.GIVE_UP')
        break
      case 'MARK_TIMEOUT':
      // 房间超时
        PubSub.publish('WAIT.MARK_TIMEOUT')
        break
      case 'JOIN_ERROR':
      // 比赛已开始
        PubSub.publish('WAIT.JOIN_ERROR')
        break
      case 'JOIN_LATE':
        PubSub.publish('WAIT.JOIN_LATE')
        break
      case 'IS_ME':
      // 本人分享
        PubSub.publish('WAIT.IS_ME')
        break
    }
  }
  // 心跳
  heartBeat() {
    this.timer = setTimeout(() => {
      if (!this.heart) {
        this.Socket = null
        this.closeSocketLink()
        return
      }
      if (!this.Socket) {
        return
      }
      this.heartBeat()
      wepy.sendSocketMessage({
        data: '1'
      }).then(() => {
        this.heart = false
      }).catch(() => {
        this.heart = false
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
      })
    }, 5e3)
  }
}

export default Socket.getInstance()
