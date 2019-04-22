<template>
<div class="staff-register">
    <van-cell-group>
        <van-field v-model="value" placeholder="输入用户名" />
        <van-field v-model="value" placeholder="输入用户名" />
        <van-field
        v-model="sms"
        center
        clearable
        placeholder="输入短信验证码"
        >
            <van-button slot="button" size="small" type="info" plain hairline round>获取验证码</van-button>
        </van-field>
    </van-cell-group>
    <div class="access">
        <van-radio v-model="accessChecked">已阅读并同意开通
            <span class="deco">《授权协议说明》</span>
        </van-radio>
    </div>
    <van-button class="register-btn" size="normal" slot="button" type="info" round>确认开通</van-button>
</div>
</template>

<script>
export default {
    name: 'StaffRegister',
    data() {
        return {
            value: '',
            sms: '',
            accessChecked: false,
        }
    }
}
</script>

<style lang="less">
.staff-register {
    padding: 30/11rem 20/11rem;
    .van-field {
        margin: 20/11rem 0;
        background-color: #eee;
        border-radius: 100/11rem;
    }
    .access {
        font-size: 14/11rem;
        margin-left: 5/11rem;
        .deco {
            color: #2878FF;
        }
    }
    .register-btn {
        width: 100%;
        margin: 20/11rem 0;
    }
}
</style>