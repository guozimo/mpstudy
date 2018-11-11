import Http from '@/apis/http';
const http = Http.getInstance();

const api = {
  // 管理区
  getAdc (adc_name) {
    return http.ajaxGet('/api/realtime/adc', {
      adc_name: adc_name
    });
  },
  // 仓
  getWarehouse (warehouse_name) {
    return http.ajaxGet('/api/realtime/warehouse', {
      warehouse_name: warehouse_name
    });
  },
  // 车型
  getCarType () {
    return http.ajaxGet('/api/realtime/carType');
  },
  // 汇总信息
  getSummaryInfo (params) {
    return http.ajaxGet('/api/realtime/querySummary', params);
  },
  // 我的司机
  getMyDriver (params) {
    return http.ajaxGet('/api/realtime/myDriver', params);
  },
  // 查询车辆位置
  getCarPosition (params) {
    return http.ajaxGet('/api/realtime/queryPosition', params);
  },
  // 车辆信息列表
  getCarList (params) {
    return http.ajaxGet('/api/realtime/queryList', params);
  },
  // 显示电话
  getDriverMobile (id) {
    return http.ajaxGet('/api/realtime/driverMobile', {
      driver_id: id
    });
  },
  // 车的具体信息
  getCarDetail (id) {
    return http.ajaxGet('/api/realtime/carPosition', {
      driver_id: id
    });
  },

  //近七日统计
  speedStatisticsList(params){
    return http.ajaxGet('/api/realtime/speedStatisticsList',params)
  },
  //近七日时速分布
  speedList(params){
    return http.ajaxGet('/api/realtime/speedList',params)

  },
  //轨迹热力图
  heatList(params){
      return http.ajaxGet("/api/realtime/heatList",params)
  }
};

export default api;
