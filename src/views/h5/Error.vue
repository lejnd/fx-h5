<template>
<div class='register-error'>
    <errmsg
        :imgIcon="imgIcon"
        :imgWidth="180"
        :errName="errName"
        :errMsg="errMsg"
        :details="details"
        :btnName="btnName"
        @btnFunc="goBack"
    ></errmsg>
</div>
</template>

<script>
import Errmsg from '../../components/h5/errmsg.vue'
export default {
    name: '',
    metaInfo: {
        title: '鲸彩云',
        titleTemplate: '%s - 开通失败',
    },
    components: { Errmsg },
    data() {
        return {
            imgIcon: require('../../assets/image/error3.png'),
            errName: '开通失败',
            errMsg: '',
            details: [
                '请联系您的小鲸专属客服协助开通',
                '电话：0871-65652323',
            ],
            btnName: '返回再来一次'
        };
    },
    methods: {
        goBack() {
            this.$router.push(`/h5/staff_register/${this.$route.query.id}`)
        }
    },
    mounted() {
        this.errMsg = this.$route.query.msg || '';
    },
}
</script>

<style lang='less'>
</style>