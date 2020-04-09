<template>
    <div class="header-part-container">
        <div class="header-left">
            <div class="header-logo" @click="toHome">
                <el-image :src="require('../../assets/img/logo1.png')" v-show="!collapse" style="width: 130px;height: 30px" fit="contain"></el-image>
                <el-image :src="require('../../assets/img/logo1.png')" v-show="collapse" style="width: 40px;height: 40px" fit="contain"></el-image>
            </div>
            <!--折叠按钮-->
            <div class="header-fold">
                <el-button type="primary" icon="el-icon-s-fold" v-show="!collapse" @click="setCollapse"></el-button>
                <el-button type="primary" icon="el-icon-s-unfold" v-show="collapse" @click="setCollapse"></el-button>
            </div>
        </div>

        <div class="header-right">
            <!--设置按钮-->
            <div class="setting">
                <el-dropdown trigger="click">
                    <el-button type="primary" icon="el-icon-setting"></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-full-screen" @click.native="fullScreenToggle">全屏</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-user" @click.native="toResetPassword">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <!--用户按钮-->
            <div class="user">
                <el-dropdown trigger="click">
                    <el-button type="primary" style="font-size: 16px">{{userData.name}}</el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-switch-button" @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import screenfull from 'screenfull';
    import {mapMutations, mapState} from "vuex";

    export default {
        name: "HeaderPart",
        methods: {
            ...mapMutations(['setCollapse', 'setUserData']),
            //screenfull.js插件实现全屏切换
            fullScreenToggle() {
                if (screenfull.enabled) {
                    screenfull.toggle();
                } else {
                    this.$message.warning('浏览器不支持全屏');
                }
            },
            toHome() {
                this.$router.push('/app');
            },
            toResetPassword(){
                this.$router.push('/app/reset-password');
            },
            //退出登录
            logout() {
                if (this.websocket.close) {
                    this.websocket.close();
                }
                Cookies.remove('token');
                localStorage.removeItem('user');
                this.setUserData();
                this.$router.push('/login');
            }
        },
        computed: {
            ...mapState(['collapse', 'userData']),
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/main";

    .header-part-container {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;

        .header-left {
            display: flex;
            align-items: center;

            .header-logo {
                display: flex;
                align-items: center;

                &:hover {
                    cursor: pointer;
                }
            }

            .header-fold {
                margin-left: 10px;

                .el-button {
                    height: 40px;
                    font-size: 18px;
                    padding: 0 15px;
                }
            }
        }

        .header-right {
            display: flex;
            align-items: center;

            .el-button {
                height: 40px;
                font-size: 18px;
                padding: 0 15px;
            }
        }
    }
</style>
