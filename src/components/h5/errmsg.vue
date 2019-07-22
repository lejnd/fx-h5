<template>
<div class='register-error'>
    <div class="error-icon">
        <img :width="imgWidth" :src="imgIcon" alt="">
    </div>
    <p class="detail">{{errName}}</p>
    <p class="msg" v-if="errMsg">{{errMsg}}</p>
    <p class="deco" v-for="(detail, index) in details" :key="index">{{detail}}</p>
    <van-button class="btn" type="info" v-if="btnName" @click="btnFunc">{{btnName}}</van-button>
</div>
</template>

<script>

export default {
    name: '',
    props: {
        imgIcon: {
            type: String,
            default: () => '',
        },
        imgWidth: {
            type: Number,
            default: () => 250,
        },
        errName: {
            type: String,
            default: () => '',
        },
        errMsg: {
            type: String,
            default: () => ''
        },
        details: {
            type: Array,
            default: () => []
        },
        btnName: {
            type: String,
            default: () => ''
        }
    },
    components: {},
    data() {
        return {
        };
    },
    methods: {
        btnFunc() {
            this.$emit('btnFunc')
        }
    },
    mounted() {
    },
}
</script>

<style lang='less'>
.register-error {
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .error-icon {
        padding-top: 50px;
        img {
            // width: 180px;
        }
    }
    .detail {
        margin-top: 3rem;
        margin-bottom: 2.5rem;
        color: #333;
        font-size: 2rem;
    }
    .msg {
        margin-bottom: 2.5rem;
        font-size: 1.4rem;
        color: #999;
        &.opacity {
            opacity: 0;
        }
    }
    .deco {
        color: #888;
        font-size: 1.5rem;
        line-height: 1.6;
    }
    .btn {
        margin-top: 5rem;
        // background-color: #e74d41;
        // border: 1px solid #e74d41;
        padding: 0 45px;
        border-radius: 8px;
    }
}
</style>