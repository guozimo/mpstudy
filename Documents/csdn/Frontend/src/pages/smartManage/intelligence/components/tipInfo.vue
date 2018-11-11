<template>
    <div class="tip-info" v-show="visible">
        <div class="info-header">
            <slot name="header">
                <span v-if="title">{{title}}</span>
            </slot>
            <i class="close" @click="close"></i>
        </div>
        <div class="info-body">
            <slot name="body">
            </slot>
        </div>
        <div class="arrow"></div>
    </div>
</template>
<style lang="less" scoped>
.tip-info{
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
    position: relative;
    .info-header {
        font-family: PingFangSC-Semibold;
        position: relative;
        .close{
            position: absolute;
            right: 10px;
            top: 5px;
            background: url('../images/watch-sprite.png') no-repeat -104px -45px;
            width: 8px;
            height: 8px;
        }
    }
    .info-body{
        margin-top: 5px;
        .body-item-operation {
            height: 30px;
            display: flex;
            align-items: center;
            i {
                display: inline-block;
                width: 1px;
                height: 16px;
                background-color: #AEABAB;
                margin: 0 8px;
            }
            span {
                &::before {
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    width: 12px;
                    height: 14px;
                    margin-right: 8px;
                    background: url('../images/watch-sprite.png') no-repeat;
                }
                &.playback::before {
                    background: url('../images/watch-sprite.png') no-repeat -127px -43px;
                }
                &.follow::before {
                    background: url('../images/watch-sprite.png') no-repeat -148px -43px;
                }
                &:hover {
                    color: #36ABE7;
                    cursor: pointer;
                    &.playback::before {
                        background: url('../images/watch-sprite.png') no-repeat -127px -64px;
                    }
                    &.follow::before {
                        background: url('../images/watch-sprite.png') no-repeat -148px -64px;
                    }
                }
            }
        }
    }
    .arrow{
        border-top: 7px solid #fff;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        width: 0;
        font-size: 0;
        position: absolute;
        left: 50%;
        bottom: -7px;
        margin-left: -7px;
    }
}
</style>
<script>
    export default {
        props: {
            title: {
                type: String
            }
        },
        data () {
            return {
                visible: false
            };
        },
        methods: {
            show () {
                this.visible = true;
            },
            close () {
                this.visible = false;
                this.$emit('close');
            }
        }
    };
</script>
