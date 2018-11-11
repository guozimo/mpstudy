<template>
  <div class="watch-box">
    <div id="watch-box"></div>
    <div class="search-bar">
      <div class="search1">
        <div class="manage-area">
          <suggest
            type="select"
            ref="adc"
            v-model="condition.adcId"
            :options="adcs"
            @change="changeAdc"
            :styles="{width:'120px','border-top-left-radius': '4px','border-bottom-left-radius': '4px'}"
            placeholder="管理区"></suggest>
        </div>
        <div class="warehouse">
          <suggest
            ref="warehouse"
            v-model="condition.warehouseId"
            @remoteRequest="getWarehouses"
            :options="warehouses"
            @change="changeWarehouse"
           type="suggest" :styles="{width:'120px'}" placeholder="仓"></suggest>
        </div>
        <div class="yuji">
          <suggest
            ref="avaliable"
            v-model="condition.isExAvaliable"
            @change="changeAvaliable"
            type="select"
            :options="[{text:'全部',value:0},{text:'是',value:1},{text:'否',value:2}]"
            :styles="{width:'120px'}"
            placeholder="是否云鸟出车中"></suggest>
        </div>
        <div class="car-type">
          <suggest
            ref="carType"
            @change="changeCarType"
            v-model="condition.carTypeId"
            type="select"
            :options="carTypes"
            :styles="{width:'100px','border-top-right-radius': '4px','border-bottom-right-radius': '4px'}"
            placeholder="车型"></suggest>
        </div>
      </div>
      <div class="search2">
        <div class="driver-task">
          <suggest
            type="select"
            :showClose="false"
            v-model="condition.searchType"
            :styles="{width:'80px','border-top-left-radius': '4px','border-bottom-left-radius': '4px'}"
            :options="[{text:'司机ID',value:1},{text:'出车ID',value:2}]"
            ></suggest>
        </div>
        <div class="id">
          <suggest
            ref="driverTask"
            v-model="condition.driverTaskValue"
            type="search"
            @search="searchById"
            placeholder="请输入ID号"
            :styles="{width:'110px','border-top-right-radius': '4px','border-bottom-right-radius': '4px'}"
          ></suggest>
        </div>
      </div>
    </div>
    <div class="total-box">
      <div class="total-bar">
        <i class="switch" :class="switchStatus" @click="showDriver"></i>
        <span class="count-text">总车辆</span>
        <span class="count all" :class="[searchCarStatus == 0 ? 'lighter': '']" @click="searchByCarStatus(0)">{{countInfo.all}}</span>
        <span class="count-text">行驶</span>
        <span class="count moving" :class="[searchCarStatus == 2 ? 'lighter': '']" @click="searchByCarStatus(2)">{{countInfo.travel}}</span>
        <span class="count-text">静止</span>
        <span class="count stop" :class="[searchCarStatus == 3 ? 'lighter': '']" @click="searchByCarStatus(3)">{{countInfo.prohibit}}</span>
        <span class="count-text">离线</span>
        <span class="count out" :class="[searchCarStatus == 1 ? 'lighter': '']" @click="searchByCarStatus(1)">{{countInfo.off_line}}</span>
        <div class="info-box">
          <span class="info" @click="showInfo">?</span>
          <div class="info-pop">
            <info ref="info"></info>
          </div>
        </div>
        <b class="search-out" v-if="drawListSearch" @click="outDrawSearch">退出</b>
        <i class="open-close" :class="toggleStatus" @click="toggle"></i>
      </div>
      <div class="car-data" :class="status" v-loading="loading">
        <table cellspacing="0" cellpadding="0">
          <thead>
            <th>序号</th>
            <!-- <th>轨迹操作</th>
            <th>运营效率分析</th> -->
            <th>司机ID</th>
            <th>操作</th>
            <th>司机电话</th>
            <th>状态</th>
            <th>位置</th>
            <th>出车ID</th>
            <th>任务ID</th>
            <th>是否进入黑名单</th>
          </thead>
          <tbody>
            <tr v-for="(car,index) in carList.list">
              <td>{{index+1}}</td>
              <!-- <td></td>
              <td></td> -->
              <td>{{car.driver_id}}</td>
              <td>
                  <a href="javascript:;" @click="showCarInfo(car)">定位</a>&nbsp;&nbsp;
                  <a href="javascript:;" @click="goPlayBack(car)">轨迹回放</a>&nbsp;&nbsp;
                  <a href="javascript:;" @click="goCarAnalysis(car)">车辆监控分析</a>
              </td>
              <td class="view-detail" @click="showMoblie(car.driver_id, car)">
                <span v-if="car.mobiled">{{car.mobile}}</span>
                <a v-else>查看详情</a>
              </td>
              <td>{{car.status}}</td>
              <td>{{car.location}}</td>
              <td>{{car.last_trans_event_id}}</td>
              <td>{{car.last_trans_task_id}}</td>
              <td>{{car.is_in_tender_blacklist}}</td>

            </tr>
          </tbody>
        </table>
        <div class="pager" v-show="carList.total">
          <el-pagination
            background
            @current-change="getCarList"
            :page-size="6"
            :current-page="page"
            layout="prev, pager, next"
            :total="carList.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="driver-menu" :class="menuStatus">
      <my-driver @change="showCarInfo"></my-driver>
    </div>
    <div class="tool-bar">
      <span class="bg" title="切换地图" @click="changeMap">
        <i class="icon-bg" :class="{'normal-map': toolStatus.normalMap}"></i>
      </span>
      <span class="select" title="画框查询" @click="searchByRec">
        <i class="icon-select" :class="{'polygon-on': toolStatus.polygonOn}"></i>
      </span>
      <span class="distance" title="地图测距" @click="measureDistance">
          <i class="icon-distance" :class="{'distance-on': toolStatus.distanceOn}"></i>
      </span>
    </div>
    <div class="info-window" v-show="false">
      <info-window ref="infoWindow" :car="car"></info-window>
    </div>
  </div>
</template>
<style lang="less">
  .cicle{
    width: 50px;
    height: 50px;
    background: red;
    border-radius: 50%;
  }
  .car{
    background-repeat: no-repeat;
    background-image: url('./images/watch-sprite.png');
    width: 18px;
    height: 18px;
    display: inline-block;
    &.move {
        background-position: -11px -61px;
    }
    &.stop {
        background-position: -34px -61px;
    }
    &.out {
        background-position: -57px -61px;
    }
    // &.big-move{
    //   background-position: -178px -15px;
    //   transform: rotate(45deg);
    // }
    // &.big-stop{
    //   background-position: -178px -39px;
    // }
    // &.big-out{
    //   background-position: -178px -63px;
    // }
    // &.mid-move{
    //   background-position: -236px -15px;
    // }
    // &.mid-stop{
    //   background-position: -236px -40px;
    // }
    // &.mid-out{
    //   background-position: -236px -65px;
    // }
    // &.small-move{
    //   background-position: -287px -15px;
    // }
    // &.small-stop{
    //   background-position: -287px -39px;
    // }
    // &.small-out{
    //   background-position: -287px -63px;
    // }
  }
  .warehouse-icon {
    width: 26px;
    height: 33px;
    background: url('./images/watch-sprite.png') -112px -80px;
  }
  .together{
    width: 39px;
    height: 41px;
    line-height: 41px;
    text-align: center;
    background-position: no-repeat;
    color: #333;
    &.small{
      background-image: url('./images/small.png');
    }
    &.mid{
      background-image: url('./images/mid.png');
    }
    &.big{
      background-image: url('./images/big.png');
    }
  }
</style>
<style lang="less" scoped src="./less/watch.less">


</style>
<script>
  import Vue from 'vue';
  import myDriver from './components/myDriver';
  import suggest from '@/common/components/suggest';
  import info from './components/info';
  import infoWindow from './components/infoWindow';
  import Api from './js/api';
  import { createMakers, createWarehouse, createPolymerization, openInfoWindow,clearMakers,setZoom,markers } from './js/map';
  import { getPositionType, POINT, ADC, CITY, AREA } from './js/setting';
  export default {
    data () {
      return {
        map: {},
        countInfo: {},
        status: 'close',
        toggleStatus: 'open',
        adcs: [],
        warehouses: [],
        carTypes: [],
        positions: [],
        carList: [],
        ruler: null,
        mouseTool: null,
        toolStatus: {
            normalMap: false,
            distanceOn: false,
            polygonOn: false
        },
        centerPosition: null,
        page: 1,
        condition: {},
        car: {},
        loading: false,
        menuStatus: 'close',
        switchStatus: 'close',
        searchCarStatus: 0,
        boundsOption: {
            hasbounds: false,
            left_upper_position: null,
            right_lower_position: null
        },
        drawListSearch: false
      };
    },
    components: {
      myDriver,
      suggest,
      info,
      infoWindow
    },
    mounted () {
      this.init();
      this.initMap();
      this.getCarType();
      this.getAdc("");
      this.queryAll();
      this.bindZoomEvent();
      this.$refs.infoWindow.show();
      window.map = this.map;
    },
    destroyed () {
        window.map = null;
    },
    methods: {
      init () {
        let adcId = this.$route.query.adc_id;
        let adcName = this.$route.query.adc_name;
        this.condition.adc_id = adcId;
        if (adcId) {
            this.$refs.adc.set(adcId, adcName);
        }
      },
      initMap () {
        let map = new AMap.Map('watch-box', {
            resizeEnable: true,
            zoom: 6
        });
        this.map = map;
        map.setMapStyle('amap://styles/grey');
        map.addControl(new AMap.ToolBar());
        //以下2必须为箭头头函数，this才会指向vue实例
        //添加测距插件，并添加测距结束后关掉测距按钮事件
        map.plugin(["AMap.RangingTool"], () => {
            this.ruler = new AMap.RangingTool(map);
            AMap.event.addListener(this.ruler, "end", (e) => {
                this.ruler.turnOff();
                this.toolStatus.distanceOn = false;
            });
        });
        //添加画框插件，并添加画框结束后关掉测距按钮事件
        map.plugin(["AMap.MouseTool"],() => {
            this.mouseTool = new AMap.MouseTool(map);
            AMap.event.addListener(this.mouseTool, 'draw', (e) => {
                //首先将画框的边界值保存，默认为总车辆查询，弹起列表
                let bounds = e.obj.getBounds();
                this.initDrawCondtion(bounds);
                //获取聚合信息
                this.queryAll(false).then(() => {
                    this.mouseTool.close(true);
                    this.toolStatus.polygonOn = false;
                    this.drawListSearch = true;
                });
            });
        });
      },
      initDrawCondtion (bounds) {
          this.boundsOption.hasbounds = true;
          this.boundsOption.left_upper_position = bounds.northeast.lng + ',' + bounds.northeast.lat;
          this.boundsOption.right_lower_position = bounds.southwest.lng + ',' + bounds.southwest.lat;
          this.searchCarStatus = 0;
          this.status = 'open';
          this.toggleStatus = 'close';
      },
      bindZoomEvent () {
        this.map.on('zoomend', () => {
            this.getCarPosition();
        });
        this.map.on('dragend', () => {
            this.getCarPosition();
        });
      },
      getCondition (hasViewPort = true) {
        let positionType = this.getPositionType();
        let bounds = this.map.getBounds();
        let leftPosition = bounds.northeast.lng + ',' + bounds.northeast.lat;
        let rightPosition = bounds.southwest.lng + ',' + bounds.southwest.lat;
        if (!hasViewPort) {
            leftPosition = rightPosition = '';
        }
        if (this.boundsOption.hasbounds) {
            leftPosition = this.boundsOption.left_upper_position;
            rightPosition = this.boundsOption.right_lower_position;
        }
        return {
            adc_id: this.condition.adcId,
            warehouse_id: this.condition.warehouseId,
            is_expect_available: this.condition.isExAvaliable,
            car_type_id: this.condition.carTypeId,
            driver_task_type: this.condition.searchType,
            driver_task_value: this.condition.driverTaskValue,
            my_driver: this.condition.isMyDriver,
            car_status: this.searchCarStatus,
            position_type: positionType,
            left_upper_position: leftPosition,
            right_lower_position: rightPosition
        };
      },
      toggle () {
        if (this.status === 'close') {
          this.status = 'open';
          this.toggleStatus = 'close';
          this.queryAll();
        } else {
          this.status = 'close';
          this.toggleStatus = 'open';
        }
      },
      getPositionType () {
        let zoom = this.map.getZoom();
        return getPositionType(zoom);
      },
      async queryAll (setCenter = true) {
        await this.getSummaryInfo();
        setCenter && this.map.setCenter([this.centerPosition.longitude,this.centerPosition.latitude]);
        if (this.status === 'open') {
            if (this.page === 1) {
                this.getCarList(1);
                return;
            }
            this.page = 1;
        }
        await this.getCarPosition();
      },
      async popInfoWindow (location, driverId) {
        await this.getCarDetail(driverId);
        Vue.nextTick(() => {
            openInfoWindow(map, this.$refs.infoWindow.$el.cloneNode(true), location, this);
        });
      },
      loadMapCar () {
        let map = this.map;

        let positions = this.positions;
        let positionType = this.getPositionType();
        // positionType = 1,2,3
        if ([ADC,CITY,AREA].includes(positionType)) {
            createPolymerization(map, positions, positionType, async (point) => {
                Vue.nextTick(() => {
                  // openInfoWindow(map, this.$refs.infoWindow.$el.cloneNode(true), point);
                });
            });
        } else {
            createMakers(map, positions, 'car', async (location, point) => {
                this.popInfoWindow(location, point.driver_id);
            });
        }
        //根据centerPosition的title来创建仓库的icon
        if (this.centerPosition.title) {
            createWarehouse(this.map, this.centerPosition);
        }
      },
      // clear () {
      //     //清空查询条件的时候也清除画框查询条件
      //     this.boundsOption.hasbounds = false;
      //     clearMakers(this.map);
      //     this.centerPosition.title = null;
      //     this.switchStatus = this.menuStatus = 'close';
      //     this.condition.isMyDriver = 0;
      //     this.queryAll();
      //     setZoom(this.map, 6);
      // },
      showDriver () {
        //只要点击就清空画框查询条件,并清除对应的marker
        this.boundsOption.hasbounds = false;
        clearMakers(this.map);
        if (this.menuStatus === 'close') {
            this.switchStatus = this.menuStatus = 'open';
            this.condition.adc_id = null;
            this.condition.isMyDriver = 1;
            setZoom(this.map, 13);
            this.queryAll();
        } else {
            this.switchStatus = this.menuStatus = 'close';
            this.condition.isMyDriver = 0;
            setZoom(this.map, 6);
            this.queryAll();
        }
      },
      showInfo () {
        this.$refs.info.show();
      },
      searchByRec () {
         this.toolStatus.polygonOn = true;
         this.mouseTool.rectangle();
      },
      measureDistance () {
        this.ruler.turnOn();
        this.toolStatus.distanceOn = true;
      },
      async showMoblie (id, car) {
        let info = (await Api.getDriverMobile(id)).info;
        car.mobile = (info && info.mobile) || '';
        car.mobiled = true;
      },
      async getAdc (key) {
        let adcs = (await Api.getAdc(key)).info;
        this.adcs = adcs.map((adc) => {
            return {
                text: adc.adc_name,
                value: adc.adc_id
            }
        });
        //添加默认车型
        this.adcs.unshift({
            text: '全国',
            value: ''
        });
      },
      async getWarehouses (key) {
        let warehouses = (await Api.getWarehouse(key)).info;
        this.warehouses = warehouses.map((adc) => {
            return {
                text: adc.name,
                value: adc.warehouse_id
            }
        });
      },
      async getCarPosition (hasViewPort = true) {
        let condition = this.getCondition(hasViewPort);
        let positions = (await Api.getCarPosition(condition)).info;
        this.positions = positions;
        this.loadMapCar();
      },
      changeAdc () {
        // 清空仓
        this.$refs.warehouse.setEmpty();
        // 清空司机id
        this.$refs.driverTask.setEmpty('', '');
        this.boundsOption.hasbounds = false;
        this.queryAll();
      },
      async changeWarehouse () {
        // 清空管理区
        this.$refs.adc.setEmpty();
        // 清空司机id
        this.$refs.driverTask.setEmpty('', '');
        this.boundsOption.hasbounds = false;
        await this.queryAll();
        setZoom(this.map, 13);
      },
      changeAvaliable () {
        this.$refs.driverTask.setEmpty('', '');
        this.queryAll(false);
      },
      changeCarType () {
        this.$refs.driverTask.setEmpty('', '');
        this.queryAll(false);
      },
      // 在地图上弹出车信息
      async showCarInfo (driver) {
          if (!driver.longitude && !driver.latitude) {
              this.$message({
                  message: '车辆位置不可用!',
                  type: 'warning'
              });
              return;
          }
          setZoom(this.map, 13);
          this.map.setCenter([driver.longitude, driver.latitude]);
          await this.getCarPosition(true);
          setTimeout(() => {
              let marker = markers[driver.driver_id];
              if (!marker) {
                  this.$message.warning('该车辆不在筛选条件车辆中');
                  return;
              }
              this.popInfoWindow(marker.getPosition(), driver.driver_id);
          }, 500)
      },
      async searchById (value, type) {
        if (!value) {
            this.$message({
                message: '请输入相应的查询信息！',
                type: 'warning'
            });
            return;
        }
        this.condition.driverTaskType = type || this.condition.searchType;
        this.condition.driverTaskValue = value;
        this.$refs.warehouse.setEmpty();
        this.$refs.adc.setEmpty();
        this.$refs.avaliable.setEmpty();
        this.$refs.carType.setEmpty();
        this.boundsOption.hasbounds = false;
        setZoom(this.map, 18);
        await this.getSummaryInfo();
        this.map.setCenter([this.centerPosition.longitude,this.centerPosition.latitude]);
        await this.getCarPosition(true);
        if (this.status === 'open') {
            if (this.page === 1) {
                this.getCarList(1);
                return;
            }
            this.page = 1;
        }
      },
      async getCarType () {
        let carTypes = (await Api.getCarType()).info;
        this.carTypes = carTypes.map((carType) => {
          return {
            text: carType.search_car_type_name,
            value: carType.search_car_type_id
          }
        });
        //添加默认车型
        this.carTypes.unshift({
            text: '全部',
            value: ''
        })
      },
      async getSummaryInfo () {
        let condition = this.getCondition(false);
        let countInfo = (await Api.getSummaryInfo(condition)).info;
        this.countInfo = countInfo.car_info || {};
        this.centerPosition = countInfo.center_position;
      },
      async searchByCarStatus (type, reload = false) {
        //直接点击数字，也可以弹起列表窗
        if (this.status === 'close') {
            this.status = 'open';
            this.toggleStatus = 'close';
        //点击当前车型不去重新请求
        } else if (!reload && type == this.searchCarStatus) {
            return;
        }
        this.searchCarStatus = type;
        this.getCarList(1);
        let condition = this.getCondition(true);
        let positions = (await Api.getCarPosition(condition)).info;
        this.positions = positions;
        this.loadMapCar();
      },
      async getCarList (page) {
        this.loading = true;
        this.page = page;
        let condition = this.getCondition(false);
        condition.page = page;
        let carList = (await Api.getCarList(condition)).info;
        this.loading = false;
        (carList.list || []).forEach((item) => {
            item.mobile = '';
            item.mobiled = false;
        });
        this.carList = carList;
      },
      async getCarDetail (id) {
        this.car = (await Api.getCarDetail(id)).info;
      },
      changeMap () {
          if (this.toolStatus.normalMap) {
              this.toolStatus.normalMap = false;
              this.map.setMapStyle('amap://styles/grey');
          } else {
              this.toolStatus.normalMap = true;
              this.map.setMapStyle('amap://styles/fresh');
          }
      },
      goCarAnalysis (car) {
        this.$router.push({
          path: '/intelligence/analysis',
          query: {
            driver_id: car.driver_id
          }
        });
      },
      outDrawSearch () {
            this.drawListSearch = false;
            this.boundsOption.hasbounds = false;
            clearMakers(this.map);
            this.centerPosition.title = null;
            this.switchStatus = this.menuStatus = 'close';
            this.condition.isMyDriver = 0;
            this.queryAll();
            setZoom(this.map, 6);
      },
      goPlayBack (car) {
        this.$router.push({
            path: '/intelligence/playback',
            query: {
                driver_id: car.driver_id
            }
        });
      }
    }
  }
</script>
