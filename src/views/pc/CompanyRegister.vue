<template>
    <div class="company-register">
        <header-bar name="开通企业视频彩铃"></header-bar>
        <div class="form-wrapper">
            <el-form ref="form" :model="form" label-width="145px" :rules="rules" label-position="top">
                <el-form-item label="公司名称" prop="company_name">
                    <el-input :readonly="isBind" v-model="form.company_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号" prop="business_number">
                    <el-input :readonly="isBind" v-model="form.business_number" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="营业执照" prop="business_license">
                    <fx-upload
                        :value.sync="form.business_license"
                        :limit="1"
                        :disabled="isBind"
                    ></fx-upload>
                </el-form-item>
                <el-form-item label="法人姓名" prop="legal_name">
                    <el-input :readonly="isBind" v-model="form.legal_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="法人身份证正面" prop="card_positive">
                    <fx-upload
                        :value.sync="form.card_positive"
                        :limit="1"
                        :disabled="isBind"
                    ></fx-upload>
                </el-form-item>
                <el-form-item label="法人身份证反面" prop="card_reverse">
                    <fx-upload
                        :value.sync="form.card_reverse"
                        :limit="1"
                        :disabled="isBind"
                    ></fx-upload>
                </el-form-item>
                <el-form-item label="门头照片" prop="sign">
                    <fx-upload
                        :value.sync="form.sign"
                        multiple
                        :limit="3"
                        tip="请上传 3 张门头照片"
                        :disabled="isBind"
                    ></fx-upload>
                </el-form-item>
                <el-form-item label="联系人姓名" prop="contact_name">
                    <el-input :readonly="isBind" v-model="form.contact_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系人手机号" prop="contact_mobile">
                    <el-input :readonly="isBind" v-model="form.contact_mobile" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="短信验证码" prop="mobile_code">
                    <div class="makeup">
                        <el-input placeholder="请输入短信验证码" v-model="form.mobile_code" :readonly="isBind"></el-input>
                        <sms-btn class="codeImg" :mobile="form.contact_mobile" url="/api/public/mobile_code"></sms-btn>
                    </div>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input :readonly="isBind" v-model="form.email" placeholder="请输入"></el-input>
                </el-form-item>
                <!-- <el-form-item label="上传员工授权协议" prop="agreement" multiple>
                    <fx-upload
                        :value.sync="form.agreement"
                        multiple
                        :disabled="isBind"
                        tip="">
                        <span class="example" @click="openExampleDialog">示范例图</span>
                    </fx-upload>
                </el-form-item> -->
                <!-- <el-form-item label="上传员工列表" prop="excel_url">
                    <fx-upload
                        :value.sync="form.excel_url"
                        action="/api/public/uploadExcel"
                        :limit="1"
                        :disabled="isBind"
                        list-type="text"
                        tip="请上传excel文件">
                    </fx-upload>
                </el-form-item> -->
                <!-- <el-form-item label="验证码" prop="code">
                    <div class="makeup">
                        <el-input placeholder="请输入验证码" v-model="form.code" :readonly="isBind"></el-input>
                        <img class="codeImg" v-if="codeImg" @click="checkCodeImg" src="/api/public/get_captcha" alt="点击切换">
                    </div>
                </el-form-item> -->
                <!-- <el-form-item label="协议框架下载">
                    <el-button @click="downloadAgreement" size="small" type="primary" plain>下载协议框架</el-button>
                    <a ref="downloadAgreement" href="http://mglyh.kmfx1.com/test.pdf" download style="display:none;"></a>
                </el-form-item> -->
                <el-form-item style="margin-top:50px;">
                    <el-button v-if="isBind" type="primary" @click="qrDialog()" style="width:100%;">扫码绑定</el-button>
                    <el-button v-else type="primary" @click="onSubmit('form')" style="width:100%;">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog
            title="微信扫码绑定管理员"
            :visible.sync="openDialog">
            <div class="qrcode" ref="qrCodeUrl"></div>            
        </el-dialog>
        <!-- <el-dialog
            class="example-dialog"
            :visible.sync="exampleDialog"
            width="95%"
            top="2vh"
            center>
            <img src="../../assets/image/example.png" alt="">
            <p class="example-text"><br>公司视频彩铃信息收集表<br><br>"乙方：  昆明旭宏文化传有限公司    承诺已知晓视频彩铃的业务资费，授权由咪咕公司为其员工开通VOLTE及视频彩铃功能，并加入媒体群组以实现广告的展示；员工的视频彩铃业务相关开通解释工作由所在企业负责完成。(员工资料填写完成后请打印并加盖企业公章，拍照上传。注：多张需要盖骑缝章)<br><br>（盖章）：公司公章"</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="exampleDialog = false">取 消</el-button>
                <el-button
                    class="example-btn"
                    type="primary"
                    @click="copyText"
                    data-clipboard-text='公司视频彩铃信息收集表 "乙方：  昆明旭宏文化传有限公司    承诺已知晓视频彩铃的业务资费，授权由咪咕公司为其员工开通VOLTE及视频彩铃功能，并加入媒体群组以实现广告的展示；员工的视频彩铃业务相关开通解释工作由所在企业负责完成。(员工资料填写完成后请打印并加盖企业公章，拍照上传。注：多张需要盖骑缝章) （盖章）：公司公章"'
                >复制文案</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import FxUpload from '@/components/pc/upload.vue';
import HeaderBar from '@/components/pc/header-bar.vue';
import SmsBtn from '@/components/pc/sms-button.vue';
import QRCode from 'qrcodejs2';
import config from '@/plugin/config.js'
import common from '@/components/common';

const rules = {
    company_name: [
        { required: true, message: '请输入公司名称', trigger: 'blur' },
    ],
    business_number: [
        { required: true, message: '请输入营业执照号', trigger: 'blur' },
    ],
    business_license: [
        { type: 'array', required: true, message: '请上传营业执照', trigger: 'change' },
    ],
    legal_name: [
        { required: true, message: '请输入法人姓名', trigger: 'blur' },
    ],
    card_positive: [
        { type: 'array', required: true, message: '请上传法人身份证正面照', trigger: 'change' },
    ],
    card_reverse: [
        { type: 'array', required: true, message: '请上传法人身份证反面照', trigger: 'change' },
    ],
    sign: [
        { type: 'array', required: true, message: '请上传门头照片', trigger: 'change' },
    ],
    contact_name: [
        { required: true, message: '请输入联系人姓名', trigger: 'blur' },
    ],
    contact_mobile: [
        { required: true, message: '请输入联系人手机号', trigger: 'blur' },
    ],
    mobile_code: [
        { required: true, message: '请输入短信验证码', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入联系人邮箱', trigger: 'blur' },
    ],
    // agreement: [
    //     { type: 'array', required: true, message: '请上传员工授权协议', trigger: 'change' },
    // ],
    excel_url: [
        { type: 'array', required: true, message: '请上传员工列表', trigger: 'change' },
    ],
    // code: [
    //     { required: true, message: '请输入验证码', trigger: 'blur' },
    // ],
}

export default {
    name: "CompanyRegister",
    components: {
        FxUpload, HeaderBar, SmsBtn,
    },
    data() {
        return {
            rules,
            fileList: [],
            isBind: false,
            openDialog: false,
            qrcode: null,
            companyId: '',
            // agreementTip: `下载<a href="${config.ip}/company.xls" download style="color:#2878ff">《员工协议模版》</a>，打印并填写完成后拍照上传`,            
            form: {
                company_name: '',
                business_number: '',
                business_license: [], // 上传营业执照
                email: '',
                contact_mobile: '',
                mobile_code: '',
                contact_name: '',
                legal_name: '',
                sign: [],  // 上传门头照片
                // agreement: [],   // 上传员工协议
                card_positive: [],  // 身份证正面
                card_reverse: [],   // 身份证反面
                // excel_url: [],
                // code: '',
            },
            codeImg: true,
            // exampleDialog: false,
        };
    },
    computed: {
        isWeiXin() {
            return common.isWeiXin();
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$fly.post('/api/company/register', this.form)
                    .then((res) => {
                        let { errcode, data, errmsg } = res;
                        if (errcode == 0) {
                            this.$message.success(errmsg);
                            this.companyId = data.company_id;
                            // 微信环境下直接跳转，非微信环境弹出二维码
                            if (this.isWeiXin) {
                                this.$router.push(`/h5/dobind/${this.companyId}`)
                            } else {
                                this.isBind = true;  
                                this.qrDialog();
                            }
                        } else {
                            this.$message.error(errmsg);
                        }
                    })
                } else {
                    this.$message.warning('填写信息不完整')
                    return false;
                }
            });
        },
        qrDialog() {
            let { host } = config;
            this.openDialog = true;
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
                this.qrcode.makeCode(`${host}/#/h5/dobind/${this.companyId}`)
            })
        },
        // downloadAgreement() {
        //     this.$refs.downloadAgreement.click();
        // },
        checkCodeImg() {
            this.codeImg = false;
            setTimeout(() => {
                this.codeImg = true;
            }, 0)
        },
        // openExampleDialog(e) {
        //     e.stopPropagation()
        //     this.exampleDialog = true;
        // },
        // copyText() {
        //     let clipboard = new this.clipboard(".example-btn");
        //     clipboard.on('success', (e) => {
        //         this.$message.success('复制成功');
        //     });
        //     clipboard.on('error', () => {
        //         this.$message.error('复制失败')
        //     });
        // }
    },
    mounted () {
        console.log(this.$route.params.id);
        
    }
};
</script>

<style lang="less">
.company-register {
    .form-wrapper {
        max-width: 520px;
        margin: 0 auto;
        padding: 0 20px;
        padding-bottom: 200px;
        .example {
            padding: 9px 20px;
            color: #409EFF;
        }
    }
    .el-dialog {
        text-align: center;
        min-width: 300px;
        max-width: 600px;
        .qrcode {
            display: flex;
            justify-content: center;
            padding-bottom: 40px;
        }
    }
    .makeup {
        display: flex;
        height: 50px;
        align-items: center;
        .codeImg {
            width: 150px;
            height: 40px;
            cursor: pointer;
            // margin-top: -5px;
        }
    }
    .el-form-item {
        // border-bottom: 1px solid #ddd;
        .el-input__inner {
            // border: 0;
        }
        .upload-demo {
            padding: 6px;
            border: 1px solid #DCDFE6;
            border-radius: 4px;
        }
    }
    .el-form--label-top .el-form-item__label {
        padding: 0;
    }
    .example-dialog {
        .el-dialog__body {
            padding: 0;
        }
        .example-text {
            padding: 0 15px;
            padding-bottom: 15px;
        }
    }
}
</style>