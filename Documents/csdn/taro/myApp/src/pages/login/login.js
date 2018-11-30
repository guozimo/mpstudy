import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text,Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { is, fromJS } from 'immutable';
import { add, minus, asyncAdd,plug2} from '../../actions/counter'
import PropTypes from 'prop-types';
import { imageUrl} from '../../utils/base'
import './login.less'

// counter也相当于是直接引入的action
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  },
  plug2(){
    dispatch(plug2())
  }
}))
class Login extends Component {

    config = {
      navigationBarTitleText: '',
      backgroundTextStyle: 'light',
      navigationBarTextStyle: 'black',
      navigationBarBackgroundColor: '#f7f8fa',
      disableScroll: true
    }
  constructor (){
      super();
      this.state = {
        imgRc : `${imageUrl}/csdn-logo.png`
      }
  }
  static propTypes = {
    add: PropTypes.func.isRequired
    // dec: PropTypes.func.isRequired,
    // asyncAdd: PropTypes.func.isRequired,
    // clearData: PropTypes.func.isRequired,
    // clearSelected: PropTypes.func.isRequired
    // datas:PropTypes.object.isRequired,
  }

  componentWillUnmount () {
  }
  componentDidShow () {
    console.log('imageUrl111111=====',imageUrl)
  }

  componentDidHide () { }
  componentDidMount(){
     // console.log('进入didmount111====',this.props)
    console.log('imageUrl666999966=====',imageUrl)
    this.props.dispatch(asyncAdd())
  }
  componentWillReceiveProps(nextProps){
    if(!is(fromJS(this.props.add), fromJS(nextProps.add))){
      this.initData(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }
  render () {
    return (
    <View className='login_box'>
      <View className="logo_pic">
      <Image src={this.state.imgRc} className="logo"></Image>
      </View>
    </View>
    )
  }
}

export default Login
