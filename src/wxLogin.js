import config from './plugin/config'

const debug = process.env.NODE_ENV !== 'production'

const { host, wx } = config;

const getQueryString = (name) => {
    let queryStr = window.location.href.split('?')[1] || '';
    let query = queryStr.split('#')[0] || '';
    let vars = query.split('&');
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split('=');
        if(pair[0] == name) return pair[1];
    }
    return(false);
}

const wxLogin = () => {
    if (debug) return;
    let routerString = window.location.href.split('#')[1] || '';
    let realString = routerString.split('?')[0] || '';
    let href = encodeURIComponent(`${host}/#${realString}`);
    // let href = encodeURIComponent(`${host}/${realString}`);
    let wxLink = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx.appid}&redirect_uri=${href}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
    window.location.href = wxLink;
}

export default {
    getQueryString, wxLogin
};