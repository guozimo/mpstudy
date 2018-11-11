<template lang="html">
<div class="bg_section">
  <div class="top_section">
    <div class="count_wrapper">
      <titleVue :title="'近七日速度统计'"/>
      <div id="speed"></div>
    </div>
    <div class="count_wrapper">
      <titleVue :title="'近七日行驶时长及里程统计'" />
      <div id="distance"></div>
    </div>
  </div>

  <div class="center_wrapper">
    <titleVue :title="'近七日时速分布'" />
    <div id="cover"></div>
  </div>
  <div class="bottom_section">
    <div class="count_wrapper">
      <titleVue :title="'近七日时段-行驶区域分布'" :type="'track'" :selectData="options"  @changeMap="changeMap" />
      <div id="mapTrack"></div>
    </div>
    <div class="count_wrapper">
      <titleVue :title="'近七日时段-停留区域分布图'" :type="'stop'" :selectData="options" @changeMap="changeMap" />
      <div id="mapStop"></div>
    </div>

  </div>
</div>

</template>
<script>
  import echarts from "echarts";
  import Api from './js/api';
  import titleVue from './components/titleVue';
  import myEchart from './js/myEchart';
  let speedOptions={},distanceOptions={},coverOptions={};
  export default {
    data () {
      return {
        speedLegendData:['速度标准差', '平均速度', '最高速度'],
        speedYAxis:{left: {name: "速度km/h", max: "210", min: 0}, right: {name: "标准差", max: "7", min: 0}},
        speedXAxis:{type: "category", data: []},
        speedStandardDeviationData:[],
        speedAvgData:[],
        speedMaxData:[],
        distanceLegendData:['行驶时长', '静止时长', '离线时长', '里程'],
        distanceYAxis:{left: {name: "小时/h", max: "35", min: 0}, right: {name: "里程/km", max: "700", min: 0}},
        distanceXAxis:{type: "category", data: []},
        distanceRunTime:[],
        distanceStaticTime:[],
        distanceOfflineTime:[],
        distanceMileage:[],
        coverCategories:[],
        coverData:[],
        timeTrackStart:0,
        timeTrackEnd:24,
        timeStopStart:0,
        timeStopEnd:24,
        type:"",
        options: [
          {
            value: '0~2'
          }, {
            value: '2~4'
          }, {
            value: '4~6'
          }, {
            value: '6~8'
          }, {
            value: '8~10'
          },
          {
            value: '10~12'
          }, {
            value: '12~14'
          }, {
            value: '14~16'
          }, {
            value: '16~18'
          }, {
            value: '18~20'
          } ,{
            value: '20~22'
          },{
            value: '22~24'
          }
        ]
      }
    },
    components:{
      titleVue
    },
    mounted(){
      this.setSpeedOption();
      this.setDistanceOption();
      this.speedList();
      this.mapTrack();
      this.mapStop();
    },
    methods:{
      changeMap(e){
        let type=e[1],timeAry=e[0].split('~');
        if(type=='track'){
          this.timeTrackStart=timeAry[0];
          this.timeTrackEnd=timeAry[1];
          this.mapTrack();
        }else{
          this.timeStopStart=timeAry[0];
          this.timeStopEnd=timeAry[1];
          this.mapStop();
        }

      },
      setSpeedOption(){
        this.speedStatisticsList();
        speedOptions.legendData=this.speedLegendData;
        speedOptions.yAxis=this.speedYAxis;
        speedOptions.xAxis=this.speedXAxis;
        speedOptions.seriesData=[
          {
            name:'速度标准差',
            type:'bar',
            smooth: true,
            barWidth:18,
            label: {
              normal: {
                show: true,
                position: 'top',
                color:"#666"
              },

            },
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#74C3F7'},
                    {offset: 1, color: '#6765F9'},
                  ]
                ),
                barBorderRadius: [9, 9, 0, 0]
              }

            },
            data: this.speedStandardDeviationData
          },
          {
            name:'平均速度',
            type:'line',
            smooth: true,
            label: {
              normal: {
                show: true,
                position: 'top',
                color:"#666",
                backgroundColor:"#fff",
                shadowColor:'rgba(0,0,0,0.52)',
                shadowBlur:10,
                padding:[5,10,5,10],
                borderRadius:3
              },
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  width:4// 0.1的线条是非常细的了
                },
                color: new echarts.graphic.LinearGradient(
                  0, 0,1 , 0,
                  [
                    {offset: 0, color: '#AF90FB'},
                    {offset: 1, color: '#F08EC5'},
                  ]
                )
              }
            },
            data: this.speedAvgData
          },
          {
            name:'最高速度',
            type:'line',
            barWidth:18,
            smooth: true,
            label: {
              normal: {
                show: true,
                position: 'top',
                color:"#666",
                backgroundColor:"#fff",
                shadowColor:'rgba(0,0,0,0.52)',
                shadowBlur:10,
                padding:[5,10,5,10],
                borderRadius:3
              },
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  width:4// 0.1的线条是非常细的了
                },
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    {offset: 0, color: '#E6B65B'},
                    {offset: 1, color: '#FC807F'}
                  ]
                )
              }
            },
            data: this.speedMaxData
          }
        ];
      },
      async speedStatisticsList(){
        let driver_id=this.$route.query.driver_id;
        let params={type:'speed',driver_id:driver_id};
        let speedData=(await Api.speedStatisticsList(params)).info;
        if(speedData.length==0){document.getElementById("speed").innerHTML="暂无数组";return}
        for(let k of speedData){
          this.speedXAxis.data.push(k.date);
          k.list=this.mToh(k.list);
          this.speedStandardDeviationData.push(k.list.speed_statistic_standard_deviation);
          this.speedAvgData.push(k.list.speed_statistic_avg)
          this.speedMaxData.push(k.list.speed_statistic_max)
        }
        echarts.init(document.getElementById("speed")).setOption(myEchart.mixChart(speedOptions), true);
      },
      setDistanceOption(){
        this.locStatisticsList();
        distanceOptions.legendData = this.distanceLegendData;
        distanceOptions.yAxis = this.distanceYAxis;
        distanceOptions.xAxis = this.distanceXAxis;
        distanceOptions.seriesData=[
          {
            name: '行驶时长',
            type: 'bar',
            stack: '标准差',
            barWidth:18,
            label: {
              normal: {
                show: true,
                position: 'right',
                color:"#666"
              },

            },
            itemStyle: {
              normal: {
                color: "#6766F8 "
              }
            },
            data: this.distanceRunTime
          },
          {
            name: '静止时长',
            type: 'bar',
            stack: '标准差',
            barWidth:18,
            label: {
              normal: {
                show: true,
                position: 'right',
                color:"#666"
              },

            },
            itemStyle: {
              normal: {
                color: "#74C2F7"
              }
            },
            data: this.distanceStaticTime
          },
          {
            name: '离线时长',
            type: 'bar',
            stack: '标准差',
            barWidth:18,
            label: {
              normal: {
                show: true,
                position: 'right',
                color:"#666"
              },

            },
            itemStyle: {
              normal: {
                color: "#A6A6A6"
              }
            },
            data: this.distanceOfflineTime
          },
          {
            name:'里程',
            type:'line',
            yAxisIndex: 1,
            smooth: true,
            label: {
              normal: {
                show: true,
                position: 'top',
                color:"#666",
                backgroundColor:"#fff",
                shadowColor:'rgba(0,0,0,0.52)',
                shadowBlur:10,
                padding:[5,10,5,10],
                borderRadius:3
              },
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 4
                },
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    {offset: 1, color: '#AB8BF3'},
                    {offset: 0, color: '#DD84B9'}
                  ]
                )
              },
            },
            data:this.distanceMileage
          }
        ]
      },
      async locStatisticsList(){
        let driver_id=this.$route.query.driver_id;
        let params={type:'loc',driver_id:driver_id};
        let locData=(await Api.speedStatisticsList(params)).info;
        if(locData.length==0){document.getElementById("distance").innerHTML="暂无数组";return}
        for(let k of locData){
          this.distanceXAxis.data.push(k.date);
          k.list=this.mToh(k.list);
          this.distanceRunTime.push(k.list.loc_statistic_run_time)
          this.distanceStaticTime.push(k.list.loc_statistic_static_time)
          this.distanceOfflineTime.push(k.list.loc_statistic_offline_time)
          this.distanceMileage.push(parseInt(k.list.loc_statistic_mileage)/1000)
        }
        echarts.init(document.getElementById("distance")).setOption(myEchart.mixChart(distanceOptions), true);
      },
      setCoverOption(cur,i){
        let optionData=[],obj={},lastTime=0,endTime;
        for(let d=0;d<cur.length;d++){
          let curData=this.mToh([cur[d]]);
          endTime=lastTime+curData.velocity_duration*24;
          obj.name=this.mileaType(curData.velocity_speed);
          obj.value=[i,lastTime,endTime,curData.velocity_duration*24,this.mileaType(curData.velocity_speed)];
          obj.color="#EEEEEE";
          obj.itemStyle={
            "normal": {
              "color": "#EEEEEE"
            }
          };
          this.coverData.unshift(obj);
          obj={};
          lastTime=lastTime+curData.velocity_duration*24;
        }
      },
      async speedList(){
        let id=this.$route.query.driver_id,i=0;
        let speedList=(await Api.speedList({driver_id:id})).info;
        if(speedList.length==0){document.getElementById("cover").innerHTML="暂无数组";return}
        for(let k of speedList){
          let curlist=k.list;
          this.coverCategories.unshift(k.date);
          this.setCoverOption(curlist,i);
          i++;
        }
        coverOptions.categories=this.coverCategories;
        coverOptions.data=this.coverData;
        echarts.init(document.getElementById("cover")).setOption(myEchart.customChart(coverOptions), true);

      },
      mapInit(dom,data){
        let heatmap,centerLat=39.921984, centerLng=116.418261;
        console.log(data)
        if(data.length>0){
          centerLat=data[0].lat;
          centerLng=data[0].lng;
        }
        let map = new AMap.Map(dom, {
          resizeEnable: true,
          center: [centerLng, centerLat],
          zoom: 11
        });
        map.plugin(["AMap.Heatmap"], function() {
          heatmap = new AMap.Heatmap(map, {
            radius: 25,
            opacity: [0, 0.8]

          });
          heatmap.setDataSet({
            data: data,
            max: 100
          });
        });
      },
      async mapTrack(){
        let temp=[];
        let id=this.$route.query.driver_id;
        let mapData={driver_id:id,time_interval_start:this.timeTrackStart,time_interval_end:this.timeTrackEnd,type:'track'};
        let heatList=(await Api.heatList(mapData)).info;
        for(let i=0; i<heatList.length; i++){
          let obj=this.mToh([heatList[i]])
          temp.push({lng:obj.loc_longitude_gd,lat:obj.loc_latitude_gd,count:i})
        }
        this.mapInit("mapTrack",temp)
      },
      async mapStop(){
        let temp=[];
        let id=this.$route.query.driver_id;
        let mapData={driver_id:id,time_interval_start:this.timeStopStart,time_interval_end:this.timeStopEnd,type:'stop'};
        let heatList=(await Api.heatList(mapData)).info;
        for(let i=0; i<heatList.length; i++){
          let obj=this.mToh([heatList[i]]);
          temp.push({lng:obj.f_longitude_gd,lat:obj.f_latitude_gd,count:i})
        }
        this.mapInit("mapStop",temp)
      },
      mToh(cur){
        let obj={};
        for(let i=0; i<cur.length; i++){
          for(let k in cur[i]){
            if(k.indexOf(":")>-1){
              let replace=k.replace(":","_");
              obj[replace]=cur[i][k]
            }
          }
        }
        return obj
      },
      mileaType(cur){
        let i="";
        if(cur>=90){
          i=">=90km/h";
        }else if(cur>=60 && cur<90){
          i=">=60km/h";
        }else if(cur>=40 && cur<60){
          i=">=40km/h"
        }else if(cur>0 && cur<40){
          i="<40km/h"
        }else{
          i="0km/h";
        }
        return i;
      },
    }
  }

</script>
<style lang="less" scoped>
  .bg_section{
    background: #FFFFFF;
    box-shadow: 0 0 5px 2px rgba(0,0,0,0.09);
    border-radius: 3px;;
    margin: 20px;
    padding: 10px;
    .top_section{
      display: flex;
      .count_wrapper{
        width: 50%;
        background: #FFFFFF;
        border: 1px solid #E6EAEE;
        border-radius: 3px;
        margin: 10px;
      }
      #speed{
        width: 100%;
        height: 411px;
        z-index: 11;
        color: #666666;
        text-align: center;
        padding-top: 10px;
      }
      #distance{
        width: 100%;
        height: 411px;
        z-index: 11;
        color: #666666;
        text-align: center;
        padding-top: 10px;
      }
    }
    .center_wrapper{
      background: #FFFFFF;
      border: 1px solid #E6EAEE;
      border-radius: 3px;
      margin: 10px;
      #cover{
        width: 100%;
        height: 411px;
        z-index: 11;
        color: #666666;
        text-align: center;
        padding-top: 10px;
      }
    }
    .bottom_section{
      display: flex;
      .count_wrapper{
        width: 50%;
        background: #FFFFFF;
        border: 1px solid #E6EAEE;
        border-radius: 3px;
        margin: 10px;
        #mapTrack{
          width: 100%;
          height: 356px;
        }
        #mapStop{
          width: 100%;
          height: 356px;
        }
      }

    }
  }
</style>
