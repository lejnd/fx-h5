<template>
<div class='video-example'>
    <div class="item" v-for="item in items" :key="item.vid">
        <iframe class="video-iframe" height="220" width="510" :src='`https://v.qq.com/txp/iframe/player.html?vid=${item.vid}`' frameborder=0 allowfullscreen></iframe>
        <h2 class="title">{{item.name}}</h2>
    </div>
    <!-- <iframe class="video-iframe" height="220" width="510" src='https://v.qq.com/txp/iframe/player.html?vid=x09162ihg03' frameborder=0 allowfullscreen></iframe>
    <h2 class="title">【云南梁河宣传片】- 宣传片</h2>
    <iframe class="video-iframe" height="220" width="510" src='https://v.qq.com/txp/iframe/player.html?vid=n0916fg4tgg' frameborder=0 allowfullscreen></iframe>
    <h2 class="title">【昆明凯徕餐饮娱乐有限公司】- 品牌宣传</h2>
    <iframe class="video-iframe" height="220" width="510" src='https://v.qq.com/txp/iframe/player.html?vid=z09167yvgdk' frameborder=0 allowfullscreen></iframe>
    <h2 class="title">【中脉-知识改变命运】- 品牌宣传</h2>
    <iframe class="video-iframe" height="220" width="510" src='https://v.qq.com/txp/iframe/player.html?vid=c0916x0qihj' frameborder=0 allowfullscreen></iframe>
    <h2 class="title">【恒福（国际教育）】- 品牌宣传</h2> -->
</div>
</template>

<script>

export default {
    name: 'VideoExample',
    metaInfo: {
        title: '鲸彩云',
        titleTemplate: '%s - 视频案例',
    },
    components: {},
    data() {
        return {
            items: [
                { name: '【云南梁河宣传片】- 宣传片', vid: 'x09162ihg03' },
                { name: '【昆明凯徕餐饮娱乐有限公司】- 品牌宣传', vid: 'n0916fg4tgg' },
                { name: '【中脉-知识改变命运】- 品牌宣传', vid: 'z09167yvgdk' },
                { name: '【恒福（国际教育）】- 品牌宣传', vid: 'c0916x0qihj' },
                { name: '【红塔山新时代】- 品牌宣传', vid: 'c0922p0u9iq' },
                { name: '【红塔山（传奇）】- 品牌宣传', vid: 'p09225r9hdy' },
                { name: '【中国人民保险】- 品牌宣传', vid: 's0922isaevq' },
                { name: '【中国邮政EMS】- 品牌宣传', vid: 'c0922ehtjud' },
                { name: '【云南省农村信用社】- 品牌宣传', vid: 's0922xokejs' },
            ]
        };
    },
    methods: {
        
    },
    mounted() {
        
    },
}
</script>

<style lang='less'>
.video-example {
    .video-iframe {
        width: 100%;
    }
    .title {
        font-size: 14/11rem;
        padding: 10px;
        margin-bottom: 15px;
    }
}
</style>