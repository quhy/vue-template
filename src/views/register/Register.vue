<template>
    <div class="register-container">
        <Sign>
            <template v-slot:form>
                <!--注册表单-->
                <el-form ref="form" :model="form" :rules="rules" :disabled="registerDisabled">
                    <el-form-item prop="name">
                        <el-input v-model="form.name" placeholder="请输入公司名"></el-input>
                    </el-form-item>
                </el-form>

                <div class="router-text">
                    <el-link type="primary" :underline="false" @click="toLogin">立即登录</el-link>
                </div>

                <PreviewDialog :previewDialog.sync="previewDialog" :imageUrl="imageUrl"></PreviewDialog>
            </template>
        </Sign>
    </div>
</template>

<script>
    import Sign from "../../components/sign/Sign.vue";

    export default {
        name: "Register",
        components: {
            Sign
        },
        data() {
            return {
                registerDisabled: false,
                licenseDisabled: false,
                previewDialog: false,
                imageUrl: '',
                form: {
                    name: '',
                    businessLicence: '',
                    creditCode: '',
                    corporation: '',
                    phone: '',
                    address: '',
                    addressFormat: '', // 格式化的地区，形如'11,1111,111111|省,市,区'
                    detailedAddress: ''
                },
                addressProps: {
                    value: 'code',
                    label: 'name'
                }
            }
        },
        methods: {
            register() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.registerDisabled = true;
                        this.axios({
                            method: 'post',
                            url: '/common/partner',
                            data: {
                                name: this.form.name,
                                businessLicence: this.form.businessLicence,
                                creditCode: this.form.creditCode,
                                corporation: this.form.corporation,
                                phone: this.form.phone,
                                address: this.form.addressFormat,
                                detailedAddress: this.form.detailedAddress
                            }
                        }).then(res => {
                            this.$message({
                                message: '注册成功，请等待审核',
                                type: 'success'
                            });
                            this.$router.push('/login');
                            this.registerDisabled = false;
                        }).catch(err => {
                            this.registerDisabled = false;
                        });
                    }
                });
            },
            toLogin() {
                this.$router.push('/login');
            }
        },
        computed: {
            rules() {
                //自定义表单验证
                return {
                    name: [
                        {required: true, message: '请输入公司名', trigger: 'blur'}
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .register-container {
        .el-form {
            .el-input, .el-button, .el-select {
                width: 100%;
            }

            .el-upload {
                .upload-placeholder {
                    color: #C0C4CC;
                    line-height: normal;
                    margin-top: 50px;
                    transform: translateY(-50%);

                    span {
                        display: block;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .register-container {
        .el-form {
            .el-cascader {
                width: 100%;
            }
        }
    }
</style>
