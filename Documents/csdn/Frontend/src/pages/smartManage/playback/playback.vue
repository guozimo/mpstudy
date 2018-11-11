<template lang="html">
    <div class="playback">
        <search-bar @gotPoint="gotPoint"></search-bar>
        <amap class="amap" :points="points"></amap>
    </div>
</template>

<script>
import searchBar from "./components/searchBar";
import amap from "./components/amap";
export default {
    data () {
        return {
            points: []
        }
    },
    components: {
        searchBar,
        amap
    },
    methods: {
        gotPoint (arr) {
            this.points = [arr[0].info, arr[1].info];
        }
    }
}
</script>

<style lang="less">
    .playback {
        height: calc(~"100% - 80px");
        display: flex;
        .amap {
            flex-grow: 1;
        }
    }
</style>
