<template>
    <div class="company-register">
        <header-bar name="开通企业视频彩铃"></header-bar>
        <div class="form-wrapper">
            <el-form ref="form" :model="form" label-width="145px" :rules="rules">
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
                <el-form-item label="邮箱" prop="email">
                    <el-input :readonly="isBind" v-model="form.email" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="上传员工授权协议" prop="agreement" multiple>
                    <fx-upload
                        :value.sync="form.agreement"
                        multiple
                        :disabled="isBind"
                        :tip="agreementTip">
                    </fx-upload>
                </el-form-item>
                <el-form-item label="协议框架下载">
                    <el-button @click="downloadAgreement" size="small" type="primary" plain>下载协议框架</el-button>
                    <a ref="downloadAgreement" href="http://mglyh.kmfx1.com/test.pdf" download style="display:none;"></a>
                </el-form-item>
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
    </div>
</template>

<script>
import FxUpload from '@/components/pc/upload.vue';
import HeaderBar from '@/components/pc/header-bar.vue';
import QRCode from 'qrcodejs2';
import config from '@/plugin/config.js'

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
    email: [
        { required: true, message: '请输入联系人邮箱', trigger: 'blur' },
    ],
    agreement: [
        { type: 'array', required: true, message: '请上传员工授权协议', trigger: 'change' },
    ],
}

export default {
    name: "CompanyRegister",
    components: {
        FxUpload, HeaderBar,
    },
    data() {
        return {
            rules,
            fileList: [],
            isBind: false,
            openDialog: false,
            qrcode: null,
            companyId: '',
            agreementTip: '下载<a href="http://mglyh.kmfx1.com/test.xls" download style="color:#2878ff">《员工协议模版》</a>，打印并填写完成后拍照上传',
            form: {
                company_name: '',
                business_number: '',
                business_license: [], // 上传营业执照
                email: '',
                contact_mobile: '',
                contact_name: '',
                legal_name: '',
                sign: [],  // 上传门头照片
                agreement: [],   // 上传员工协议
                card_positive: [],  // 身份证正面
                card_reverse: [],   // 身份证反面
            },
        };
    },
    methods: {
        onSubmit(formName) {
            console.log(this.form);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$fly.post('/api/company/register', this.form)
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
                    console.log('error submit!!');
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
        downloadAgreement() {
            this.$refs.downloadAgreement.click();
        }
    }
};
</script>

<style lang="less">
.company-register {
    .form-wrapper {
        max-width: 520px;
        margin: 0 auto;
        padding-bottom: 200px;
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
    
}
</style>