<template>
    <div class="aside-part-container">
        <div class="aside-title" v-show="!collapse">
            <p>五行养车后台管理系统</p>
        </div>

        <el-menu :default-active="$route.path" :collapse="collapse" unique-opened router>
            <el-menu-item-group v-show="!collapse">
                <span slot="title">主导航</span>
            </el-menu-item-group>

            <el-menu-item index="/app/panel">
                <i class="el-icon-data-line"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <!--             运维-->
            <!--            1门店收集员 2服务商 3自助录入 4管理员（运营）5门店管理员 6保险公司 7用户-->
            <template v-if="userData.user_type ===4||userData.account==='admin'">
                <el-menu-item-group v-show="!collapse">
                    <span slot="title">运营管理端</span>
                </el-menu-item-group>

                <el-submenu index="store">
                    <template slot="title">
                        <i class="el-icon-office-building"></i>
                        <span>门店管理</span>
                    </template>
                    <el-menu-item v-if="userData.role.rights.store_map.get" index="/app/store-map">门店展示</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.store_audit.get" index="/app/store-audit">门店审核</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.official_account.get" index="/app/official-account">公众号开通</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.store_list.get" index="/app/store-list">所有门店</el-menu-item>
                </el-submenu>

                <el-submenu index="insurance">
                    <template slot="title">
                        <i class="el-icon-trophy"></i>
                        <span>保险公司管理</span>
                    </template>
                    <el-menu-item v-if="userData.role.rights.insurance_list.get" index="/app/insurance-list">保险公司列表</el-menu-item>
                </el-submenu>

                <el-submenu index="account">
                    <template slot="title">
                        <i class="el-icon-user"></i>
                        <span>账号管理</span>
                    </template>
                    <el-menu-item v-if="userData.role.rights.operation_account.get" index="/app/operation-account">运营账号</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.store_account.get" index="/app/store-account">门店账号</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.insurance_account.get" index="/app/insurance-account">保险公司账号</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.role_list.get" index="/app/role-list">角色管理</el-menu-item>
                </el-submenu>

                <el-submenu index="service">
                    <template slot="title">
                        <i class="el-icon-medal-1"></i>
                        <span>服务/券管理</span>
                    </template>
                    <el-menu-item v-if="userData.role.rights.service_type_list.get" index="/app/service-type-list">服务类别</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.coupon_list.get" index="/app/coupon-list">专用券管理</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.confirm_coupon_list.get" index="/app/confirm-coupon-list">券服务确认</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.denial_coupon_list.get" index="/app/denial-coupon-list">券服务人工核对</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.abnormal_coupon_list.get" index="/app/abnormal-coupon-list">异常券列表</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.store_settlement.get" index="/app/store-settlement">门店结算</el-menu-item>
                </el-submenu>

                <el-submenu index="cash">
                    <template slot="title">
                        <i class="el-icon-wallet"></i>
                        <span>提现管理</span>
                    </template>
                    <el-menu-item v-if="userData.role.rights.withdrawals_approval.get" index="/app/withdrawals-approval">提现申请</el-menu-item>
                    <el-menu-item v-if="userData.role.rights.withdrawals_record.get" index="/app/withdrawals-record">提现记录</el-menu-item>
                </el-submenu>
            </template>
            <!--            门店-->
            <template v-if="userData.user_type ===5">
                <el-menu-item-group v-show="!collapse">
                    <span slot="title">门店端</span>
                </el-menu-item-group>

                <el-menu-item index="/app/custom-made">
                    <i class="el-icon-coin"></i>
                    <span slot="title">定制公众号</span>
                </el-menu-item>

                <el-menu-item index="/app/activities-promote">
                    <i class="el-icon-truck"></i>
                    <span slot="title">活动推广</span>
                </el-menu-item>

                <el-menu-item index="/app/apply-participation-active">
                    <i class="el-icon-notebook-1"></i>
                    <span slot="title">未参与活动</span>
                </el-menu-item>

                <el-menu-item index="/app/apply-attend-active">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">已参与活动</span>
                </el-menu-item>

                <el-menu-item index="/app/query-facility">
                    <i class="el-icon-search"></i>
                    <span slot="title">选择查询工具</span>
                </el-menu-item>

                <el-menu-item index="/app/reservation">
                    <i class="el-icon-receiving"></i>
                    <span slot="title">预约服务单</span>
                </el-menu-item>

                <el-menu-item index="/app/settlement">
                    <i class="el-icon-shopping-cart-1"></i>
                    <span slot="title">服务结算单</span>
                </el-menu-item>

                <el-menu-item index="/app/storeLists">
                    <i class="el-icon-office-building"></i>
                    <span slot="title">门店信息维护</span>
                </el-menu-item>

                <el-menu-item index="/app/car-owner-list">
                    <i class="el-icon-document-copy"></i>
                    <span slot="title">车主信息维护</span>
                </el-menu-item>
            </template>
            <!--            保险公司-->
            <template v-if="userData.user_type ===6">
                <el-menu-item-group v-show="!collapse">
                    <span slot="title">大B端</span>
                </el-menu-item-group>

                <el-menu-item index="/app/routeHome">
                    <i class="el-icon-medal-1"></i>
                    <span slot="title">领券中心</span>
                </el-menu-item>

                <el-menu-item index="/app/popup-center">
                    <i class="el-icon-document-copy"></i>
                    <span slot="title">优惠券中心</span>
                </el-menu-item>

                <el-menu-item index="/app/route-confirmation">
                    <i class="el-icon-document-copy"></i>
                    <span slot="title">领券确认</span>
                </el-menu-item>

                <el-menu-item index="/app/route-settlement">
                    <i class="el-icon-star-off"></i>
                    <span slot="title">结算核销</span>
                </el-menu-item>

                <el-menu-item index="/app/company-information">
                    <i class="el-icon-office-building"></i>
                    <span slot="title">公司信息</span>
                </el-menu-item>
            </template>

        </el-menu>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "AsidePart",
        methods: {},
        computed: {
            ...mapState(['collapse', 'userData'])
        }
    }
</script>

<style lang="scss" scoped>
    .aside-part-container {
        .aside-title {
            height: 40px;
            line-height: 40px;

            p {
                margin: 0;
                text-align: center;
                font-size: 14px;
                color: #909399;
            }
        }

        .el-menu {
            width: 100%;
            border: none;
            overflow: hidden;
            user-select: none;
        }
    }
</style>

<style lang="scss">
    .aside-part-container {
        .el-menu-item, .el-submenu__title {
            width: 100%;
            height: 40px;
            line-height: 40px;
        }
    }

    .el-menu--popup {
        .el-menu-item, .el-submenu__title {
            width: 100%;
            height: 40px;
            line-height: 40px;
        }
    }
</style>
