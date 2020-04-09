<template>
    <div class="app-layout-container">
        <el-container>
            <!--头部-->
            <el-header>
                <HeaderInfo ref="headerInfo"></HeaderInfo>
            </el-header>

            <el-container>
                <el-aside :width="asideWidth">
                    <el-scrollbar class="scrollbar" ref="scrollbar">
                        <AsideMenu></AsideMenu>
                    </el-scrollbar>
                </el-aside>

                <el-main>
                    <!--二级路由-->
                    <div class="main-inside">
                        <router-view></router-view>
                    </div>
                    <!--回到顶部-->
                    <el-backtop target=".el-main"></el-backtop>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import HeaderInfo from "./components/HeaderPart.vue";
    import AsideMenu from "./components/AsidePart.vue";
    import {mapMutations, mapState} from "vuex";

    export default {

        name: "AppLayout",
        components: {
            HeaderInfo,
            AsideMenu
        },
        data() {
            return {}
        },
        mounted() {
            //屏蔽浏览器的全屏
            addEventListener("keydown", this.fullScreenToggle, false);
            this.setUserData();
        },
        destroyed() {
            removeEventListener("keydown", this.fullScreenToggle, false);
        },
        methods: {
            ...mapMutations(['setCollapse', 'setUserData']),
            fullScreenToggle(e) {
                if (e.key === 'F11') {
                    this.$refs.headerInfo.fullScreenToggle();
                    e.preventDefault();
                }
            },
        },
        computed: {
            ...mapState(['collapse', 'keepAliveList', 'routerRefresh']),
            asideWidth() {
                //侧边导航栏折叠宽度
                if (this.collapse) {
                    return '65px';
                } else {
                    return '200px';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../style/main";

    .app-layout-container {
        height: 100vh;
        overflow: hidden;

        .el-container {
            height: 100%;
            overflow: auto;
        }

        .el-header {
            background: $primary-color;
            padding: 0 20px;
            box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
            z-index: 10;
        }

        .el-aside {
            height: 100%;
            border-right: 1px solid #DCDFE6;
            transition: width 0.5s;
        }

        .el-main {
            padding: 0;
            background: whitesmoke;
            height: 100%;

            .main-tab {
                height: 51px;
                background: white;
                border-bottom: 1px solid #DCDFE6;
                overflow: hidden;
            }

            .main-inside {
                padding: 20px;
            }
        }
    }
</style>
