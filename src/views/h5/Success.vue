<template>
<div class='register-success'>
    <errmsg
        :imgIcon="imgIcon"
        :errName="errName"
        :errMsg="errMsg"
        :details="details"
    ></errmsg>
</div>
</template>

<script>
import Errmsg from '../../components/h5/errmsg.vue'
export default {
    name: '',
    metaInfo: {
        title: '鲸彩云',
        titleTemplate: '%s - 开通成功',
    },
    components: { Errmsg },
    data() {
        return {
            errcode: '',
            imgIcon: require('../../assets/image/success.png'),
            errName: '视频彩铃开通成功',
            errMsg: '',
            details: [
                '鲸彩云，开启您的精彩新视界',
                '秀出真自我！！',
            ],
        };
    },
    methods: {

    },
    mounted() {
        this.errcode = this.$route.query.errcode || '';
        if (this.errcode == 2) {
            this.errName = '您已经是视频彩铃用户';
            this.errMsg = '即将为您加入集团视频彩铃';
        }
    },
}
</script>

<style lang='less'>
</style>