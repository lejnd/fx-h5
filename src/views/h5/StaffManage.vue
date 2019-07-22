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
        <div class="title-bar-flex1">
            <!-- <van-icon class="addIcon" @click="openAddStaff" name="plus" /> -->
        </div>
        <van-button class="title-bar-upload" round icon="photo" type="info" size="small" @click="isShowUploader = true">上传协议</van-button>
        <!-- <van-button class="title-bar-upload" plain round icon="photo" type="info" size="small" @click="exampleDialog = true">上传示例</van-button> -->
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
            <!-- <div class="qrcode" ref="qrCodeUrl"></div> -->
            <img class="qrcode-img" :src="qrcodeImg" />
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
    <van-dialog
        v-model="addStaffModal"
        title="新增员工"
        show-cancel-button
        :before-close="addStaff">
        <div class="add-form">
            <van-cell-group>
                <van-field v-model="form.real_name" required placeholder="员工真实姓名" />
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="form.mobile" required placeholder="员工手机号" />
            </van-cell-group>
            <van-radio-group v-model="form.sex">
                <van-cell-group>
                    <van-cell title="男性" clickable @click="form.sex = '1'">
                        <van-radio name="1" />
                    </van-cell>
                    <van-cell title="女性" clickable @click="form.sex = '2'">
                        <van-radio name="2" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
            <van-cell-group>
                <van-field v-model="form.card_no" placeholder="员工身份证号" />
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="form.job" placeholder="员工职位" />
            </van-cell-group>
        </div>
    </van-dialog>
    <van-dialog
        class="upload-dialog"
        v-model="isShowUploader"
        title="上传协议"
        show-cancel-button
        :beforeClose="beforeCloseUpload"
    >
        <div class="upload-wp">
            <van-uploader
                multiple
                :after-read="afterRead">
                <van-button icon="photo" type="primary" size="small">点击上传图片</van-button>
            </van-uploader>
            <van-button class="title-bar-upload" plain round icon="photo" type="info" size="small" @click="exampleDialog = true">上传示例</van-button>

            <div class="pic-preview">
                <div class="pic-item" v-for="(item, index) in fileList" :key="index">
                    <img :src="'http://' + item" alt="">
                    <div class="delete" @click="deleteFile(index)"><van-icon name="close" /></div>
                </div>
            </div>
        </div>
    </van-dialog>
    <van-dialog
        class="example-dialog"
        v-model="exampleDialog"
        close-on-click-overlay
        confirm-button-text="一键复制文案"
        @confirm="copyText"
        data-clipboard-text='设置视频彩铃人员名单   昆明旭宏文化传有限公司承诺已知晓视频彩铃的业务资费，授权由咪咕公司为其员工开通批量VOLTE及视频彩铃功能，并加入媒体群组以实现广告的展示；员工的视频彩铃业务相关开通解释工作由所在企业负责完成。 （盖章）：公司公章'
    >
        <img src="../../assets/image/example2.png" alt="">
        <p class="example-text"><br>设置视频彩铃人员名单<br><br>昆明旭宏文化传有限公司承诺已知晓视频彩铃的业务资费，授权由咪咕公司为其员工开通批量VOLTE及视频彩铃功能，并加入媒体群组以实现广告的展示；员工的视频彩铃业务相关开通解释工作由所在企业负责完成。<br><br>（盖章）：公司公章</p>
    </van-dialog>
</div>
</template>

<script>
import QRCode from 'qrcodejs2';
import crypto from '@/plugin/crypto.js';
import config from '@/plugin/config.js';
import common from '@/components/common';
import { mapGetters } from 'vuex';

export default {
    name: 'StaffManage',
    data() {
        return {
            keyword: '',
            qrcodePop: false,
            qrcode: null,
            qrcodeImg: '',
            staffList: [],
            errMsg: false,
            auditPop: false,
            auditQr: '',
            companyName: '',
            companyId: '',
            addStaffModal: false,
            isShowUploader: false,
            exampleDialog: false,
            fileList: [],
            form: {
                real_name: '',
                mobile: '',
                sex: '1',
                card_no: '',
                job: '',
            }
        }
    },
    computed: {
        ...mapGetters([
            'openid'
        ])
    },
    methods: {
        getList() {
            const debug = process.env.NODE_ENV !== 'production'
            if (debug) return;
            this.$fly.post('/api/staff/index', {
                openid: debug ? 'o-Bg76EbkykeRdMGt7CC7YCccAn8' : this.openid,
                keyword: this.keyword
            }).then((res) => {
                let { errcode, errmsg, data, company_id, company_name, ticket_url } = res;
                // errcode: 0-成功并返回列表,1-未绑定企业联系人,2-暂无员工信息,3-审核中,4-审核未通过,5-暂无员工信息,9-参数非法
                if (errcode == 0 || errcode == 2 || errcode == 5) {
                    if (data) {
                        this.staffList = data || [];
                    }
                    this.companyName = company_name;
                    this.companyId = company_id;
                    this.qrcodeImg = ticket_url;
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
                '0': '待审核',
                '1': '减员',
                '2': '已减员',
                '3': '待减员',
                '5': '开通失败'
            }
            return enums[num]
        },
        openQrcode() {
            // let { host } = config;
            this.qrcodePop = true;
            // 生成二维码
            // this.$nextTick(() => {
            //     if (!this.qrcode) {
            //         this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
            //             width: 130,
            //             height: 130,
            //             colorDark: '#000000',
            //             colorLight: '#ffffff',
            //             correctLevel: QRCode.CorrectLevel.H
            //         })
            //     }
            //     this.qrcode.makeCode(`${host}/#/h5/staff_register/${this.companyId}`)
            // })
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
        },
        openAddStaff() {
            this.addStaffModal = true;
        },
        addStaff(action, done) {
            if (action == 'cancel') {
                done();
                this.form = {
                    real_name: '',
                    mobile: '',
                    sex: '1',
                    card_no: '',
                    job: '',
                };
                return false;
            }
            let tips = {
                '0': '请输入员工姓名',
                '1': '请输入手机号码',
                '2': '手机号码格式不正确'
            }
            let data = Object.assign({}, this.form, {
                company_id: this.companyId,
            })
            if (!data.real_name) {
                this.$notify(tips[0])
                done(false)
                return false
            }
            if (!data.mobile) {
                this.$notify(tips[1])
                done(false)
                return false
            }
            if (!common.isVerificationNumber(data.mobile)) {
                this.$notify(tips[2])
                done(false)
                return false
            }
            this.$fly.post('/api/staff/add_staff', data).then((res) => {
                let { errmsg, errcode } = res;
                this.$toast(errmsg);
                if (errcode == 0) {
                    done();
                    this.form = {
                        real_name: '',
                        mobile: '',
                        sex: '1',
                        card_no: '',
                        job: '',
                    };
                    this.getList();
                } else {
                    done(false)
                }
            }).catch(() => {
                this.$toast('请求错误！');
                done(false)
            })
        },
        //协议文件上传
        afterRead(file) {
            if (file.length) {
                file.forEach((item) => {
                    this.imgUpload(item);
                })
            } else {
                this.imgUpload(file);
            }
        },
        imgUpload(file) {
            let name = file.file.name;
            this.$fly.post('/api/public/imgUpload', common.obj2formdata(file))
            .then((res) => {
                console.log(res);
                let { errcode, errmsg, data } = res;
                if (errcode == 0) {
                    this.fileList.push(data.file)
                } else {
                    this.$toast(name + '上传失败')
                }
            })
        },
        deleteFile(index) {
            this.fileList.splice(index, 1);
        },
        beforeCloseUpload(action, done) {
            if (action === 'confirm') {
                this.$fly.post('/api/company/company_agreement', {
                    agreement: this.fileList,
                    company_id: this.companyId,
                }).then((res) => {
                    let { errcode, errmsg } = res;
                    this.$toast(errmsg);
                    if (errcode == 0) {
                        done()
                    } else {
                        done(false)
                    }
                })
            } else {
                done()
            }
        },
        copyText() {
            let clipboard = new this.clipboard(".example-dialog");
            clipboard.on('success', () => {
                this.$toast('复制成功');
            });
            clipboard.on('error', () => {
                this.$toast('复制失败');
            });
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
        align-items: center;
        font-size: 18/11rem;
        &-tag {
            width: 6px;
            height: 20/11rem;
            background-color: #2878ff;
        }
        &-text {
            padding: 0 10/11rem;
        }
        &-flex1 {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .addIcon {
                padding: 0 15/11rem;
                font-weight: 600;
                color: #777;
            }
        }
        &-upload {
            margin-right: 15/11rem;
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
        .qrcode-img {
            margin-bottom: 14/11rem;
            width: 130px;
            height: 130px;
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
    .van-dialog__header {
        padding: 10/11rem;
    }
    .van-dialog {
        width: 80%;
    }
    .add-form {
        padding: 10/11rem 20/11rem;
        background-color: #f2f3f5;
        .van-cell-group {
            margin-bottom: 6/11rem;
            border-radius: 10px;
            .van-cell {
                padding: 10/11rem 25/11rem;
                border-radius: 10px;
            }
        }
    }
    .upload-dialog {
        width: 90%;
        .upload-wp {
            padding: 15/11rem;
            padding-bottom: 20px;
            text-align: center;
            .pic-preview {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                .pic-item {
                    width: 80px;
                    height: 80px;
                    position: relative;
                    margin: 10px 5px 0 0;
                    border: 1px solid #dedede;
                    border-radius: 4px;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .delete {
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        right: 0;
                        top: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: rgba(0,0,0,0.4);
                        color: #fff;
                    }
                }
            }
        }
    }
    .example-dialog {
        .el-dialog__body {
            padding: 0;
        }
        .example-text {
            font-size: 10/11rem;
            padding: 0 15px;
            padding-bottom: 15px;
        }
    }
}
</style>