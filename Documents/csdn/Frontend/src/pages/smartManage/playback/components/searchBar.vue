<template lang="html">
    <div class="searchBar">
        <div class="search-item">
            <suggest
                type="select"
                :showClose="false"
                v-model="condition.searchType"
                :styles="{width:'96px',fontSize:'12px',boxShadow:'none',border:'1px solid #ccc'}"
                :options="[{text:'司机ID',value:1},{text:'出车ID',value:2}]">
            </suggest>
            <suggest
                v-if="condition.searchType == 1"
                ref="driver"
                v-model="condition.driver_id"
                @remoteRequest="getDriver"
                type="suggest"
                :options="driverList"
                :styles="{width:'200px',boxShadow:'none',border:'1px solid #ccc',borderLeft:'none'}"
                placeholder="请输入姓名/ID">
            </suggest>
            <suggest
                v-else
                ref="eventId"
                v-model="condition.trans_event_id"
                type="search"
                placeholder="请输入出车ID"
                :styles="{width:'200px',boxShadow:'none',border:'1px solid #ccc',borderLeft:'none'}">
            </suggest>
        </div>
        <div class="search-item search-data">
            <div class="block">
                <span>开始时间：</span>
                <el-date-picker
                    width="142px"
                    v-model="condition.start_time"
                    type="datetime"
                    size="mini"
                    id="start_time"
                    placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div class="block">
                <span>结束时间：</span>
                <el-date-picker
                    width="142px"
                    v-model="condition.end_time"
                    type="datetime"
                    size="mini"
                    id="end_time"
                    placeholder="选择日期时间"
                    align="right">
                </el-date-picker>
            </div>
        </div>
        <p class="search-item search-mail">
            里程数: {{map_result.total_mile}}公里
        </p>
        <p class="search-item search-op">
            <span>{{map_result.duration}}</span>
            <el-button type="primary" size="mini" @click="searchList">查询</el-button>
        </p>
        <p class="line"></p>
        <poinit-list ref="pointList" :list="list_result" :condition="list_search_condition" @getStopList="getStopList"></poinit-list>
    </div>
</template>

<script>
    import suggest from "@/common/components/suggest";
    import poinitList from "./pointList";
    import Api from "../js/api";

    export default {
        components: {
            suggest,
            poinitList
        },
        data () {
            return {
                condition: {
                    searchType: 1,
                    driver_id: "",
                    trans_event_id: "",
                    start_time: "",
                    end_time: "",
                    sort_filed: "",
                    sort_type: "",
                    page: 1
                },
                list_search_condition: null,
                map_result: {
                    total_mile: 0,
                    duration: ""
                },
                list_result: {
                    trackList: {}
                },
                driverList: [],
                res: null
            }
        },
        mounted () {
            this.initParam();
        },
        methods: {
            async getDriver (key) {
                let result = (await Api.getDriverList(key)).info;
                this.driverList = result.map((driver) => {
                    return {
                        text: driver.name + "("+ driver.driver_id + ")",
                        value: driver.driver_id
                    }
                });
            },
            initParam () {
                let driverId = this.$route.query.driver_id;
                if (driverId) {
                    this.$refs.driver.set(driverId, driverId);
                }
            },
            searchList () {
                if (this.checkCondition()) {
                    let param = this.getCondition();
                    this.$nextTick(() => {
                        this.$refs.pointList.search();
                    });
                    param.type = "map";
                    //获取地图点的数据
                    this.getMapPoint(param);
                }
            },
            getCondition () {
                //默认为list查询，返回查询条件之后再修改为type
                let param = {};
                param.type = "list";
                if (this.condition.searchType == 1) {
                    param.driver_id = this.condition.driver_id;
                    param.start_time = this.condition.start_time;
                    param.end_time = this.condition.end_time;
                } else {
                    param.trans_event_id = this.condition.trans_event_id;
                }
                this.list_search_condition = param;
                //防止篡改this.list_search_condition
                return Object.assign({}, param);
            },
            checkCondition () {
                if (this.condition.searchType == 1) {
                    if (!this.condition.driver_id) {
                        this.$message.warning("请输入司机姓名或者司机ID");
                        return false;
                    }
                    if (!this.condition.start_time || !this.condition.end_time) {
                        this.$message.warning("开始时间和结束时间不能为空");
                        return false;
                    }
                    let start = this.condition.start_time.getTime();
                    let end = this.condition.end_time.getTime();
                    //结束时间不能小于开始时间
                    if (end - start < 0) {
                        this.$message.warning("结束时间不能小于开始时间");
                        return false;
                    }
                    //结束时间最多比开始时间长12小时
                    if (end - start > 12 * 3600 * 1000) {
                        this.$message.warning("结束时间最多比开始时间长12小时");
                        return false;
                    }
                }
                if (this.condition.searchType == 2 && !this.condition.trans_event_id) {
                    this.$message.warning("请输入出车ID");
                    return false;
                }
                return true;
            },
            getMapPoint (param) {
                let arr = [Api.getTrackPoint(param), Api.getStopPoint(param)];
                Promise.all(arr).then( (res) => {
                    if (!res[0].info.list.length) {
                        this.$message.warning("暂无该车辆数据!");
                        this.map && this.map.clearMap();
                        return;
                    }
                    //修改里程数和时间信息
                    this.res = res;
                    this.map_result.duration = res[0].info.duration;
                    this.map_result.total_mile = res[0].info.total_mile;

                    this.$emit("gotPoint", res);
                })
            },
            getStopList (param) {
                Api.getStopPoint(param).then(res => {
                    this.res[1] = res;
                    this.$emit("gotPoint", this.res);
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .searchBar {
        width: 316px;
        height: 100%;
        padding: 20px 10px 10px 10px;
        background: #FFFFFF;
        border: 1px solid #999;
        position: relative;
        .search-item {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
            font-size: 12px;
            color: #333;
            .input-box{
                border: 1px solid #eee;
            }
        }
        .search-data {
            flex-wrap: wrap;
            margin-bottom: 0;
            .block {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                .el-date-editor {
                    width: 234px;
                    input {
                        border: 1px solid #CCC;
                        border-radius: 2px;
                    }
                }
            }
        }
        .search-op {
            justify-content: space-between;
            .el-button {
                width: 44px;
                height: 22px;
                padding: 4px 10px;
                background-color: #36ABE7;
            }
        }
        .line {
            width: 100%;
            height: 1px;
            position: absolute;
            background-color: #C9CFD2;
            left: 0;
            margin-top: 23px;
            margin-bottom: 1px;
        }
    }
</style>
