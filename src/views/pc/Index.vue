<template>
<div id="pc_index">
    <router-view />
</div>
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import config from '@/plugin/config.js'

Vue.use(ElementUI);

export default {
    name: 'PcIndex',
    data() {
        return {
            
        }
    },
    mounted () {
        // if(/Mobile|Android|webOS|iPhone|iPad|Phone/i.test(navigator.userAgent)){
        //     this.$msgbox({
        //         title: '请在PC端查看(长按复制以下网址)',
        //         message: `${config.ip}/#/pc/nav_home`,
        //         showConfirmButton: false,
        //         showClose: false,
        //     })
		// }
    }
}
</script>

<style lang="less">
    @media screen and (min-width:100px){ 
        html{ font-size: 9px; }
    }
    @media screen and (min-width:320px){ 
        html{ font-size: 10px; }
    }
    @media screen and (min-width:375px){ 
        html{ font-size: 12px; }
    }
    @media screen and (min-width:414px){
        html{ font-size: 14px; }
    }
    @media screen and (min-width:600px){
        html{ font-size: 18px; }
    }
    .v-modal {
        opacity: .9;
    }
    .el-message-box {
        width: 300px;
    }
</style>