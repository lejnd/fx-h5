<template>
<div class='make-video bg-f5'>
    <section class="form-item">
        <h3 class="form-item-label">视频类型</h3>
        <van-dropdown-menu>
            <van-dropdown-item v-model="type" :options="typeOption" />
            <van-icon class="icon-right" name="arrow-down" />
        </van-dropdown-menu>
    </section>
    <section class="form-item">
        <h3 class="form-item-label">预期价位 <span class="deco">（{{priceText}}）</span></h3>
        <van-dropdown-menu>
            <span class="icon-left">¥</span>
            <van-dropdown-item v-model="price" :options="priceOption" />
            <van-icon class="icon-right" name="arrow-down" />
        </van-dropdown-menu>
        <!-- <p class="deco">（{{priceText}}）</p> -->
    </section>
    <section class="form-item">
        <h3 class="form-item-label">联系人手机号</h3>
        <van-cell-group>
            <van-field :value="contact_mobile" type="tel" readonly>
            </van-field>
        </van-cell-group>
    </section>
    <section class="form-item">
        <h3 class="form-item-label">其他</h3>
        <van-cell-group>
            <van-field v-model="remark" type="textarea" autosize placeholder="输入备注信息">
            </van-field>
        </van-cell-group>
    </section>
    <div class="btn-group">
        <van-button class="btn" type="info" @click="submit">提 交</van-button>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'MakeVideo',
    metaInfo: {
        title: '鲸彩云',
        titleTemplate: '%s - 视频制作',
    },
    components: {},
    data() {
        return {
            type: '企业宣传',
            price: '100-200',
            contact_mobile: '',
            company_id: '',
            remark: '',
            typeOption: [
                { text: '企业宣传', value: '企业宣传' },
                { text: '产品宣传', value: '产品宣传' },
                { text: '品牌宣传', value: '品牌宣传' }
            ],
            priceOption: [
                { text: '100-200', value: '100-200' },
                { text: '300-500', value: '300-500' },
                { text: '500-1000', value: '500-1000' },
                { text: '2000以上', value: '2000以上' },
                { text: '1万+', value: '1万+' },
            ]
        };
    },
    computed: {
        ...mapGetters([
            'openid'
        ]),
        priceText() {
            const obj = {
                '100-200': '图片素材+剪辑',
                '300-500': '简单拍摄＋剪辑',
                '500-1000': '拍摄＋剪辑',
                '2000以上': '精良拍摄＋剪辑',
                '1万+': '团队精良拍摄+后期制作＋剪辑'
            }
            return obj[this.price];
        }
    },
    methods: {
        getInfo() {
            this.$fly.post('/api/Video/company_info', {
                openid: this.openid,
            }).then((res) => {
                let { errcode, errmsg, data } = res;
                if (errcode == 0) {
                    this.contact_mobile = data.contact_mobile;
                    this.company_id = data.company_id;
                } else {
                    this.$dialog.alert({
                        message: errmsg,
                    })
                }
            })
        },
        submit() {
            if (!this.contact_mobile) {
                this.$notify('手机号为空，请先绑定联系人！')
                return false
            }
            this.$fly.post('/api/Video/video', {
                company_id: this.company_id,
                type: this.type,
                price: this.price,
                contact_mobile: this.contact_mobile,
                remark: this.remark
            }).then((res) => {
                let { errcode, errmsg, data } = res;
                if (errcode == 0) {
                    this.$toast(errmsg);
                    const msg = '下单成功，请保持手机畅通';
                    this.$router.push(`/h5/common_success?msg=${msg}`);
                } else {
                    this.$notify(errmsg);
                }
            })
        }
    },
    mounted() {
        this.getInfo();
    },
}
</script>

<style lang='less'>
.make-video {
    .form-item {
        &-label {
            margin: 0;
            font-weight: 400;
            font-size: 14px;
            color: #666;
            padding: 36px 15px 15px;
        }
        .van-dropdown-menu {
            justify-content: flex-start;
            flex-direction: row-reverse;
            align-items: center;
            padding: 0 20px;
            .van-dropdown-menu__item {
                justify-content: flex-start;
                .van-dropdown-menu__title::after {
                    display: none;
                }
            }
        }
        .icon-left {
            font-size: 16/11rem;
        }
        .icon-right {
            font-size: 16/11rem;
            position: absolute;
            right: 15px;
            pointer-events: none;
        }
    }
    .btn-group {
        padding: 40px 15px 0 15px;
        .btn {
            width: 100%;
        }
    }
}
</style>