import Http from '@/apis/http';
const http = Http.getInstance();

const api = {
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
