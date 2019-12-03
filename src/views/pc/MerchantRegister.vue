<template>
    <div class="company-register">
        <header-bar name="聚合商户"></header-bar>
        <div class="form-wrapper">
            <el-form ref="form" :model="form" label-width="145px" :rules="rules" label-position="top">
                <el-form-item label="上传电子效力声明" prop="statement" multiple>
                    <fx-upload
                        :value.sync="form.statement"
                        multiple
                        :disabled="isBind"
                        tip="">
                        <span class="example" @click="downStatement">下载签订盖章后上传</span>
                    </fx-upload>
                </el-form-item>
                <el-form-item label="营业执照" prop="business_license">
                    <fx-upload
                        :value.sync="form.business_license"
                        :limit="1"
                        :disabled="isBind"
                    ></fx-upload>
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
                <el-form-item label="商户类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择" @change="changeType">
                        <el-option
                            v-for="item in typeOpts"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="法人银行卡号" prop="legal_bank_no" v-if="form.type == '1'">
                    <el-input :readonly="isBind" type="number" v-model="form.legal_bank_no" placeholder="请输入"></el-input>
                </el-form-item> -->
                <el-form-item label="银行卡照片" prop="legal_bank_no" v-if="form.type == '1'">
                    <fx-upload
                        ref="legal_bank_no_upload"
                        :value.sync="form.legal_bank_no"
                        :limit="1"
                        :disabled="isBind"
                    ></fx-upload>
                </el-form-item>
                <el-form-item label="银行开户许可" prop="legal_bank_pic" v-if="form.type == '2'">
                    <fx-upload
                        ref="legal_bank_pic_upload"
                        :value.sync="form.legal_bank_pic"
                        :limit="1"
                        :disabled="isBind"
                    ></fx-upload>
                </el-form-item>
                <el-form-item label="联系人姓名" prop="contact_name">
                    <el-input :readonly="isBind" v-model="form.contact_name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="联系人手机号" prop="contact_mobile">
                    <el-input :readonly="isBind" v-model="form.contact_mobile" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="短信验证码" prop="code">
                    <div class="makeup">
                        <el-input placeholder="请输入短信验证码" v-model="form.code" :readonly="isBind"></el-input>
                        <sms-btn class="codeImg" :mobile="form.contact_mobile" url="/api/info/mobile_code"></sms-btn>
                    </div>
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
            title="提交成功"
            :show-close="false"
            :close-on-click-modal="false"
            :visible.sync="openDialog">
            <div class="qrcode">
                <img src="../../assets/image/success.png" alt="">
            </div>            
        </el-dialog>
        <el-dialog
            title="长按图片保存到相册"
            :visible.sync="statementDialog"
            top="5vh"
            class="statement-dialog">
            <div class="qrcode">
                <el-image
                style="width: 100%;"
                :src="statementImg"
                fit="cover"></el-image>
            </div>            
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
    // company_name: [
    //     { required: true, message: '请输入公司名称', trigger: 'blur' },
    // ],
    // business_number: [
    //     { required: true, message: '请输入营业执照号', trigger: 'blur' },
    // ],
    statement: [
        { type: 'array', required: true, message: '请上传电子效力声明', trigger: 'change' },
    ],
    business_license: [
        { type: 'array', required: true, message: '请上传营业执照', trigger: 'change' },
    ],
    // legal_name: [
    //     { required: true, message: '请输入法人姓名', trigger: 'blur' },
    // ],
    card_positive: [
        { type: 'array', required: true, message: '请上传法人身份证正面照', trigger: 'change' },
    ],
    card_reverse: [
        { type: 'array', required: true, message: '请上传法人身份证反面照', trigger: 'change' },
    ],
    type: [
        { required: true, message: '请选择商户类型', trigger: 'change' }
    ],
    legal_bank_no: [
        { type: 'array', required: true, message: '请上传银行卡照片', trigger: 'change' },        
    ],
    legal_bank_pic: [
        { type: 'array', required: true, message: '请上传银行开户许可', trigger: 'change' },
    ],
    contact_name: [
        { required: true, message: '请输入联系人姓名', trigger: 'blur' },
    ],
    contact_mobile: [
        { required: true, message: '请输入联系人手机号', trigger: 'blur' },
    ],
    code: [
        { required: true, message: '请输入短信验证码', trigger: 'blur' },
    ],
    // email: [
    //     { required: true, message: '请输入联系人邮箱', trigger: 'blur' },
    // ],
    // excel_url: [
    //     { type: 'array', required: true, message: '请上传员工列表', trigger: 'change' },
    // ],
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
            statementDialog: false,
            statementImg: require('../../assets/image/statement.jpg'),
            qrcode: null,
            companyId: '',
            // agreementTip: `下载<a href="${config.ip}/company.xls" download style="color:#2878ff">《员工协议模版》</a>，打印并填写完成后拍照上传`,            
            form: {
                statement: [],
                business_license: [], // 上传营业执照
                contact_mobile: '',
                code: '',
                contact_name: '',
                type: '',   // 1,个人； 2,公司
                legal_bank_no: [],
                legal_bank_pic: [],
                // agreement: [],   // 上传员工协议
                card_positive: [],  // 身份证正面
                card_reverse: [],   // 身份证反面
                // excel_url: [],
                // code: '',
            },
            codeImg: true,
            typeOpts: [
                { label: '个人', value: '1' },
                { label: '公司', value: '2' }
            ]
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
                    let req = this.form.type == '1' ? this.form : Object.assign({}, this.form, { legal_bank_no: this.form.legal_bank_pic });
                    this.$fly.post('/api/info/collect', req)
                    .then((res) => {
                        let { errcode, data, errmsg } = res;
                        if (errcode == 0) {
                            this.$message.success(errmsg);
                            this.companyId = data.company_id;
                            this.isBind = true;  
                            this.qrDialog();
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
            // let { host } = config;
            this.openDialog = true;
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
            //     this.qrcode.makeCode(`${host}/#/h5/dobind/${this.companyId}`)
            // })
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
        downStatement(e) {
            e.stopPropagation()
            this.statementDialog = true;
        },
        changeType() {
            if (this.$refs.legal_bank_no_upload) {
                this.$refs.legal_bank_no_upload.clearFiles();                
            }
            if (this.$refs.legal_bank_pic_upload) {
                this.$refs.legal_bank_pic_upload.clearFiles();
            }
        }
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
    background-color: #fff;
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
    .statement-dialog {
        .el-dialog {
            width: 90%;
        }
        .el-dialog__body {
            padding: 0;
        }
        .el-dialog__header {
            border-bottom: 1px solid #f5b014;
        }
        .el-dialog__title {
            font-size: 22px;
            font-weight: 600;
            color: #f40;
        }
        .qrcode {
            padding: 0;
        }
    }
    .makeup {
        display: flex;
        height: 50px;
        align-items: center;
        .codeImg {
            width: 150px;
            height: 48px;
            cursor: pointer;
            // margin-top: -5px;
        }
    }
    .el-form-item {
        // border-bottom: 1px solid #ddd;
        .el-input__inner {
            // border: 0;
            height: 48px;
            line-height: 48px;
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
    .el-select {
        width: 100%;
    }
}
</style>