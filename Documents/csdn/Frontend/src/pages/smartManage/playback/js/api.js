import Http from '@/apis/http';
const http = Http.getInstance();

const api = {
    //司机列表
    getDriverList (id) {
        return http.ajaxGet('/api/realtime/driverLists', {
            suggest: id
        });
    },
    //轨迹点列表
    getTrackList (params) {
        return http.ajaxGet('/api/realtime/trackList', params);
    },
    //停留点列表
    getStopList (params) {
        return http.ajaxGet('/api/realtime/stopList', params);
    },
    //地图轨迹点
    getTrackPoint (params) {
        return http.ajaxGet('/api/realtime/trackList', params);
    },
    //地图停留点
    getStopPoint (params) {
        return http.ajaxGet('/api/realtime/stopList', params);
    },
    //根据坐标点查询位置
    getPositionByLocation (params) {
        return http.ajaxGet('/api/realtime/positionLocation', params);
    }
};

export default api;
