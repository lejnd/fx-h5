<template>
    <div class="do-bind"></div>
</template>

<script>
import wxjs from '@/wxLogin';
import { mapGetters } from 'vuex';

export default {
    name: 'DoBind',
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters([
            'openid',
        ])
    },
    mounted () {
        this.$toast.loading({
            message: '绑定中...'
        });
        this.$fly.post('/api/company/manager_band', {
            openid: this.openid,
            company_id: this.$route.params.id
        }).then((res) => {
            let { errcode, errmsg } = res;
            if (errcode == 0) {
                this.$toast('绑定成功');
                this.$router.replace('/h5/staff_manage')
            } else {
                this.$toast('绑定失败');
                this.$router.replace(`/h5/errbind?msg=${errmsg}`)
            }
        }) 
    }
}
</script>

<style lang="less">
    
</style>