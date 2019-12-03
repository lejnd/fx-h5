<template>
<div class="header-bar">
    {{name}}
</div>
</template>

<script>
export default {
    name: 'HeaderBar',
    props: {
        name: {
            type: String,
            default: () => ''
        }
    },
    data() {
        return { 
        }
    }
}
</script>

<style lang="less">
.header-bar {
    height: 49px;
    border-bottom: 1px solid #E0E6ED;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    background-color: #fff;
}
</style>