<template lang="html">
    <div class="bigscreen">
        <div id="map">

        </div>
        <div class="top">
            <p class="time">{{time.year}}年{{time.month}}月{{time.day}}日   {{time.hour}}:{{time.minutes}}:{{time.seconds}}</p>
            <div class="rotate-icon">
                <span class="bottom-icon"></span>
                <span class="top-icon"></span>
            </div>
        </div>
        <div class="bottom">
            <ul>
                <li>
                    <p>总车辆</p>
                    <span>{{all.driver_total}}</span>
                </li>
                <li>
                    <p>行驶</p>
                    <span>{{all.driver_driving_cnt}}</span>
                </li>
                <li>
                    <p>静止</p>
                    <span>{{all.driver_stay_cnt}}</span>
                </li>
                <li>
                    <p>离线</p>
                    <span>{{all.driver_offline_cnt}}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <p>出车-车辆</p>
                    <span>{{all.event_driver_total}}</span>
                </li>
                <li>
                    <p>出车-行驶</p>
                    <span>{{all.event_driver_driving_cnt}}</span>
                </li>
                <li>
                    <p>出车-静止</p>
                    <span>{{all.event_driver_stay_cnt}}</span>
                </li>
                <li>
                    <p>出车-离线</p>
                    <span>{{all.event_driver_offline_cnt}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import echarts from "echarts";
import Api from "./js/api";
import 'echarts/map/js/china';

//将echarts根对象提取出来，因为该对象较大，避免vue给该对象添加过多方法
let mapChart = {};
//但页面应用，因为定时器没有用变量接收，跳转页面时定时器不会自动消失
//所以用变量接收一下，销毁之前清除定时器
let interval_timer;
let setTimeout_timer;
// let rotateSymbol_timer;
//将echarts的固定对象抽离出来，只控制相应的data数据，防止反复生命变量
let echart_option = {
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip : {},
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            zoom: 1.2,
            itemStyle: {
                normal: {
                    areaColor: '#000',
                    borderColor: '#213a9d',
                    shadowColor: '#2B355F',
                    shadowBlur: 10,
                    shadowOffsetX: 2,
                    shadowOffsetY: 3
                },
                emphasis: {
                    areaColor: '#141B30'
                }
            }
        },
        series: [{
            name: "弱",
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 2,
            large: true,
            itemStyle: {
                normal: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(37, 140, 249, 0.8)',
                    color: '#1FABD9'
                },
                emphasis: {
                    show: false
                }
            },
            tooltip: {
                formatter: '{a}'
            }
        }, {
            name: "中",
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 2,
            large: true,
            itemStyle: {
                normal: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(14, 241, 242, 0.8)',
                    color: '#D8D52E'
                },
                emphasis: {
                    show: false
                }
            },
            tooltip: {
                formatter: '{a}'
            }
        }, {
            name: "强",
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 2,
            large: true,
            itemStyle: {
                normal: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(255, 255, 255, 0.8)',
                    color: '#F87011'
                },
                emphasis: {
                    show: false
                }
            },
            tooltip: {
                formatter: '{a}'
            }
        },{
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: "image:///static/img/adc.png",
            symbolSize: 22,
            // symbolRotate: 0,
            itemStyle: {
                normal: {
                    color: 'red'
                }
            },
            tooltip : {
                formatter: function(params) {
                    return `<div>
                                <p style="margin: 5px">${params.name}</p>
                                <ul>
                                    <li style="margin: 5px"><span style="display:inline-block;width:80px;margin-right:25px;">总车辆：${params.data.driver_total}</span><span style="margin-right:5px;">出车-车辆：${params.data.event_driver_total}</span></li>
                                    <li style="margin: 5px"><span style="display:inline-block;width:80px;margin-right:25px;">行驶：${params.data.driver_driving_cnt}</span style="margin-right:5px;"><span>出车-行驶：${params.data.event_driver_driving_cnt}</span></li>
                                    <li style="margin: 5px"><span style="display:inline-block;width:80px;margin-right:25px;">静止：${params.data.driver_stay_cnt}</span><span style="margin-right:5px;">出车-静止：${params.data.event_driver_stay_cnt}</span></li>
                                    <li style="margin: 5px"><span style="display:inline-block;width:80px;margin-right:25px;">离线：${params.data.driver_offline_cnt}</span><span style="margin-right:5px;">出车-离线：${params.data.event_driver_offline_cnt}</span></li>
                                </ul>
                            </div>`
                },
                backgroundColor: "rgba(20,28,74,0.8)",
                textStyle: {
                    color: "#fff",
                    height: 75,
                    fontSize: 8,
                    fontWeight: "lighter"
                }
            }
        }]
    };
export default {
    data () {
        return {
            time: {
                year: 0,
                month: 0,
                day: 0,
                hour: 0,
                minutes: 0,
                seconds: 0
            },
            all: {},
            adc: {}
        }
    },
    methods: {
        getCurTime () {
            let time = new Date();
            this.time.year = time.getFullYear();
            this.time.month = (time.getMonth() + 1 + "").length == 1 ? "0"+ (time.getMonth() + 1):time.getMonth() + 1;
            this.time.day = (time.getDate() + "").length == 1 ? "0" + time.getDate(): time.getDate();
            this.time.hour = (time.getHours() + "").length == 1 ? "0" + time.getHours(): time.getHours();
            this.time.minutes = (time.getMinutes() + "").length == 1 ? "0" + time.getMinutes(): time.getMinutes();
            this.time.seconds = (time.getSeconds() + "").length == 1 ? "0" + time.getSeconds(): time.getSeconds();
            // 递归实现时间的不断变化
            setTimeout_timer = setTimeout(() => {
                this.getCurTime();
            }, 1000);
        },
        getposition (res) {
            Api.getdata().then(res => {
                // 使用刚指定的配置项和数据显示图表。
                echart_option.series[0].data = res.info[5];
                echart_option.series[1].data = res.info[2];
                echart_option.series[2].data = res.info[0];
                mapChart.setOption(echart_option);
            });
        },
        getmessage () {
            Api.getmessage().then(res => {
                this.all = res.info.all;
                this.adc = res.info.adc;
                echart_option.series[3].data = this.positions;
                mapChart.setOption(echart_option);
            })
        }
        // rotateSymbol () {
        //     rotateSymbol_timer = setInterval(() => {
        //         echart_option.series[3].symbolRotate -= 10;
        //         if (echart_option.series[3].symbolRotate == -360) {
        //             echart_option.series[3].symbolRotate = 0;
        //         }
        //         console.log(echart_option.series[3].symbolRotate);
        //         mapChart.setOption(echart_option);
        //     }, 300)
        // }
    },
    computed: {
        positions () {
            let arr = [];
            for (let j in this.adc) {
                let  obj = {};
                if (this.adc[j].adc_name && this.adc[j].longitude_bd && this.adc[j].latitude_bd) {
                    obj = this.adc[j];
                    obj.isadc = true;
                    obj.name = this.adc[j].adc_name;
                    obj.value = [];
                    obj.value.push(this.adc[j].longitude_bd, this.adc[j].latitude_bd);
                    arr.push(obj);
                }
            }
            return arr;
        }
    },
    mounted () {
        //展示时间
        this.getCurTime();
        //展示地图
        mapChart = echarts.init(document.getElementById('map'));
        //开始旋转图标
        // this.rotateSymbol();
        this.getposition();
        this.getmessage();
        //每过10秒进行一次数据查询
        interval_timer = setInterval(() => {
            this.getmessage();
        }, 10000);
        //点击管理区图标的时候跳转页面
        mapChart.on("click", (e) => {
            if (e.data.adc_id) {
                this.$router.push({
                    path: '/intelligence/watch',
                    query:{
                        adc_name: e.data.adc_name,
                        adc_id: e.data.adc_id
                    }
                })
            }
        })
    },
    //清除定时器，否则进入下一个页面仍然会继续发请求
    beforeDestroy () {
        clearInterval(interval_timer);
        clearTimeout(setTimeout_timer);
    }
}
</script>

<style lang="less">
@keyframes rotate {
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
.bigscreen {
    width: 100%;
    height: calc(~"100% - 80px");
    background: url("./images/bg1.png") no-repeat;
    background-size: cover;
    position: relative;
    #map {
        width: 100%;
        height: 100%;
    }
    .top {
        width: 100%;
        padding: 20px 0 0 27px;
        position: absolute;
        top: 0;
        font-size: 18px;
        color: #7A90DA;
        .rotate-icon {
            position: absolute;
            width: 76px;
            height: 76px;
            right: 30px;
            top: 20px;
            span {
                display: inline-block;
                width: 76px;
                height: 76px;
                position: absolute;
                left: 0;
                top: 0;
                &.bottom-icon {
                    background: url("./images/bigscreen-icon.png") -41px -14px;
                }
                &.top-icon {
                    background: url("./images/bigscreen-icon.png") -136px -14px;
                    opacity: 0.6;
                    animation: rotate 3s infinite linear;
                }
            }
        }
    }
    .bottom {
        width: 100%;
        height: 65px;
        position: absolute;
        bottom: 25px;
        display: flex;
        justify-content: space-between;
        ul {
            display: flex;
            padding: 0 28px;
            li{
                width: 90px;
                font-size: 18px;
                margin-right: 50px;
                &:last-of-type {
                    margin-right: 0;
                }
                p {
                    color: #7A90DA;
                    margin-bottom: 12px;
                }
                span {
                    font-family: "monaco";
                    font-size: 24px;
                    color: #fff;
                }
            }
        }
    }
}
</style>
