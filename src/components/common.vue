<script>

// 手机号验证规则
const isVerificationNumber = (number) => {
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(number)) {
        return false;
    } else {
        return true;
    }
}

// is微信环境？
const isWeiXin = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

// form-data转换
const obj2formdata = (obj) => {
    let formData = new FormData();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            formData.append(key, element)
        }
    }
    return formData;
}

// 授权协议HTML模版
const authAgreement = (company) => {
    return `
        <p>本人自愿开通视频彩铃功能（视频彩铃是VoLTE的特色业务，将“听的彩铃”演进成“看的彩铃”。用户在VoLTE网络下拨打语音电话或视频电话，呼叫接通前会看到一段视频内容。视频彩铃用户可以制作或上传个性化视频内容，或者从运营商的视频库中进行选择），并许可<b>${company}公司</b>在本人开通视频彩铃账户下投放包括但不限于企业广告、宣传片等其要求投放全部视频内容，同意昆明旭宏文化传播有限公司将作为代理方，代理本人视频彩铃开通工作、运营支撑工作。</p>
        <p>同时，本人知晓并认可《<b>${company}公司</b>与昆明旭宏文化传播有限公司集团视频彩铃业务合作协议》项下涉及本人的全部权利义务，包括但不限于：</p>
        <p>（1）视频彩铃中发布的内容由<b>${company}公司</b>提供。<b>${company}公司</b>应对其提供的广告视频彩铃样本的合法性、合理性、知识产权的使用权、专有权等负责。昆明旭宏文化传播有限公司只对<b>${company}公司</b>提供的视频彩铃样本的形式进行审核，无须实质审核。</p>
        <p>（2）对于<b>${company}公司</b>提供的视频彩铃广告内容昆明旭宏文化传播有限公司有权进行审核，对不符合《中华人民共和国广告法》及其他相关法律、法规的广告内容和表现形式，昆明旭宏文化传播有限公司有权要求<b>${company}公司</b>及时进行修改或由昆明旭宏文化传播有限公司进行修改后发送<b>${company}公司</b>书面确认。若<b>${company}公司</b>既不同意昆明旭宏文化传播有限公司修改，又不自行修改的，昆明旭宏文化传播有限公司有权拒绝发布。</p>
        <p>（3）昆明旭宏文化传播有限公司负责制定视频彩铃内容的制作标准和发布流程，对于不符合该标准和流程的订单，昆明旭宏文化传播有限公司有权拒绝受理。</p>
        <p>（4）如出现与国家政策、法律或相关管理部门规定冲突之内容，昆明旭宏文化传播有限公司有权停发该广告。</p>
        <p>如您对本《视频彩铃服务协议》相关事宜有任何问题（包括问题咨询、投诉等），请与<b>${company}公司</b>联系。</p>
    `
}

export default {
    isVerificationNumber,
    isWeiXin,
    authAgreement,
    obj2formdata,
}
</script>
