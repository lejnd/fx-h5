<template>
<div class='bind-error'>
    <errmsg
        :imgIcon="imgIcon"
        :imgWidth="180"
        :errMsg="errMsg"
    ></errmsg>
</div>
</template>

<script>
import Errmsg from '../../components/h5/errmsg.vue'
export default {
    name: '',
    metaInfo: {
        title: '鲸彩云',
        titleTemplate: '%s - 绑定失败',
    },
    components: { Errmsg },
    data() {
        return {
            imgIcon: require('../../assets/image/error.png'),
            errMsg: '绑定失败',
            // details: [
            //     '请联系您的小鲸专属客服协助开通',
            //     '电话：0871-65652323',
            // ],
            // btnName: '返回再来一次'
        };
    },
    methods: {
        // goBack() {
        //     this.$router.push(`/h5/staff_register/${this.$route.query.id}`)
        // }
    },
    mounted() {
        this.errMsg = this.$route.query.msg || '绑定失败';
    },
}
</script>

<style lang='less'>
</style>