<template lang="html">
    <div class="amap">
        <div id="map"></div>
        <play-bar ref="playBar" :pathData="pathData" :pathMessage="pathMessage" :navg="this.navg" :mile="mile"></play-bar>
    </div>
</template>

<script>
import playBar from "./playBar";
import { createPath, createStopMarkers, createMarker } from "../js/createPath";

export default {
    data () {
        return {
            map: null,
            navg: null
        }
    },
    components: {
        playBar
    },
    props: {
        points: {
            type: Array
        }
    },
    mounted () {
        this.init();
        this.initMap();
    },
    methods: {
        init () {

        },
        initMap () {
            let map = new AMap.Map('map', {
                resizeEnable: true,
                zoom: 12
            });
            this.map = map;
            map.setMapStyle('amap://styles/grey');
            map.addControl(new AMap.ToolBar());
        },
        repaint () {
            //每次查询之后都需要重绘路线
            createPath(this.map, this.pathData).then(navg => {
                if (this.navg) {
                    this.navg.destroy();
                    this.navg = null;
                }
                this.navg = navg;
                this.$refs.playBar.initProgress();
            });
            //每次查询之后都需要重绘停留点位置
            createStopMarkers(this.map, this.stopPoints);
            //创建起始位置的marker
            createMarker(this.map, {
                path: "start.png",
                location: this.pathData[0]
            });
            createMarker(this.map, {
                path: "end.png",
                location: this.pathData[this.pathData.length-1]
            });
        }
    },
    computed: {
        pathData () {
            let pathData = [];
            if (this.points.length) {
                let arr = this.points[0].list || [];
                arr.forEach((item) => {
                    pathData.push([item["loc:longitude_gd"], item["loc:latitude_gd"]]);
                })
            }
            return pathData;
        },
        pathMessage () {
            let pathMessage = [];
            if (this.points.length) {
                let arr = this.points[0].list || [];
                arr.forEach((item) => {
                    pathMessage.push({
                        ["driver:driver_name"]: item["driver:driver_name"],
                        ["driver:driver_id"]: item["driver:driver_id"],
                        ["driver:car_type_name"]: item["driver:car_type_name"],
                        ["loc:collect_time_reveal"]: item["loc:collect_time_reveal"],
                        ["loc:collect_time"]: item["loc:collect_time"],
                        ["location"]: item["location"],
                        ["location_display"]: item["location"],
                        ["extra:speed_avg"]: item["extra:speed_avg"]
                    });
                })
            }
            return pathMessage;
        },
        stopPoints () {
            let stopPoints = [];
            if (this.points.length) {
                let arr = this.points[1].list || [];
                arr.forEach((item) => {
                    stopPoints.push([item["f:longitude_gd"], item["f:latitude_gd"], item["f:duration"]]);
                })
            }
            return stopPoints;
        },
        mile () {
            let mile = 0;
            if (this.points.length) {
                mile = this.points[0].total_mile || 0;
            }
            return mile;
        }
    },
    watch: {
        points: function (val) {
            this.repaint();
        }
    }
}
</script>

<style lang="less" scoped>
    .amap {
        #map {
            width: 100%;
            height: calc(~"100% - 46px");
        }
    }
</style>
