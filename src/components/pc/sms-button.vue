<template>
<el-button :disabled="smsDisable" type="primary" @click="getSmsCode">{{smsCodeText}}</el-button>
</template>

<script>
import common from '../common'

export default {
    name: '',
    components: {},
    props: {
        mobile: {
            type: String,
            default: () => '',
        },
        url: {
            type: String,
            default: () => '',
        },
    },
    data() {
        return {
            smsCodeText: '获取短信验证码',
            smsDisable: false,
            timer: -1,
        };
    },
    methods: {
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
                    this.smsCodeText = '获取短信验证码';
                    count = timeConf;
                    this.smsDisable = false;
                }
            }, 1000)
        },
        getSmsCode() {
            if (!this.mobile) {
                this.$message.error('请输入手机号');
                return false
            }
            if (!common.isVerificationNumber(this.mobile)) {
                this.$message.error('手机号码格式不正确')
                return false
            }
            this.smsInterval();
            this.$fly.post(this.url, { contact_mobile: this.mobile })
            .then((res) => {
                let { errcode, errmsg } = res;
                this.$message(errmsg);
            }).catch(() => {
                this.$message.error('发送失败');
            })
        },
    },
    mounted() {
       
    },
}
</script>

<style lang='less'>

</style>