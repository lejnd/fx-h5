<template>
<div id="h5_index" v-if="hasOpenid">
    <router-view />
</div>
</template>

<script>
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import { mapActions, mapGetters } from 'vuex';
import wxjs from '@/wxLogin'

Vue.use(Vant);

export default {
    name: 'H5Index',
    data() {
        return {
            hasOpenid: false,
        }
    },
    computed: {
        ...mapGetters(['openid'])
    },
    methods: {
        ...mapActions([
            'getOpenid',
        ]),
    },
    mounted () {
        const debug = process.env.NODE_ENV !== 'production'
        if (debug) {
            this.hasOpenid = true;
            return;
        }
        let code = wxjs.getQueryString('code')
        if (this.openid) {
            console.log('openid存在，直接请求');
            this.hasOpenid = true;
        } else if (code) {
            console.log('code存在，获取openid');
            this.getOpenid(code)
            .then(() => {
                console.log('openid:', this.openid);
                this.hasOpenid = true;
            })
            .catch((err) => {
                this.hasOpenid = true;
                this.$toast(err);
            })
        } else {
            console.log('都不存在，发起微信授权，获取code');
            wxjs.wxLogin();
        }
    }
}
</script>

<style lang="less">
    
</style>