import Http from '@/apis/http';
const http = Http.getInstance();

const api = {
    login (params) {
        console.log(http);
        return http.ajaxPost("/api/login", params);
    },
    logout (params) {
        return http.ajaxGet("/api/logout", params);
    }
};

export default api;
