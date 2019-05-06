<template>
<div class="nav-home">
    <div class="content">
        <div class="header">
            <img class="header-logo" src="../../assets/image/logoweb.png" alt="">
            <el-popover
                placement="bottom"
                trigger="click">
                <div class="qrcode" ref="qrCodeUrl"></div>                
                <el-button slot="reference" class="header-btn" round plain>员工管理</el-button>
            </el-popover>
        </div>
        <div class="main">
            <div class="welcome">
                <p class="welcome-en">WELCOME TO YOU</p>
                <p class="welcome-title">企业视频彩铃开通</p>
            </div>
            <div class="enter">
                <div class="enter-item" @click="gotoRegister(0)">
                    <img class="enter-item-bg" src="../../assets/image/btn-bg.png" alt="">
                    <div class="enter-item-text">
                        <h1 class="enter-item-text-name"><span>已开通</span>集团服务</h1>
                        <div class="enter-item-text-arrow">
                            <span>进入</span>
                            <img src="../../assets/image/arrow.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div class="enter-item" @click="gotoRegister(1)">
                    <img class="enter-item-bg" src="../../assets/image/btn-bg.png" alt=""> 
                    <div class="enter-item-text">
                        <h1 class="enter-item-text-name"><span>未开通</span>集团服务</h1>
                        <div class="enter-item-text-arrow">
                            <span>进入</span>
                            <img src="../../assets/image/arrow.png" alt=""/>
                        </div>
                    </div>                              
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<script>
import QRCode from 'qrcodejs2';
import config from '@/plugin/config.js'

export default {
    name: 'NavHome',
    data() {
        return {

        }
    },
    methods: {
        gotoRegister(type) {
            let types = {
                '0': 'simple_register',
                '1': 'company_register'
            }
            this.$router.push(`/pc/${types[type]}`)
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
                this.qrcode.makeCode(`${host}/#/h5/staff_manage`)
            })
        },
    },
    mounted () {
        this.openQrcode();
    }
}
</script>

<style lang="less">
.nav-home {
    background: url('../../assets/image/bg.png') no-repeat;
    background-size: cover;
    color: #323C5A;
    .content {
        min-height: 100vh;
        width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-flow: column;
        .header {
            display: flex;
            justify-content: space-between;
            padding-top: 30px;
            &-logo {
                height: 34px;
            }
            &-btn {
                color: #3B67F5;
                margin-right: 60px;
            }
        }
        .main {
            flex: 1;
            display: flex;
            flex-flow: column;
            justify-content: center;
            padding-bottom: 10%;
            .welcome {
                padding: 10px 0 10px 0;
                &-en {
                    color: #8591B0;
                    font-size: 26px;
                    font-weight: 300;
                }
                &-title {
                    font-size: 42px;
                    font-weight: 500;
                    padding: 20px 0;
                }
            }
            .enter {
                display: flex;
                &-item {
                    position: relative;
                    height: 307px;
                    cursor: pointer;
                    &-bg {
                        margin-left: -30px;
                    }
                    .enter-item-text {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-75%, -60%);
                        &-name {
                            font-size: 36px;
                            font-weight: 400;
                            padding: 30px 0;
                            span {
                                color: #317CFF;
                            }
                        }
                        &-arrow {
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            span {
                                font-size: 16px;
                                color: #3ab9ff;
                                margin-right: 6px;
                            }
                            img {
                                width: 9px;
                                height: 15px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
