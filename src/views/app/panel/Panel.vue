<template>
    <div class="app-panel-container">
        <div class="panel">
            <!--   门店    -->
            <el-row :gutter="20" v-if="userData.user_type ===4">
                <el-col :span="span" v-for="list in operatorList">
                    <el-card shadow="hover">
                        <div class="card-main">
                            <div class="left" :style="{background: list.color}">
                                <i class="el-icon-s-shop"></i>
                            </div>
                            <div class="right">
                                <h3>{{list.count}} {{list.unit ? list.unit : '条'}}</h3>
                                <p>{{list.name}}</p>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-if="userData.user_type ===4">
                <el-col :span="12">
                    <PiePanel  type="1"></PiePanel>
                </el-col>
                <el-col :span="12">
                    <LinePanel></LinePanel>
                </el-col>
            </el-row>

            <el-row :gutter="20" v-if="userData.user_type ===6">
                <el-col :span="span" v-for="list in settlementList">
                    <el-card shadow="hover">
                        <div class="card-main">
                            <div class="left" :style="{background: list.color}">
                                <i class="el-icon-s-shop"></i>
                            </div>
                            <div class="right">
                                <h3>{{list.count}} {{list.unit ? list.unit : '条'}}</h3>
                                <p>{{list.name}}</p>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-if="userData.user_type === 6">
                <el-col :span="12">
                    <BarPanel :panel-name="'服务券待领取表'" :bar-id="'PopupId'" :bar-list="insuranceList" :title="'优惠券(张)'"></BarPanel>
                </el-col>
                <el-col :span="12">
                    <BarPanel2 :panel-name="'核销结算'" :bar-id="'settlementId'" :bar-list="settlementForm" :title="'总金额(元)'"></BarPanel2>
                </el-col>
            </el-row>

            <el-row :gutter="20" v-if="userData.user_type ===5">
                <el-col :span="span" v-for="list in storeList">
                    <el-card shadow="hover">
                        <div class="card-main">
                            <div class="left" :style="{background: list.color}">
                                <i class="el-icon-s-shop"></i>
                            </div>
                            <div class="right">
                                <h3>{{list.count}} {{list.unit ? list.unit : '条'}}</h3>
                                <p>{{list.name}}</p>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-if="userData.user_type === 5">
                <el-col :span="12">
                    <BarPanel3 :panel-name="'未参与活动信息'" :bar-id="'activeId'"
                              :bar-list="activeFormList" :title="'数量'" url=""></BarPanel3>
                </el-col>
                <el-col :span="12">
                    <PiePanel2 type="2"></PiePanel2>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import PiePanel from "../../../components/panel/PiePanel.vue";
    import LinePanel from "../../../components/panel/LinePanel";
    import BarPanel from "../../../components/panel/BarPanel";
    export default {
        name: "Panel",
        components: {
            PiePanel,
            PiePanel2: PiePanel,
            LinePanel,
            BarPanel,
            BarPanel2: BarPanel,
            BarPanel3: BarPanel
        },
        computed: {
            ...mapState(['userData'])
        },
        data() {
            return {
                span: 6,
                operatorList: [
                    {id: 'storeCount', name: '门店待审核信息', count: 0, color: '#1890FF'},
                    {id: 'withdrawalsCount', name: '待处理提现申请', count: 0, color: '#2FC25B'},
                    {id: 'officialCount', name: '开通公众号申请', count: 0, color: '#FACC14'},
                    {id: 'moneyCount', name: '已提现金额', count: 0, color: '#F04864', unit: '元'},
                ], // 门店信息
                settlementList: [
                    {id: 'activeCount', name: '可参与活动', count: 0, color: '#1890FF'},
                    {id: 'popupCount', name: '未使用优惠券信息', count: 0, color: '#2FC25B'},
                    {id: 'usedPopupCount', name: '已使用优惠券信息', count: 0, color: '#FACC14'},
                    {id: 'settlementCount', name: '待核销确认信息', count: 0, color: '#F04864'},
                ], // 大B端
                storeList: [
                    {id: 'activeCount', name: '未参与活动', count: 0, color: '#1890FF'},
                    {id: 'usedActiveCount', name: '已参与活动', count: 0, color: '#2FC25B'},
                    {id: 'appointmentCount', name: '预约服务信息', count: 0, color: '#FACC14'},
                    {id: 'settlementCount', name: '服务结算信息', count: 0, color: '#F04864'},
                ], // 大B端
                insuranceList: [
                ], // 服务领取表数据
                settlementForm: [], // 待结算表数据
                activeFormList: [], // 未参与活动表
                storeId: ''
            }
        },
        mounted() {
            if (JSON.parse(localStorage.getItem('user')).stores && JSON.parse(localStorage.getItem('user')).stores.length !== 0) {
                this.storeId = JSON.parse(localStorage.getItem('user')).stores[0].id;
            }
            this.setSpan();
            // 加载运营端首页
            if (this.userData.user_type ===4) {
                this.getCount();
            }
            // 大B端首页
            if (this.userData.user_type === 6) {
                this.getCount2();
            }
            // 门店首页
            if (this.userData.user_type === 5) {
                this.getCount3();
            }
            this.openFullScreen2();
            window.addEventListener("resize", () => {
                this.setSpan();
            });
        },
        methods: {
            setSpan() {
                let width = document.body.clientWidth || document.documentElement.clientWidth;
                if (width > 1200) {
                    this.span = 6;
                } else if (width > 768) {
                    this.span = 12;
                } else {
                    this.span = 24;
                }
            },
            openFullScreen2() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close();
                }, 1000);
            },
            // 运营端
            getCount() {
                // 门店申请
                this.axios({
                    method: 'get',
                    url: '/stores?eq=state=1&pn=1&np=1',
                }).then(res => {
                    this.storeList[0].count = res.data.total;
                });
                // 提现申请
                this.axios({
                    method: 'get',
                    url: '/withdrawals?lt=state=2&pn=1&np=1',
                }).then(res => {
                    this.storeList[1].count = res.data.total;
                });
                // 公众号申请
                this.axios({
                    method: 'get',
                    url: '/stores?and=eq=whether_opening=1&and=eq=pay=2&pn=1&np=1',
                }).then(res => {
                    this.storeList[2].count = res.data.total;
                });
                // 提现金额
                this.axios({
                    method: 'get',
                    url: '/withdrawals?sum=amount',
                }).then(res => {
                    this.storeList[3].count = res.data.data.Sum;
                });
            },
            // 大B端
            getCount2() {
                // 可领取服务
                let and = [];
                let time = this.moment(new Date()).format('YYYY-MM-DD HH:MM:ss');
                and.push(`lt=start_time=${time}`);
                and.push(`gt=end_time=${time}`);
                this.axios({
                    method: 'get',
                    url: '/coupon?and=eq=state=2',
                    params: {
                        and: and,
                    }
                }).then(res => {
                    this.settlementList[0].count = res.data.total;
                    let data = [];
                    res.data.data.forEach(item => {
                        data.push({
                            name: item.name,
                            value: (item.coupon_number - item.last_number)
                        })
                    });
                    this.insuranceList = data
                });
                // 未使用优惠券
                this.axios({
                    method: 'get',
                    url: '/coupon_group_actives/' + JSON.parse(localStorage.getItem('user')).user_insurance_id,
                    params: {
                        gb: 'coupon_id',
                        and: and,
                        usage_state: 1,
                    }
                }).then(res => {
                    this.settlementList[1].count = res.data.total;
                });
                // 已使用优惠券
                this.axios({
                    method: 'get',
                    url: '/coupon_group_actives/' + JSON.parse(localStorage.getItem('user')).user_insurance_id,
                    params: {
                        gb: 'coupon_id',
                        and: and,
                        usage_state: 3,
                    }
                }).then(res => {
                    this.settlementList[2].count = res.data.total;
                });
                // 待确认
                this.axios({
                    method: 'get',
                    url: 'coupon_group_store/' + JSON.parse(localStorage.getItem('user')).user_insurance_id,
                    params: {
                        approval_state: 1,
                    }
                }).then(res => {
                    this.settlementList[3].count = res.data.total;
                });
                //已审核
                this.axios({
                    method: 'get',
                    url: 'coupon_group_store/' + JSON.parse(localStorage.getItem('user')).user_insurance_id,
                    params: {
                        approval_state: 2,
                        pn: 1,
                        np: 10,
                    }
                }).then(res => {
                    let data = [];
                    if (res.data.data) {
                        res.data.data.forEach(item => {
                            data.push({
                                name: item.name,
                                value: item.sum
                            })
                        });
                    }
                    this.settlementForm = data
                });
            },
            // 门店端
            getCount3() {
                // 未参与活动
                this.axios({
                    method: 'get',
                    url: '/coupon?and=eq=state=2',
                }).then((res) => {
                    this.storeList[0].count = res.data.total;
                    if (res.data.data) {
                        let data = [];
                        res.data.data.forEach(item => {
                            data.push({
                                name: item.name,
                                value: (item.coupon_number - item.last_number)
                            })
                        });
                        this.activeFormList = data;
                    }
                });
                // 已参与活动
                this.axios({
                    method: 'get',
                    url: '/store_coupons?and=eq=store_info_id=' + this.storeId,
                }).then((res) => {
                    this.storeList[1].count = res.data.total;
                });
                // 预约服务
                this.axios({
                    method: 'get',
                    url: '/appointment_record?and=eq=`appointment_record`.store_id=' + this.storeId + '&and=eq=store_state=1',
                }).then((res) => {
                    this.storeList[2].count = res.data.total;
                });
                // 结算
                this.axios({
                    method: 'get',
                    url: '/appointment_record?and=eq=`appointment_record`.store_id='+ this.storeId + '&and=eq=coupon_info.settlement=1&and=eq=store_state=4',
                }).then((res) => {
                    this.storeList[3].count = res.data.total;
                })
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import "../../../style/main";

    .app-panel-container {
        .el-row {
            margin-bottom: -20px;

            .el-col {
                margin-bottom: 20px;

                .el-card {
                    .card-main {
                        margin-top: 0;
                        display: flex;
                        height: 90px;

                        .left {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-grow: 1;

                            i {
                                color: white;
                                font-size: 28px;
                            }
                        }

                        .right {
                            width: 61.8%;
                            text-align: center;

                            h3 {
                                font-size: 20px;
                                margin: 20px 0 10px;
                            }

                            p {
                                font-size: 14px;
                                margin: 0;
                                color: #909399;
                            }
                        }
                    }

                    .el-card__body {
                        padding: 0;
                    }
                }
            }
        }
    }
</style>

