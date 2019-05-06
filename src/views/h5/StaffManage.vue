<template>
<div class="staff-manage">
    <div class="banner">
        <img class="banner-bg" src="../../assets/image/banner.png" alt="">
        <div class="banner-con">
            <div class="text">{{companyName}}</div>
            <van-button class="banner-btn" @click="openQrcode" round type="info" size="normal">邀请员工开通</van-button>
        </div>
    </div>
    <div class="title-bar">
        <div class="title-bar-tag"></div>
        <div class="title-bar-text">员工管理</div>
    </div>
    <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="getList"
    >
        <div class="search-button" slot="action" @click="getList">搜索</div>
    </van-search>
    <div class="staff-list">
        <div class="staff-list-item" v-for="(item, index) in staffList" :key="index">
            <div class="staff-list-item-info">
                <div class="text name"><van-icon :class="item.sex=='女'?'woman-icon':'man-icon'" name="manager"/><span>{{item.real_name}}</span></div>
                <div class="text phone"><van-icon name="phone"/><span>{{item.mobile}}</span></div>
            </div>
            <van-button @click="deleteStaff(item.id)" round type="info" size="small" :disabled="item.status!=1">{{statusEnum(item.status)}}</van-button>
        </div>
    </div>
    <van-popup v-model="qrcodePop">
        <div class="pop-wrapper">
            <van-icon class="pop-close" @click="qrcodePop=false" name="close" />
            <div class="qrcode" ref="qrCodeUrl"></div>
            <div class="text">邀请员工开通二维码</div>
            <div class="text">截图转发给员工即可</div>
        </div>
    </van-popup>
    <van-popup v-model="errMsg" :close-on-click-overlay="false">
        <div class="tip-wrapper">
            <p class="err-msg">{{errMsg}}</p>
        </div>
    </van-popup>
    <van-popup v-model="auditPop" :close-on-click-overlay="false">
        <div class="tip-wrapper">
            <div class="audit-msg">
                <img src="../../assets/image/audit.png" alt="">
                <div class="text">
                    <p>审核中</p>
                    <p>请耐心等待...</p>
                </div>
            </div>
            <div class="audit-qr">
                <img :src="auditQr" alt="">
                <p>扫码查询审核状态</p>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
import QRCode from 'qrcodejs2';
import crypto from '@/plugin/crypto.js';
import config from '@/plugin/config.js'
import { mapGetters } from 'vuex';

export default {
    name: 'StaffManage',
    data() {
        return {
            keyword: '',
            qrcodePop: false,
            qrcode: null,
            staffList: [],
            errMsg: false,
            auditPop: false,
            auditQr: '',
            companyName: ''
        }
    },
    computed: {
        ...mapGetters([
            'openid'
        ])
    },
    methods: {
        getList() {
            this.$fly.post('/api/staff/index', {
                openid: this.openid,
                keyword: this.keyword
            }).then((res) => {
                let { errcode, errmsg, data, company_id, company_name } = res;
                if (errcode == 0 || errcode == 2) {
                    if (data) {
                        this.staffList = data || [];
                    }
                    this.companyName = company_name;
                } else if (errcode == 3) {
                    this.getAuditQrcode(company_id);
                    this.auditPop = true;
                } else {
                    this.error = true;
                    this.errMsg = errmsg;
                }
            })
        },
        deleteStaff(id) {
            this.$dialog.confirm({
                // title: '标题',
                message: '确认删除员工吗？',
                beforeClose: (action, done) => {
                    if (action === 'confirm') {
                        this.$fly.post('/api/staff/delete', {
                            staff_id: crypto.encrypt(id, config.secret.key, config.secret.iv)
                        }).then((res) => {
                            this.$toast(res.errmsg);
                            done();
                        })
                    } else {
                        done();
                    }
                }
            });
        },
        statusEnum(num) {
            let enums = {
                '1': '减员',
                '2': '已减员',
                '3': '待减员'
            }
            return enums[num]
        },
        openQrcode() {
            let { host } = config;
            this.qrcodePop = true;
            this.$nextTick(() => {
                if (!this.qrcode) {
                    this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
                        width: 130,
                        height: 130,
                        colorDark: '#000000',
                        colorLight: '#ffffff',
                        correctLevel: QRCode.CorrectLevel.H
                    })
                }
                this.qrcode.makeCode(`${host}/#/h5/staff_register`)
            })
        },
        getAuditQrcode(id) {
            this.$fly.post('/api/public/getTicket', {
                company_id: id
            }).then((res) => {
                let { errmsg, data, errcode } = res;
                if (errcode == 0) {
                    this.auditQr = data.url;
                } else {
                    this.$toast(errmsg);            
                }
            })
        }
    },
    mounted () {
        this.getList();
    }
}
</script>

<style lang="less">
.staff-manage {
    font-size: 14/11rem;
    .banner {
        width: 100%;
        height: 160px;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
        }
        .banner-con {
            font-size: 18/11rem;
            color: #fff;
            text-align: center;
            .banner-btn {
                margin-top: 15/11rem;
                width: 100%;
                // box-shadow: 0px 3px 1px #9cc1ff;
            }
        }
    }
    .title-bar {
        padding: 20/11rem 0;
        display: flex;
        font-size: 18/11rem;
        &-tag {
            width: 6px;
            background-color: #2878ff;
        }
        &-text {
            padding: 0 10/11rem;
        }
    }
    .van-search--show-action {
        padding-right: 15/11rem;
        padding-left: 15/11rem;
        .van-search__action {
            padding-right: 0;
        }
    }
    .van-search__content--round {
        border: 1/11rem solid #dddddd;
    }
    .search-button {
        border: 1/11rem solid #2878ff;
        padding: 0 12px;
        border-radius: 15px;
        line-height: 30px;
    }
    .staff-list {
        padding: 0 15/11rem;
        &-item {
            height: 69/11rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1/11rem solid #dddddd;
            &-info {
                display: flex;
                flex-flow: column;
                .text {
                    line-height: 1.8;
                    .van-icon {
                        margin-right: 5/11rem;
                        font-size: 15/11rem;
                        vertical-align: sub;
                    }
                    &.name {
                        color: #333333;
                        .woman-icon {
                            color: #FF62A5;
                        }
                        .man-icon {
                            color: #2878ff;
                        }
                    }
                    &.phone {
                        color: #999;
                        .van-icon {
                            color: #9cc1ff;
                        }
                    }
                }
            }
        }
    }
    .van-popup {
        background-color:rgba(0,0,0,0);
    }
    .pop-wrapper {
        width: 300/11rem;
        height: 270/11rem;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background-color: #fff;
        position: relative;
        .pop-close {
            font-size: 22/11rem;
            position: absolute;
            top: 0;
            right: 0;
            padding: 8px;
        }
        .qrcode {
            margin-bottom: 14/11rem;
        }
        .text {
            line-height: 1.5;
            font-size: 16/11rem;
        }
    }
    .tip-wrapper {
        background-color: #fff;
        padding: 20/11rem;
        border-radius: 10px;
        color: #666;
        font-size: 15/11rem;
        .audit-msg {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 35/11rem;
            }
            .text {
                padding-left: 10/11rem;
                p:first-child {
                    color: #333;
                }
            }
        }
        .audit-qr {
            padding-top: 20/11rem;
            text-align: center;
            p {
                padding: 10/11rem 0;
            }
        }
        .err-msg {
            text-align: center;
            white-space: nowrap;
        }
    }
}
</style>