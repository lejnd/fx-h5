import Vue from 'vue';
import fly from 'flyio';
import { Toast } from 'vant';
Vue.use(Toast);

// const debug = process.env.NODE_ENV !== 'production'

fly.config = {
    // headers: {
    //     // StateProperty: StateProperty,
    //     // latitude: window.latitude,
    //     // longitude: window.longitude,
    //     // 'Content-Type': 'application/json',
    // },
    // baseURL: debug ? '/api' : '',             //请求基地址
    timeout: 0,             //超时时间，为0时则无超时限制
    withCredentials: false    //跨域时是否发送cookie
}

fly.interceptors.response.use(
    (response) => {
        //只将请求结果的data字段返回
        if (response.status == 200) {
            return JSON.parse(response.data)
        } else {
            return Promise.reject(response + '错误')
        }
    },
    (err) => {
        //发生网络错误后会走到这里
        if (err.status == 404) {
            Toast('页面不存在');
        } else {
            Toast('连接错误');
        }
    }
)

Vue.prototype.$fly = fly;