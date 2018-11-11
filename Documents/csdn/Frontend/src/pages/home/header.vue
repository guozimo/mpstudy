<template lang="html">
    <div class="header">
        <div class="content">
            <p class="logo">
                <span></span>
                <b>云鸟大数据平台</b>
            </p>
            <div class="nav" :class="[login ? 'wid-80' : 'wid-50']">
                <div v-if="login == true" class="login-nav">
                    <ul>
                        <li><router-link to="/metadata">MetaData</router-link></a></li>

                        <li>
                            <el-dropdown  trigger="click">
                                <a class="el-dropdown-link" href="javascript:;">
                                  智能运力管理
                                </a>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><router-link to="/intelligence/bigscreen">实时轨迹大屏</router-link></el-dropdown-item>
                                    <el-dropdown-item divided><router-link to="/intelligence/watch">车辆监控分析</router-link></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                    <!-- <li><a href="javascript:;">Query Builder</a></li> -->

                    <!-- <li><a href="javascript:;">Scheduler</a></li>
                    <li><a href="javascript:;">DashBoard</a></li>
                    <li><a href="javascript:;">Data Browser</a></li> -->
                    <ul>
                        <li class="li-logout"><span class="logout" @click="logoutVisable = true"></span></li>
                        <li class="li-icon"><span class="user-icon"></span></li>
                    </ul>
                </div>
                <ul v-else class="logout-nav">
                    <li><a href="javascript:;">首页</a></li>
                    <li><a href="javascript:;">产品</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;" @click="loginVisable = true">登录</a></li>
                </ul>
            </div>
        </div>

        <el-dialog :visible.sync="loginVisable" width="570px" :before-close="close">
            <p class="login-logo">
                <span></span>
            </p>
            <div class="login-content">
                <div class="item">
					<span class="user"></span>
					<input type="text" name="username" placeholder="请输入用户名" v-model="form.username"/>
				</div>

				<div class="item">
					<span class="pass"></span>
					<input type="password" name="userpassword" placeholder="请输入密码" v-model="form.password"/>
				</div>

				<div :class="[ispass ? 'hidden' : 'show', 'error']">
					<span class="err-icon"></span>
					<span>用户名或密码错误，请重新输入</span>
				</div>

				<div class="item submit">
					<a href="javascript:void(0);" @click="submit">登&nbsp;录</a>
				</div>
            </div>
        </el-dialog>

        <el-dialog title="提醒" :visible.sync="logoutVisable" width="570px" class="logout">
            <p>确定要退出登录吗？</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="logoutVisable = false">取 消</el-button>
                <el-button type="primary" @click="dologout">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>



<script>
import Api from "./js/api";
import { Message } from "element-ui";

export default {
    data () {
        return {
            loginVisable: false,
            logoutVisable: false,
            login: false,
            ispass: true,
            form: {
                username: "",
                password: ""
            }
        }
    },
    mounted () {
        //如果userid存在，则说明用户是登录状态
        if (localStorage.getItem("user_id")) {
            this.login = true;
        }
    },
    methods: {
        submit () {
            let params = this.form;
            //本例可以有两种写法  1 promise写法  2 try catch + await写法
            Api.login(params).then(res => {
                this.loginVisable = false;
                this.login = true;
                this.ispass = true;
                //将登录者的信息储存到local中
                localStorage.setItem("user_id", res.info.user_id);
                localStorage.setItem("user_name", res.info.user_name);
                localStorage.setItem("user_nick", res.info.user_nick);
                localStorage.setItem("token", res.info.token);
                //弹窗提醒
                Message({
                    type: 'success',
                    message: "您已成功登陆!",
                    showClose: true
                });
            }).catch(res => {
                this.ispass = false;
            });
        },
        close () {
            this.form.username = "";
            this.form.password = "";
            this.loginVisable = false;
            this.ispass = true;
        },
        dologout () {
            Api.logout().then(res => {
                this.logoutVisable = false;
                this.login = false;
                //清楚local中的信息
                localStorage.clear();
                //弹窗提醒退出成功
                Message({
                    type: 'success',
                    message: "您已成功退出登陆!",
                    showClose: true
                });
                //返回到首页
                this.$router.push({path:'/'});
            }).catch(res => {

            });
        }
    }
}
</script>
<!-- 修改elementui组件css的样式单独写出来，不加scoped -->
<style lang="less">
    .el-dialog {
        .el-dialog__body {
            padding: 10px 60px 50px;
        }
    }
    .el-dialog__wrapper.logout {
        .el-dialog__header {
            background-color: #f0f0f0;
        }
        .el-dialog__body {
            p {
                display: flex;
                justify-content: center;
                margin-top: 56px;
            }
        }
    }
</style>
<style lang="less" scoped>
    .wid-50 {
        width: 50%;
    }
    .wid-80 {
        width: 80%;
    }
    .header {
        .el-dialog {
            .el-dialog__body {
                .login-logo {
                    span {
                        display: inline-block;
                        width: 310px;
                        height: 45px;
                        background: url("./images/home.png") -30px -1372px;
                    }
                }
                .login-content {
                    .item {
                        background: #FFF;
                        border: 1px solid #DDD;
                        border-radius: 3px;
                        display: flex;
                        align-items: center;
                        width: 450px;
                        height: 50px;
                        margin-top: 24px;
                        span {
                            display: inline-block;
                            width: 24px;
                            height: 24px;
                            margin-left: 24px;
                            flex-shrink: 0;
                            &.user {
                                background: url("./images/home.png") -392px -1383px;
                            }
                            &.pass {
                                background: url("./images/home.png") -461.4px -1386px;
                            }
                        }
                        input {
        					display: block;
        					margin-left: 20px;
        					height: 48px;
        					width: 100%;
        					border: none;
        					font-size: 16px;
        				}
                        &.submit {
                            margin-top: 10px;
                            a{
                                display: block;
            					height: 50px;
            					line-height: 50px;
            					width: 100%;
            					border-radius: 3px;
                                background: #30A8E6;
                                color: #fff;
            					text-align: center;
            					font-size: 20px;
            					&:hover {
            						background-color: #2998E6;
            					}
                            }
                        }
                    }
                    .error {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        color: #F95F45;
                        margin-top: 10px;
                        .err-icon {
                            display: inline-block;
                            width: 18px;
                            height: 18px;
                            background: url("./images/home.png") -527px -1389px;
                            margin-right: 19px;
                        }
                        &.hidden {
                            opacity: 0;
                        }
                        &.show {
                            opacity: 1;
                        }
                    }
                }
            }
        }
        .content{
            height: 80px;
            background-color: rgba(0,26,45,0.62);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .logo {
                flex-shrink: 0;
                display: flex;
                align-items: center;
                margin-left: 76px;
                span {
                    display: inline-block;
                    width: 84px;
                    height: 40px;
                    background: url("./images/home.png") -32px -21px no-repeat;
                }
                b {
                    color: #fff;
                    font-size: 20px;
                    font-weight: normal;
                    margin-left: 20px;
                }
            }
            .nav {
                ul{
                    display: flex;
                    align-items: center;
                    &:first-of-type {
                        width: 100%;
                    }
                    li {
                        text-align: left;
                        padding-left: 20px;
                        padding-right: 20px;
                        a{
                            font-size: 20px;
                            color: #FFF;
                        }
                        span {
                            display: inline-block;
                            width: 22px;
                            height: 26px;
                            &.user-icon {
                                background: url("./images/home.png") -704px -1383px no-repeat;
                            }
                            &.logout {
                                background: url("./images/home.png") -803px -1381px no-repeat;
                            }
                        }
                        .el-dropdown{
                          .el-dropdown-link{
                            color: #fff;
                            width: auto;
                            font-size: 20px;
                          }
                          &:hover {
                            a {
                              color: #30A8E6;
                            }
                          }
                        }
                        &:hover {
                            cursor: pointer;
                            a {
                                color: #30A8E6;
                            }
                            span {
                                &.user-icon {
                                    background: url("./images/home.png") -643px -1383px no-repeat;
                                }
                                &.logout {
                                    background: url("./images/home.png") -765px -1381px no-repeat;
                                }
                            }
                        }

                    }
                    .li-logout,
                    .li-icon{
                      width: auto;
                      flex: none;
                    }
                }
                .login-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .logout-nav {
                    justify-content: space-around;
                }
            }
        }
    }
    .el-dropdown-menu{
        padding: 0;
        width: 202px;
        .el-dropdown-menu__item{
            line-height: 48px;
            text-align: center;
            font-size: 18px;
            color: #333333;
            a{
                color: #333333;
            }
            &:hover{
                a{
                    color: #30A8E6;
                    background: none;
                }
            }
        }
        &:hover{
            li{
                background: none;
            }
        }
    }
</style>
