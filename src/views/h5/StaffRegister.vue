<template>
<div class="staff-register">
    <van-cell-group>
        <van-field v-model="userName" placeholder="输入姓名" />
        <van-field v-model="mobile" placeholder="输入手机号" />
        <van-field
        v-model="sms"
        center
        clearable
        placeholder="输入短信验证码"
        >
            <van-button class="smsBtn" slot="button" size="small" type="info" plain hairline round :disabled="smsDisable" @click="getSmsCode">{{smsCodeText}}</van-button>
        </van-field>
    </van-cell-group>
    <div class="access" v-if="agent_status==1">
        <van-checkbox v-model="agentChecked">
            已阅读并同意成为代理人
        </van-checkbox>
        <span class="deco" @click="openAgentDialog">《代理人协议》</span>
    </div>
    <div class="access">
        <van-checkbox v-model="accessChecked">
            已阅读并同意开通
        </van-checkbox>
        <span class="deco" @click="showAuthDialog = true">《授权协议说明》</span>
    </div>
    <van-button
        class="register-btn"
        size="normal"
        slot="button"
        type="info"
        round
        @click="submit">确认开通</van-button>
    <div class="footer-bar">
        投诉电话：0871-65652323
    </div>
    <van-dialog
        v-model="showAuthDialog"
        title="视频彩铃投放授权书">
        <div class="auth-agreement" v-html="authAgreement"></div>
    </van-dialog>
</div>
</template>

<script>
import wxjs from '@/wxLogin'
import common from '@/components/common';
import config from '@/plugin/config.js'
import crypto from '@/plugin/crypto.js';

// 加密sign
const sign = () => {
    let timestamp = Date.parse(new Date());
    let str = `appId=525200&time=${timestamp}&version=1.0`;
    return crypto.encrypt2(str, '0501030602070804', '0102030405060708');
}

export default {
    name: 'StaffRegister',
    metaInfo: {
        title: '鲸彩云',
        titleTemplate: '%s - 员工注册',
    },
    data() {
        return {
            userName: '',
            mobile: '',
            sms: '',
            accessChecked: false,
            agentChecked: false,
            showAuthDialog: false,
            authAgreement: '',
            company_id: '',
            smsCodeText: '获取验证码',
            smsDisable: false,
            timer: -1,
            agent_status: 0,
        }
    },
    methods: {
        getCompanyName() {
            this.$fly.post('/api/company/company_info', { company_id: this.company_id })
            .then((res) => {
                let { errmsg, errcode, data } = res;
                if (errcode == 0) {
                    let name = data.company_name.replace(/公司/, '');
                    this.authAgreement = common.authAgreement(name);
                    this.agent_status = data.agent_status;
                } else {
                    this.$toast(errmsg)
                }
            })
        },
        getSmsCode() {
            if (!this.userName) {
                this.$notify('请输入姓名')
                return false
            }
            if (!this.mobile) {
                this.$notify('请输入手机号')
                return false
            }
            if (!common.isVerificationNumber(this.mobile)) {
                this.$notify('手机号码格式不正确')
                return false
            }
            this.smsInterval();
            this.$fly.post('/api/migu/mobile_code', {
                mobile: this.mobile,
                company_id: this.company_id,
                user_name: this.userName,
                sign: sign(),
            }).then((res) => {
                let { errcode, errmsg } = res;
                this.$toast(errmsg);
                if (errcode != 0) {
                    this.$router.push(`/h5/error?id=${this.company_id}&msg=${errmsg}`)
                }
            }).catch(() => {
                this.$toast('发送失败');
            })
        },
        submit() {
            if (!this.userName) {
                this.$notify('请输入姓名')
                return false
            }
            if (!this.mobile) {
                this.$notify('请输入手机号')
                return false
            }
            if (!common.isVerificationNumber(this.mobile)) {
                this.$notify('手机号码格式不正确')
                return false
            }
            if (!this.sms) {
                this.$notify('请输入短信验证码')
                return false
            }
            if (!this.accessChecked) {
                this.$notify('请同意授权协议')
                return false
            }
            let data = {
                company_id: this.company_id,
                code: this.sms,
                mobile: this.mobile,
                agent_status: this.agentChecked ? 1 : 0,
                user_name: this.userName,
                sign: sign(),
            }
            this.$fly.post('/api/migu/product', data)
            .then((res) => {
                let { errcode, errmsg } = res;
                this.$toast(errmsg);
                // errcode: 0,正常办理成功；2,已开通过视频彩铃
                if (errcode == 0) {
                    this.$router.push(`/h5/success?id=${this.company_id}`)
                } else if (errcode == 2) {
                    this.$router.push(`/h5/success?id=${this.company_id}&errcode=${errcode}`)
                } else {
                    this.$router.push(`/h5/error?id=${this.company_id}&msg=${errmsg}`)
                }
            }).catch(() => {
                let msg = '系统错误，开通失败';
                this.$toast(msg);
                this.$router.push(`/h5/error?id=${this.company_id}&msg=${msg}`)
            })
        },
        smsInterval() {
            const timeConf = 60;
            let count = timeConf;
            this.smsCodeText = count + 's后重新发送';
            this.smsDisable = true;
            this.timer = setInterval(() => {
                count--;
                this.smsCodeText = count + 's后重新发送';
                if (count <= 0) {
                    clearInterval(this.timer);
                    this.smsCodeText = '获取验证码';
                    count = timeConf;
                    this.smsDisable = false;
                }
            }, 1000)
        },
        openAgentDialog() {
            if (this.agent_status == 0) return;
            let { agreement } = config;
            this.$dialog.confirm({
                messageAlign: 'left',
                confirmButtonText: '接受',
                cancelButtonText: '不接受',
                message: agreement.agent,
            }).then(() => {
                this.agentChecked = true;
            }).catch(() => {
                this.agentChecked = false;
            });
        },
    },
    mounted () {
        this.company_id = this.$route.params.id;
        this.openAgentDialog();
        this.getCompanyName();
        console.log(sign());
        
    }
}
</script>

<style lang="less">
.staff-register {
    padding: 30/11rem 20/11rem;
    background-color: #fff;
    .van-field {
        margin: 20/11rem 0;
        background-color: #eee;
        border-radius: 100/11rem;
    }
    .smsBtn {
        padding: 0 16px;
    }
    .access {
        font-size: 14/11rem;
        margin-left: 5/11rem;
        margin-top: 10px;
        display: flex;
        align-items: center;
        .deco {
            color: #2878FF;
        }
    }
    .register-btn {
        width: 100%;
        margin: 20/11rem 0;
    }
    .footer-bar {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        padding: 20px;
        font-size: 12px;
        color: #999;
        text-align: center;
    }
    .van-checkbox__icon--round .van-icon {
        border-radius: 4px;
    }
    .auth-agreement {
        padding: 20px;
        max-height: 60vh;
        overflow-y: auto;
        font-size: 12px;
        p {
            text-indent: 2em;
            margin-bottom: 8px;
            b {
                text-decoration: underline;
            }
        }
    }
}
</style>