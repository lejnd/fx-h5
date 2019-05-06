<template>
    <div class="home">
        <div class="block">
            <router-link to="h5/staff_manage">员工管理</router-link>
        </div>
        <div class="block">
            <router-link to="h5/staff_register">员工注册</router-link>
        </div>
        <div class="block">
            <router-link to="pc/company_register">企业开通</router-link>
        </div>
        <div class="block">
            <router-link to="pc/nav_home">PC导航页</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="less">
    .home {
        .block {
            text-align: center;
            padding: 20px;
        }
    }
</style>