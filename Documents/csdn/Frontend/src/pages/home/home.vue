<template>
    <div class="home-page">
        <div class="banner"></div>
        <div class="dataWarehouse">
            <p class="tip">数据仓库</p>
            <div class="content">
                <div class="box">
                    <p class="tunnel"><span></span></p>
                    <div>
                        <p class="ptitle">数据Tunnel</p>
                        <p class="ptext">为各种来源的实时和离线业务数据提供进出数据仓库的全套解决方案。同时提供丰富多样的数据ETL算子,为后续数据的融合、计算、分发、查询、挖掘提供数据基础。</p>
                    </div>
                </div>
                <div class="no-margin box">
                    <p class="computed"><span></span></p>
                    <div>
                        <p class="ptitle">数据存储和计算</p>
                        <p class="ptext">支持HDFS、 Hbase、Kudu、 Kafka等数据存储方案。支持 Mapreduce和Hive等批处理计算、 Spark内存计算、Kylin多维分析、 Presto和Impala MPP分析以及Sparkstreaming&stom&Fink等实时计算框架。</p>
                    </div>
                </div>
                <div class="box">
                    <p class="dispatch"><span></span></p>
                    <div>
                        <p class="ptitle">数据调度</p>
                        <p class="ptext">稳定、高效、智能的调度系统,支持小时、天、周、月等多种调度周期,同时支持灵活的依赖调度,为数据的加工和流转提供基础解决方案。智能调度可自动的发现任务之间的血缘关系,及时的规避因为前期数据的丢失而导致的数据异常。</p>
                    </div>
                </div>
                <div class="no-margin box">
                    <p class="develop"><span></span></p>
                    <div>
                        <p class="ptitle">数据应用开发</p>
                        <p class="ptext">提供统一的数据访问门面,为业务和运营访问数据仓库和数据集市中的数据提供全面的工具支持。方便业务进行数据的查询、建模、开发等工作。</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="dataTool">
            <p class="tip">数据工具</p>
            <div class="content">
                <dl>
                    <dt><span class="datamanage"></span></dt>
                    <dd>数据资产管理</dd>
                    <dd>以资产管理的模式来对数据进行统管理,包括数据的投入产出比、数据的核算、数据的应用价值分析等。提供详细清晰的元数据信息,方便用户和管理人员来了解数据的来龙去脉,保证数据口径的一致性。</dd>
                </dl>
                <dl class="middleDl">
                    <dt><span class="datasafe"></span></dt>
                    <dd>数据安全</dd>
                    <dd>对数据仓库中的数据提供了统一的细粒度的数据权限控制,保证了数据访问的安全性。平台本身采用Kerberos来进行机器和用户的认证机制。审计日志可以实时的监测敏感信息的访问和操作行为,保证数据访问的可追踪性。</dd>
                </dl>
                <dl>
                    <dt><span class="datawarning"></span></dt>
                    <dd>监控报警平台</dd>
                    <dd>实时、准确、全方位的监控体系,保证了整个大数据处理闭环的稳定性。同时支持灵活的、个性化的报警策略的配置,从而满足丰富的业务预警的需求。</dd>
                </dl>
            </div>
        </div>
        <div class="dataIntelligent">
            <p class="tip">数据智能</p>
            <div class="content">
                <div class="block">
                    <div class="top">
                        <p><span class="self"></span></p>
                        <p>自助分析平台</p>
                    </div>
                    <div class="bottom">
                        自助分析平台支持业务人员、运营人员、产品经理等各种角色无需编写任何的代码,只需要通过简单的拖拽就能轻松的访问数据仓库中的数据来制作出丰富的可视化报表,同时支持灵活的数据分析,快速的发现数据中的规律,做出更加敏捷的业务决策。
                    </div>
                </div>
                <div class="block">
                    <div class="top">
                        <p><span class="draw"></span></p>
                        <p>画像分析平台</p>
                    </div>
                    <div class="bottom">
                        通过整理丰富的标签列表,将各个存储资源中的数据整合起来,然后在标签模型的基础之上构建交互式的针对大数据画像类的分析应用。帮助业务人员自由灵活的分析用户对象的各种属性与行为之间的关联性，从而实现针对特定用户的精准运营。
                    </div>
                </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>


export default {
    name: 'HomePage'
}
</script>

<style scoped lang="less">
    .home-page {
        flex: 1;
        overflow: auto;
        .banner {
            width: 100%;
            height: 676px;
            background: url("./images/banner.png");
            background-size: 100% 100%;
        }
        .tip {
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 36px;
            color: #333;
            margin: 40px 0;
            text-align: center;
        }
        .dataWarehouse {
            width: 100%;
            height: 714px;
            .content {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                paping: 40px 90px 16px 90px;
                .box {
                    width: 553px;
                    margin-right: 50px;
                    margin-bottom: 50px;
                    padding-right: 15px;
                    display: flex;
                    &.no-margin {
                        margin-right: 0;
                    }
                    >p {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-shrink: 0;
                        width: 272px;
                        height: 234px;
                        margin-right: 20px;
                        span {
                            display: inline-block;
                            width: 100px;
                            height: 100px;
                        }
                        &.tunnel {
                            background: #ECB8B8;
                            span {
                                height: 112px;
                                background: url("./images/home.png") -37px -106px;
                            }
                        }
                        &.computed {
                            background: #C1D0EF;
                            span {
                                height: 110px;
                                background: url("./images/home.png") -37px -261px;
                            }
                        }
                        &.dispatch {
                            background: #B4F1E9;
                            span {
                                background: url("./images/home.png") -37px -416px;
                            }
                        }
                        &.develop {
                            background: #ACDFF1;
                            span {
                                background: url("./images/home.png") -37px -562px;
                            }
                        }
                    }
                    >div {
                        .ptitle {
                            font-size: 28px;
                            color: #333;
                            margin: 16px 0 10px 0;
                        }
                        .ptext {
                            font-size: 16px;
                            color: #333;
                            line-height: 24px;
                        }
                    }
                    &:hover {
                        box-shadow: 0 0 5px 2px rgba(0,0,0,0.07);
                    }
                }
            }
        }
        .dataTool {
            height: 566px;
            background: url("./images/tool2.png");
            background-size: 100%;
            padding-top: 0.1px;
            .tip {
                margin-top: 24px;
                color: #fff;
            }
            .content {
                display: flex;
                justify-content: center;
                align-items: center;
                dl {
                    width: 234px;
                    height: 412px;
                    border: 1px solid #FFF;
                    box-shadow: 0 0 5px 2px rgba(0,0,0,0.07);
                    transition: all .3s;
                    &:hover {
                        border: 1px solid #30A8E6;
                        transform: scale(1.05, 1.05);
                    }
                    &.middleDl {
                        margin: 0 75px;
                    }
                    dt {
                        height: 148px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span {
                            display: inline-block;
                            width: 80px;
                            height: 80px;
                            &.datamanage {
                                background: url("./images/home.png") -37px -709px;
                            }
                            &.datasafe {
                                background: url("./images/home.png") -37px -835px;
                            }
                            &.datawarning {
                                background: url("./images/home.png") -37px -961px;
                            }
                        }
                    }
                    dd {
                        width: 100%;
                        color: #fff;
                        &:first-of-type {
                            font-size: 28px;
                            text-align: center;
                            margin-top: 10px;
                        }
                        &:nth-of-type(2) {
                            padding: 10px;
                            font-size: 16px;
                            line-height: 24px;
                            font-weight: 300;
                        }
                    }
                }
            }
        }
        .dataIntelligent {
            padding-top: 0.1px;
            height: 805px;
            background: #E0E9F1;
            .content {
                display: flex;
                justify-content: center;
                .block {
                    box-shadow: 0 0 5px 2px rgba(0,0,0,0.15);
                    width: 446px;
                    height: 567px;
                    transition: transform .5s;
                    .top {
                        height: 286px;
                        background: #F0F4F8;
                        p {
                            width: 100%;
                            &:first-of-type {
                                height: 236px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                span {
                                    display: inline-block;
                                    width: 100px;
                                    height: 93px;
                                    &.self {
                                        background: url("./images/home.png") -183px -1087px;
                                    }
                                    &.draw {
                                        background: url("./images/home.png") -37px -1226px;
                                    }
                                }
                            }
                            &:nth-of-type(2) {
                                font-size: 28px;
                                color: #333;
                                text-align: center;
                            }
                        }

                    }
                    .bottom {
                        padding: 20px 25px 0 25px;
                        height: 281px;
                        font-size: 16px;
                        color: #333;
                        line-height: 30px;
                        background-color: #fff;
                    }
                    &:hover {
                        transform: scale(1.05,1.05);
                        border: 1px solid #30A8E6;
                        z-index: 1;
                        .top {
                            background: #30A8E6;
                            p {
                                &:first-of-type {
                                    span {
                                        &.self {
                                            background: url("./images/home.png") -37px -1087px;
                                        }
                                        &.draw {
                                            background: url("./images/home.png") -183px -1226px;
                                        }
                                    }
                                }
                                &:nth-of-type(2) {
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }
        }
        .footer {
            height: 62px;
            background: #001A2D;
        }
    }
</style>
