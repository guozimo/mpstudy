let face = null
import wepy from 'wepy'
import { staticUrl } from './config'
const audioList = [
  [
    'correct',
    'correct2.mp3'
  ],
  [
    'error',
    'error2.mp3'
  ],
  [
    'upgrade',
    'upgrade2.mp3'
  ],
  [
    'matchsuccess',
    'matchsuccess2.mp3'
  ],
  [
    'victory',
    'victory2.mp3'
  ],
  [
    'defeat',
    'defeat2.mp3'
  ],
  [
    'button',
    'button2.mp3'
  ],
  [
    'draw',
    'draw2.mp3'
  ]
]
class Audio {
  constructor() {
    if (!face) {
      face = this
      this.init()
    }

    return face
  }
  init() {
    this.audioList = audioList
    this.preLoadAudio()
  }

  preLoadAudio() {
    audioList.forEach(item => {
      this[`${item[0]}Context`] = wepy.createInnerAudioContext()
      this[`${item[0]}Context`].autoplay = false
      this[`${item[0]}Context`].src = `${staticUrl}/audio2/${item[1]}`
    })
  }
  play(name) {
    if (!name) throw new Error('调用音频组件的 paly 方法时候必须name')
    this[`${name}Context`].play()
  }
}

export default new Audio()
