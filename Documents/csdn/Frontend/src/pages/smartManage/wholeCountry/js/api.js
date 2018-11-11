import Http from '@/apis/http';
const http = Http.getInstance();

const api = {
    getdata () {
        return http.ajaxGet("/api/realtime/position");
    },
    getmessage () {
        return http.ajaxGet("/api/realtime/index");
    }
};

export default api;
