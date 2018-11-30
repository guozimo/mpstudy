# 百度小程序 微信小程序 支付宝小程序 H5 react-native多端编译支持 （seed_taroapp）
------------

* 项目依赖React、jsx、Ant Design、React-redux, 工程构建基于[taro](https://taro.aotu.io/)

### 快速开始
* `npm install 或者cnpm i `         安装所有依赖包
* `npm run dev:swan`    启动本地HTTP服务 开启本地百度小程序
* `npm run dev:weapp`   启动本地HTTP服务 开启本地微信小程序

### 打包构建
* `npm run build:swan`  构建开发版本百度小程序
* `npm run build:weapp` 构建开发版本微信小程序

### 代码规范
### 目录
* config (环境配置)
* dist （打包输出文件）
* src
	* actions(redux-actions)
	* api （相关接口配置）
	  * api.js (axios api暴露)
	  * server.js (ajax封装)
	* assets （静态资源目录）  
	* components（react组件）
	* constants （常量配置）
	* pages
		* login (登录页面)
	* reducers （redux-reducers配置）
	* store (redux-store改造)
	* utils（公共的方法）
	  * base.js （本地与线上环境各种url切换）
	* app.js（小程序路由配置以及全局样式配置，不使用react-router进行路由管理）
	  
	  
	  
### 注意事项
* 注释 "redux-logger": "^3.0.6" 防止log堆积
* if (process.env.NODE_ENV === 'development') {
* middlewares.push(require('redux-logger').createLogger())
* }
* 新增immutable.js 处理react render问题
* 新增api文件夹 assets静态文件夹 components组件文件夹
* react的类型检查PropTypes自React v15.5起已弃用（taro用的是16.4.6版本的react），请使用prop-types
* defaultProps 用来确保 this.props.name 在父组件没有特别指定的情况下，有一个初始值。类型检查发生在  defaultProps 赋值之后，所以类型检查也会应用在 defaultProps 上面。
* npm install --save axios axios异步请求增加
* 开发环境增加cross-env 进行环境变量切换 
* package.json配置"scripts": {
* "build:weapp": "cross-env NODE_ENV=production taro build --type weapp"
* }
* 尽量使用无状态组件（受控组件-组件的状态不用自己维护 依靠外部传参 避开生命周期钩子函数处理）



















