<template>
<div class='common-success'>
    <img class="icon" src="../../assets/image/success.png" alt="">
    <p class="msg">{{message}}</p>
    <p class="deco">{{deco}}</p>
</div>
</template>

<script>

export default {
    name: 'CommonSuccess',
    components: {},
    data() {
        return {
            message: '开通成功',
            deco: '其他信息'
        };
    },
    methods: {
        
    },
    mounted() {
        this.message = this.$route.query.msg;
        this.deco = this.$route.query.deco || '';
    },
}
</script>

<style lang='less'>
.common-success {
    text-align: center;
    min-height: 100vh;
    background-color: #fff;
    .icon {
        width: 70%;
        padding: 30px;
    }
    .msg {
        font-size: 18/11rem;
        color: #666;
        padding: 15px;
        text-align: center;
        font-weight: 700;
    }
    .deco {
        font-size: 13/11rem;
        color: #878787;
        text-align: center;
    }
}
</style>