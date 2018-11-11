import axios from 'axios';
import { Message } from 'element-ui';

class Http {
    ajax (url, type, params = {}) {
        return new Promise((resolve, reject) => {
            //添加token值
            params.token = localStorage.getItem("token") || "";
            return axios({
                        method: type,
                        url: url,
                        data: params,
                        params: params
                    }).then((res) => {
                        if (res.data.code !== 0) {
                            Message({
                                type: 'error',
                                message: res.data.msg,
                                showClose: true
                            });
                            return;
                        }
                        resolve(res.data);
                    }).catch((err) => {
                        Message({
                            type: 'error',
                            message: err.toString(),
                            showClose: true
                        });
                    });
        });
    }
    ajaxGet (url, params) {
        return this.ajax(url, 'get', params);
    }
    ajaxPost (url, params) {
        return this.ajax(url, 'post', params);
    }
}

// 单例，整个项目只用一个
Http.getInstance = (function(){
    let _http = null;
    return function () {
        if (_http) {
            return _http;
        }
        return _http = new Http();
    };
})();

export default Http;
