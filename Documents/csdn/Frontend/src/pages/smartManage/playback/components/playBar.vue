<template lang="html">
    <div class="play-bar" onselectstart="return false">
        <div class="mile">
            {{curMile}}KM/{{mile}}KM
        </div>
        <div class="operation">
            <span class="back" @click="back"></span>
            <span class="go" :class="[playing ? 'playing':'']" @click="playBtnClick"></span>
            <span class="forward" @click="forward"></span>
        </div>
        <div class="time">
            <div class="speed">
                <span class="slower" :class="[curSpeed == 'slower'?'cur':'']" @click="setSpeed('slower', 1000)">慢速</span>
                <span class="normal" :class="[curSpeed == 'normal'?'cur':'']" @click="setSpeed('normal', 2000)">正常</span>
                <span class="faster" :class="[curSpeed == 'faster'?'cur':'']" @click="setSpeed('faster', 4000)">快速</span>
            </div>
            <div class="time-detail">
                <span class="cur-time">{{car["loc:collect_time"] || ""}}</span>
                <span v-if="endTime">/</span>
                <span class="end-time">{{endTime || ""}}</span>
            </div>
        </div>
        <div class="bar">
            <span class="blue-area" :style="'width:'+ realWidth + '%;'" @click="setPosition"></span>
            <span class="car" @mousedown="ondrag" @mouseup="getPositionByLocation"></span>
            <span class="grey-area" @click="setPosition"></span>
        </div>
        <div class="speed-line">
            <span class="icon" :class="[speedDown ? 'down' : 'up']"><i></i></span>
            <div class="speed-content">
                <p>
                    <span class="speed-message">速度曲线</span>
                    <span class="car-message" @click="windowShow = !windowShow">车辆信息</span>
                </p>
            </div>
            <div class="car-message-infowindow" v-if="windowShow">
                <div class="message-header">
                    <span>{{car["driver:driver_name"] || "暂无信息"}}（ID：{{car["driver:driver_id"] || "暂无"}}）</span>
                    <i class="close" @click="windowShow = false"></i>
                </div>
                <div class="message-body">
                    <div class="body-item">
                        <span>车型：</span>
                        <span>{{car["driver:car_type_name"] || "-"}}</span>
                    </div>
                    <div class="body-item">
                        <span>行驶位置：</span>
                        <span v-if="playing">{{car.location}}</span>
                        <span v-else>{{car.location_display || "-"}}</span>
                    </div>
                    <div class="body-item">
                        <span>时速：</span>
                        <span>{{car["extra:speed_avg"] || "0" | speed}}</span>
                    </div>
                    <div class="body-item">
                        <span>定位时间：</span>
                        <span>{{car["loc:collect_time_reveal"] || "-"}}</span>
                    </div>
                </div>
                <div class="arrow"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from "../js/api";

export default {
    data () {
        return {
            curSpeed: "normal",
            startPlay: false,
            playing: false,
            realWidth: 0,
            bar_percent: 0,
            offsetWidth: 0,
            all_mile: this.mile,
            timer: null,
            speedDown: true,
            windowShow: false,
            car: {
                ["driver:driver_name"]: "",
                ["driver:driver_id"]: "",
                ["loc:collect_time"]: "",
                ["loc:collect_time_reveal"]: "",
                ["location_display"]: "",
                ["extra:speed_avg"]: ""
            }
        }
    },
    props: {
        pathData: {
            type: Array
        },
        pathMessage: {
            type: Array
        },
        navg: {
            type: Object
        },
        mile: {
            type: Number
        }
    },
    methods: {
        ondrag (event) {
            if (this.navg) {
                this.stopMove();
                const LEFT = event.offsetX;
                document.onmousemove = (e) => {
                    let len = e.clientX - LEFT - 316;
                    if (len < 0) {
                        len = 0;
                    }
                    if (len >= this.offsetWidth - 18) {
                        len = this.offsetWidth - 18;
                    }
                    //设置汽车在地图上的位置
                    this.bar_percent = len/(this.offsetWidth - 18);
                    this.setCarInPath();
                    document.onmouseup = () => {
                        document.onmousemove = null;
                        this.getPositionByLocation();
                    }
                };
            }
        },
        playBtnClick () {
            if (this.navg) {
                this.playing = !this.playing;
                if (this.playing) {
                    this.startMove();
                } else {
                    this.stopMove();
                }
            }
        },
        stopMove () {
            this.playing = false;
            this.navg.pause();
            clearInterval(this.timer);
            this.timer = null;
            this.getPositionByLocation();
        },
        startMove () {
            this.playing = true;
            !this.startPlay == false ? this.navg.resume() : this.navg.start(), this.startPlay = true;
            //继续移动汽车进度条
            this.progressMove();
        },
        setPosition (event) {
            this.stopMove();
            this.bar_percent = (event.clientX - 316)/(this.offsetWidth);
            this.setCarInPath();
        },
        setCarInPath (INDEXARR = this.curIndex) {
            this.navg.moveToPoint(INDEXARR[0], INDEXARR[1]);
            this.navg.pause();
        },
        progressMove () {
            this.timer = setInterval(() => {
                let {idx, tail} = this.navg.getCursor();
                this.bar_percent = ((idx+tail)/this.length);
            }, 16);
        },
        setSpeed(type, speed) {
            if (this.navg) {
                this.curSpeed = type;
                this.navg.setSpeed(speed);
            }
        },
        back () {
            this.stopMove();
            let {idx, tail} = this.navg.getCursor();
            if (--idx < this.navg.getPathStartIdx()) {
                this.$message.warning("已经是第一个轨迹点！");
                return;
            }
            this.bar_percent = ((idx + tail)/this.length);
            this.setCarInPath([idx, tail]);
            this.playing = false;
        },
        forward () {
            this.stopMove();
            let {idx, tail} = this.navg.getCursor();
            if (++idx > this.navg.getPathEndIdx()) {
                this.$message.warning("已经是最后一个轨迹点！");
                return;
            }
            this.bar_percent = ((idx + tail)/this.length);
            this.setCarInPath([idx, tail]);
        },
        initProgress () {
            this.bar_percent = 0;
            this.curSpeed = "normal";
            this.playing = false;
            this.startPlay = false;
            if (this.pathMessage && this.pathMessage.length) {
                this.car["driver:driver_name"] = this.pathMessage[0]["driver:driver_name"];
                this.car["driver:driver_id"] = this.pathMessage[0]["driver:driver_id"];
                this.car["driver:car_type_name"] = this.pathMessage[0]["driver:car_type_name"],
                this.car["loc:collect_time"] = this.pathMessage[0]["loc:collect_time"];
                this.car["loc:collect_time_reveal"] = this.pathMessage[0]["loc:collect_time_reveal"];
                this.car["location_display"] = this.pathMessage[0]["location_display"];
                this.car["extra:speed_avg"] = this.pathMessage[0]["extra:speed_avg"];
            }
            clearInterval(this.timer);
        },
        async getPositionByLocation () {
            //根据当然车辆的location来确定具体的位置
            let position = this.car.location;
            let { info } = await Api.getPositionByLocation({position});
            this.car.location_display = info.location;
        }
    },
    mounted () {
        // 鼠标弹起时去掉mousemove事件
        document.onmouseup = () => {
            document.onmousemove = null;
        };
        //设置进度条的宽度，来保证进度条是按100%长度，而不是按照px长度
        this.offsetWidth = document.getElementsByClassName('bar')[0].offsetWidth;
        window.onresize = () => {
            this.offsetWidth = document.getElementsByClassName('bar')[0].offsetWidth;
        }
    },
    computed: {
        curMile () {
            let num = (this.mile * this.bar_percent).toFixed(2)
            return num > this.mile ? this.mile : num;
        },
        curIndex () {
            let numArr = ((this.bar_percent * this.length) + "").split(".");
            let index = +numArr[0] || 0;
            let tail = +("0." + numArr[1]) || 0;
            let arr = [index, tail];
            return arr;
        },
        curPoint () {
            let index = ((this.bar_percent * this.pathMessage.length) + "").split(".")[0];
            return this.pathMessage[index];
        },
        endTime () {
            if (this.pathMessage && this.pathMessage.length) {
                let len = this.pathMessage.length - 1;
                return this.pathMessage[len]["loc:collect_time"];
            }
        },
        length () {
            return this.navg.getPathEndIdx() - this.navg.getPathStartIdx();
        }
    },
    filters: {
        speed (val) {
            return val + "km/h";
        }
    },
    beforeDestroy () {
        window.onresize = null;
        document.onmouseup = null;
        clearInterval(this.timer);
        this.timer = null;
    },
    watch: {
        bar_percent (val) {
            let avrg = this.offsetWidth - 18;
            this.realWidth = (val * avrg * 100)/this.offsetWidth;
        },
        curPoint (val) {
            this.car = val;
        }
    }
}
</script>

<style lang="less" scoped>
    .play-bar {
        width: 100%;
        height: 46px;
        background: #001A2D;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 12px;
        position: relative;
        .mile {
            position: absolute;
            left: 10px;
        }
        .operation {
            display: flex;
            align-items: center;
            span {
                display: inline-block;
                background: url("../images/playback.png") no-repeat;
                cursor: pointer;
                &.back {
                    width: 15px;
                    height: 10px;
                    background-position: -178px -42px;
                }
                &.go {
                    width: 14px;
                    height: 16px;
                    background-position: -216px -39px;
                    margin: 0 23px;
                    &.playing {
                        background-position: -175px -77px;
                    }
                }
                &.forward {
                    width: 15px;
                    height: 10px;
                    background-position: -253px -42px;
                }
            }
        }
        .time {
            display: flex;
            align-items: center;
            position: absolute;
            right: 10px;
            .speed {
                height: 28px;
                background: #02253E;
                border-radius: 2px;
                margin-right: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 10px;
                text-align: right;
                span {
                    display: inline-block;
                    height: 22px;
                    line-height: 22px;
                    text-align: center;
                    margin: 0 8px;
                    padding: 0 4px;
                    border: 1px solid #02253E;
                    cursor: pointer;
                    &.cur {
                        color: #36ABE7;
                        border: 1px solid #36ABE7;
                        border-radius: 2.3px;
                    }
                }
            }
            .time-detail {
                width: 265px;
                display: flex;
                justify-content: center;
                .cur-time, .end-time {
                    width: 125px;
                }
            }
        }
        .bar {
            width: 100%;
            height: 6px;
            position: absolute;
            top: -6px;
            left: 0;
            cursor: pointer;
            z-index: 1;
            display: flex;
            align-items: center;
            .blue-area {
                height: 6px;
                background-color: #4B73FA;
            }
            .car {
                display: inline-block;
                width: 18px;
                height: 14px;
                background: url("../images/playback.png") -148px -45px no-repeat;
                transform: scale(1.2);
            }
            .grey-area {
                flex-grow: 1;
                background-color: #96A1A8;
                height: 6px;
            }
        }
        .speed-line {
            position: absolute;
            width: 100%;
            height: 24px;
            background-color: #fff;
            top: -30px;
            .icon {
                display: inline-block;
                width: 24px;
                height: 13px;
                position: absolute;
                background-color: #fff;
                border-radius: 2px 2px 0 0;
                top: -13px;
                left: calc(~"50% - 12px");
                text-align: center;
                cursor: pointer;
                i {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background: url("../images/playback.png");
                }
                &.down {
                    i {
                        background-position: -216px -63px;
                    }
                    &:hover i {
                        background-position: -232px -63px;
                    }
                }
                &.up {
                    i {
                        background-position: -248px -63px;
                    }
                    &:hover i {
                        background-position: -264px -63px;
                    }
                }
            }
            .speed-content {
                p {
                    height: 24px;
                    display: flex;
                    color: #333;
                    align-items: center;
                    justify-content: space-between;
                    span {
                        margin: 0 10px;
                        &.car-message {
                            display: inline-block;
                            width: 60px;
                            height: 18px;
                            line-height: 18px;
                            color: #fff;
                            background-color: #36ABFF;
                            border-radius: 3px;
                            text-align: center;
                            cursor: pointer;
                        }
                    }
                }
            }
            .car-message-infowindow {
                font-size: 12px;
                width: 230px;
                min-height: 139px;
                line-height: 1.4;
                color: #333333;
                padding: 6px 5px 5px 10px;
                opacity: 0.8;
                background: #FFFFFF;
                box-shadow: 0 0 5px 2px rgba(0,0,0,0.09);
                border-radius: 4px;
                position: absolute;
                right: 15px;
                top: -150px;
                .message-header {
                    font-family: PingFangSC-Semibold;
                    position: relative;
                    height: 14px;
                    line-height: 14px;
                    .close{
                        position: absolute;
                        right: 10px;
                        top: 4px;
                        background: url('../../../../common/images/watch-sprite.png') no-repeat -104px -45px;
                        width: 8px;
                        height: 8px;
                        vertical-align: top;
                        cursor: pointer;
                    }
                }
                .message-body{
                    margin-top: 5px;
                    .body-item {
                        margin: 5px 0;
                    }
                }
                .arrow{
                    border-top: 7px solid #fff;
                    border-left: 7px solid transparent;
                    border-right: 7px solid transparent;
                    width: 0;
                    font-size: 0;
                    position: absolute;
                    right: 15px;
                    bottom: -7px;
                    margin-left: -7px;
                }
            }
        }
    }
</style>
