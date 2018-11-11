<template lang="html">
    <div class="pointList">
        <div class="nav">
            <p :class="{'lighter': lighter == 'stop'}" @click="lighter='stop'">停留点</p>
            <p :class="{'lighter': lighter == 'line'}" @click="lighter='line'">轨迹点</p>
        </div>
        <div class="box">
            <div class="list-content" :class="[lighter == 'stop' ? 'left' : 'right']">
                <stop-point ref="stopList" :condition="condition" @getStopList="getStopList"></stop-point>
                <line-point ref="lineList" :condition="condition"></line-point>
            </div>
        </div>
    </div>
</template>

<script>
import stopPoint from './stopPoint';
import linePoint from './linePoint';

export default {
    components: {
        stopPoint,
        linePoint
    },
    data () {
        return {
            lighter: 'stop'
        }
    },
    methods: {
        search () {
            this.$refs.stopList.getStopList();
            this.$refs.lineList.getPointList();
        },
        getStopList (param) {
            this.$emit("getStopList", param);
        }
    },
    props: {
        condition: {
            type: Object
        }
    }
}
</script>

<style lang="less">
.pointList {
    margin-top: 34px;
    width: 100%;
    .nav {
        width: 100%;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            font-size: 14px;
            color: #333;
            cursor: pointer;
            margin: 0 40px;
            position: relative;
            transition: all 0.5s;
            &::after {
                content: "";
                display: none;
                width: 58px;
                height: 2px;
                background-color: #36ABE7;
                position: absolute;
                bottom: -8px;
                left: -8px;
            }
            &.lighter {
                color: #36ABE7;
                &::after {
                    display: inline-block;
                }
            }
        }
    }
    .box {
        overflow-x: hidden;
        margin-top: -1px;
        .list-content {
            width: 592px;
            min-height: 469px;
            display: flex;
            flex-wrap: nowrap;
            transition: all 0.3s;
            &.left {
                transform: translate(0);
            }
            &.right {
                transform: translateX(-294px);
            }
        }
    }
}
</style>
