<template>
<div class="fx-upload">
    <el-upload
        class="upload-demo"
        action="/api/public/imgUpload"
        :before-remove="beforeRemove"
        :on-remove="onRemove"
        :multiple="multiple"
        :limit="limit"
        :on-exceed="handleExceed"
        :on-success="onSuccess"
        list-type="picture"
        :disabled="disabled"
    >
        <el-button size="small" type="primary" plain>点击上传</el-button>
        <slot></slot>
        <div slot="tip" class="el-upload__tip fx-tip" v-html="tip">{{tip}}</div>
    </el-upload>
</div>
</template>

<script>
import { log } from 'util';
    export default {
        name: '',
        props: {
            multiple: {
                type: Boolean,
                default: () => false
            },
            limit: {
                type: Number,
                default: () => 0
            },
            disabled: {
                type: Boolean,
                default: () => false
            },
            tip: {
                type: String,
                default: () => '只能上传jpg/png文件，且不超过500kb'
            },
            value: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                fileList: [],
            }
        },
        watch: {
            fileList(val) {
                this.$emit('update:value', val)
            }
        },
        methods: {
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            onRemove(file, fileList) {
                this.fileList = fileList
            },
            handleExceed(files, fileList) {
                this.$message.warning(`超出限制，这里最多上传 ${this.limit} 个文件`);
            },
            onSuccess(res) {
                let { data } = res;
                this.fileList.push(data.file)
            }
        }
    }
</script>

<style lang="less">
.fx-upload {
    .fx-tip {
        display: inline-block;
        margin-top: 0;
        margin-left: 5px;
    }
}
</style>