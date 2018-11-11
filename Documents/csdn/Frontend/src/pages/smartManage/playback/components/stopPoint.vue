<template lang="html">
    <div class="stop-point">
        <div class="filter">
            <p>过滤<input type="number" min="0" max="10" v-model="min"/>分钟以下的停留点</p>
            <a href="javascript:;"  @click="doFilter">过滤</a>
        </div>
        <div class="table" v-loading="loading">
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>停留开始</th>
                        <th>停留时长</th>
                    </tr>
                </thead>
                <tbody v-if="stop_list.list && stop_list.list.length">
                    <tr v-for="(item, index) in stop_list.list">
                        <td>{{index + 1}}</td>
                        <td>{{item["f:begin_time"]}}</td>
                        <td>{{item["f:duration"]}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="3">无任何数据</td>
                    </tr>
                </tbody>
            </table>
            <el-pagination
                v-if="stop_list.list && stop_list.list.length"
                background
                small
                layout="prev, pager, next"
                @current-change="getStopList"
                :page-size="12"
                :current-page="page"
                :total="stop_list.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import Api from "../js/api";

export default {
    data () {
        return {
            min: 10,
            page: 1,
            loading: false,
            stop_list: {}
        }
    },
    methods: {
        getCondition (page) {
            let param = Object.assign({}, this.condition);
            param.page = page;
            param.stop_duration = this.min;
            this.page = page;
            return param;
        },
        getStopList (page = 1) {
            this.loading = true;
            let param = this.getCondition(page);
            Api.getStopList(param).then((res) => {
                this.stop_list = res.info;
                this.loading = false;
            });

        },
        doFilter () {
            this.getStopList();
            let param = this.getCondition(1);
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
.stop-point {
    width: 294px;
    height: 469px;
    border-top: 1px solid #C9CFD2;
    .filter {
        display: flex;
        height: 36px;
        align-items: center;
        justify-content: space-between;
        p {
            font-size: 12px;
            color: #333;
            input {
                width: 36px;
                height: 19px;
                border: 1px solid #979797;
            }
        }
        a {
            display: inline-block;
            width: 44px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            background: #36ABE7;
            border-radius: 2px;
            font-size: 12px;
            color: #FFF;
            font-weight: 200;
        }
    }
    .table {
        .el-pagination {
            width: 100%;
            overflow-x: auto;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 18px;
            tbody tr:hover {
                cursor: pointer;
                background-color:  #EAF1F5;
            }
            tr {
                border: 1px solid #e1e1e1;
                height: 29px;
            }
            td,th{
                font-size: 12px;
                padding-left: 10px;
            }
            th {
                color: #999;
                font-weight: 200;
            }
            td {
                color: #333;
            }
        }
    }
}
</style>
