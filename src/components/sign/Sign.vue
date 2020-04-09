<template>
    <div class="sign-container">
        <!--登录和注册复用组件-->
        <div class="sign-box">
            <!--logo-->
            <div class="logo">
                <el-image :src="require('../../assets/img/logo1.png')" fit="contain"></el-image>
            </div>
            <!--表单-->
            <div class="form">
                <slot name="form"></slot>
            </div>
            <!--版权信息-->
            <div class="copyright">
                <p>
                    <span>Copyright &copy; 2019&nbsp;</span>
                    <el-link type="primary" href="http://www.tongwii.com" target="_blank" :underline="false">TongWII</el-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sign"
    }
</script>

<style lang="scss" scoped>
    @import "../../style/main";

    .sign-container {
        background: whitesmoke url('../../assets/img/background.svg') no-repeat center/cover;
        min-height: 100vh;
        overflow: hidden;

        .sign-box {
            max-width: 360px;
            margin: 15vh auto 50px;

            .logo {
                text-align: center;

                .el-image {
                    width: 250px;
                    height: 70px;
                    margin-bottom: 20px;
                }
            }

            .router-text {
                display: flex;
                justify-content: flex-end;
            }

            .copyright {
                text-align: center;
                font-size: 14px;
                color: #909399;

                p {
                    display: flex;
                    justify-content: center;
                }
            }
        }
    }
</style>
