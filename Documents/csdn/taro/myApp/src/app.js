import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Login from './pages/login'

import configStore from './store'

import './app.less'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/login/login'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarTitleText: 'CSDN',
      navigationBarTextStyle: 'white',
      // navigationBarBackgroundColor: '#ff5257'
      navigationBarBackgroundColor: '#ba2d23'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
