<template lang="html">
    <div class="line-point"  v-loading="loading">
        <table>
            <thead>
                <tr>
                    <th>序号</th>
                    <th>定位时间</th>
                    <th>时速</th>
                    <th>里程差</th>
                </tr>
            </thead>
            <tbody v-if="track_list.list && track_list.list.length">
                <tr v-for="(item, index) in track_list.list">
                    <td>{{index + 1}}</td>
                    <td>{{item["loc:collect_time"] | cutYear}}</td>
                    <td>{{item["extra:speed_avg"] || 0}}</td>
                    <td>{{item["extra:mile"] || 0}}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="4">无任何数据</td>
                </tr>
            </tbody>
        </table>
        <el-pagination
            v-if="track_list.list && track_list.list.length"
            background
            small
            layout="prev, pager, next"
            @current-change="getPointList"
            :page-size="12"
            :current-page="page"
            :total="track_list.total">
        </el-pagination>
    </div>
</template>

<script>
import Api from "../js/api";

export default {
    data () {
        return {
            page: 1,
            track_list: {},
            loading: false
        }
    },
    props: {
        condition: {
            type: Object
        }
    },
    methods: {
        getPointList (page = 1) {
            this.loading = true;
            let param = Object.assign({}, this.condition);
            param.page = page;
            this.page = page;
            Api.getTrackList(param).then((res) => {
                this.track_list = res.info;
                this.loading = false;
            });
        }
    },
    filters: {
        cutYear (val) {
            let arr = val.split("-");
            arr.shift();
            return arr.join("-");
        }
    }
}
</script>

<style lang="less" scoped>
.line-point {
    width: 294px;
    height: 469px;
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
</style>
