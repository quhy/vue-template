<template>
    <div class="login-container">
        <Sign>
            <template v-slot:form>
                <!--登录表单-->
                <el-tabs v-model="activeForm" stretch>
                    <el-tab-pane label="账号登录" name="account">
                        <el-form v-if="activeForm === 'account'" ref="form" :model="form" :rules="rules"
                                 :disabled="loginDisabled">
                            <el-form-item prop="account">
                                <el-input v-model="form.account" prefix-icon="el-icon-user"
                                          placeholder="请输入账号"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="form.password" prefix-icon="el-icon-lock"
                                          placeholder="请输入密码" @keydown.enter.native="login('account')"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary"
                                           @click="login('account')" :loading="loginDisabled">
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="手机号登录" name="phone">
                        <el-form v-if="activeForm === 'phone'" ref="form" :model="form" :rules="rules" :disabled="loginDisabled">
                            <el-form-item prop="phone">
                                <el-input v-model="form.phone" prefix-icon="el-icon-mobile-phone" maxlength="11" show-word-limit
                                          placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <div class="code-form">
                                    <el-input v-model="form.code" prefix-icon="el-icon-message" placeholder="请输入验证码"
                                              @keydown.enter.native="login('phone')"></el-input>
                                    <el-button plain :disabled="codeDisabled" @click="sendCode" :loading="codeLoading">
                                        <span v-show="codeCount===0 && !codeLoading">获取验证码</span>
                                        <span v-show="codeLoading">获取中...</span>
                                        <span v-show="codeCount>0">稍等 {{codeCount}} 秒</span>
                                    </el-button>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="login('phone')" :loading="loginDisabled">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>

                <div class="router-text">
<!--                    <el-link type="primary" :underline="false" @click="toRegister">注册账号</el-link>-->
                </div>
            </template>
        </Sign>
    </div>
</template>

<script>
    import Sign from "../../components/sign/Sign.vue";
    import {mapMutations} from "vuex";

    export default {
        name: "Login",
        components: {
            Sign
        },
        data() {
            return {
                loginDisabled: false,
                activeForm: 'account',    //account或者phone
                codeCount: 0,   //倒计时为0时才可点击
                codeTimer: '',   //定时器
                codeLoading: false,
                form: {
                    phone: '',
                    account: '',
                    password: '',
                    code: '',
                }
            };
        },
        mounted() {
        },
        destroyed() {
            clearInterval(this.codeTimer);
        },
        methods: {
            ...mapMutations(['setUserData']),
            login(type) {
                let data;
                if (type === 'account') {
                    data = {
                        account: this.form.account,
                        password: this.form.password,
                    }
                } else if (type === 'phone') {
                    data = {
                        phone: this.form.phone,
                        captcha: this.form.code
                    }
                }
                this.$refs.form.validate(valid => {
                    if (valid) {
                        // 登陆接口
                        this.loginDisabled = true;
                        this.axios({
                            method: 'post',
                            url: '/login',
                            data: data
                        }).then(res => {
                            this.loginDisabled = false;
                            let user = res.data.data;
                            localStorage.setItem('user', JSON.stringify(user));
                            console.log(JSON.parse(localStorage.getItem('user')));
                            this.setUserData();
                            this.$router.push('/app');
                        }).catch(err => {
                            this.loginDisabled = false;
                        });
                    }
                });
            },
            toRegister() {
                this.$router.push('/register');
            },
            // 发送验证码
            sendCode() {
                this.codeLoading = true;
                this.axios({
                    method: 'post',
                    url: '/verification_code',
                    data: {
                        phone_number: this.form.phone
                    }
                }).then(res => {
                    this.codeLoading = false;
                    this.setCodeTimer();
                }).catch(err => {
                    this.codeLoading = false;
                });
            },
            //设置倒计时
            setCodeTimer() {
                clearInterval(this.codeTimer);
                this.codeCount = 60;
                this.codeTimer = setInterval(() => {
                    this.codeCount--;
                    if (this.codeCount === 0) {
                        clearInterval(this.codeTimer);
                    }
                }, 1000);
            },
        },
        computed: {
            rules() {
                let phoneReg = /^1[3-9]\d{9}$/;
                return {
                    phone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {pattern: phoneReg, message: '手机号码格式错误', trigger: 'blur'}
                    ],
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                };
            },
            codeDisabled() {
                let phoneReg = /^1[3-9]\d{9}$/;
                return !(phoneReg.test(this.form.phone) && this.codeCount === 0);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .login-container {
        .el-form {
            .el-input, .el-button, .el-select {
                width: 100%;
            }

            .code-form {
                display: flex;

                .el-input {
                    margin-right: 20px;
                }

                .el-image {
                    width: 128px;
                    height: 40px;
                    flex-shrink: 0;
                }

                .el-button {
                    width: 112px;
                }
            }
        }
    }
</style>
