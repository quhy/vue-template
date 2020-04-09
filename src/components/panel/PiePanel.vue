<template>
    <div class="pie-panel-container">
        <el-card shadow="hover">
            <div class="card-header">
                <div class="header-title">
                    <span>券领用分类</span>
                </div>
            </div>


            <div class="card-main">
                <div id="piePanel"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "PiePanel",
        props: ['type'],
        data() {
            return {
                panelChart: {},
                panelData: [{
                    item: '事例一',
                    percent: 0.4
                }, {
                    item: '事例二',
                    percent: 0.21
                }, {
                    item: '事例三',
                    percent: 0.17
                }, {
                    item: '事例四',
                    percent: 0.13
                }, {
                    item: '事例五',
                    percent: 0.09
                }],
                total: 0
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (this.type === '1') {
                    this.onLand1();
                } else {
                    this.onLand2()
                }

            });
        },
        methods: {
            onLand1() {
                this.axios({
                    method: 'get',
                    url: '/coupon_use',
                }).then(res => {
                    if(res.data.data) {
                        this.panelData = res.data.data;
                        this.piePanel()
                    }

                });
            },
            onLand2() {
                let and = [];
                and.push('eq=coupon_info.coupon_type=2');
                and.push('eq=store_activity.store_id=' + JSON.parse(localStorage.getItem('user')).stores[0].id);
                and.push(`join=store_activity`);
                this.axios({
                    method: 'get',
                    url: '/appointment_record',
                    params: {
                        and: and,
                        sum: 1,
                        gb: ['store_activity.name']
                    }
                }).then(res => {
                    if(res.data.data) {
                        this.panelData = [];
                        res.data.data.forEach(item => {
                           this.total += item.Total;
                        });
                        res.data.data.forEach(info => {
                            this.panelData.push({
                                item: info.Group,
                                percent: (info.Total / this.total)
                            })
                        });
                        this.piePanel()
                    }
                });
            },
            piePanel() {
                this.panelChart = new G2.Chart({
                    container: 'piePanel',
                    forceFit: true,
                    height: 350,
                    padding: 'auto'
                });
                this.panelChart.source(this.panelData, {
                    percent: {
                        formatter: function formatter(val) {
                            val = val * 100 + '%';
                            return val;
                        }
                    }
                });
                this.panelChart.coord('theta', {
                    radius: 0.8
                });
                this.panelChart.legend({
                    position: 'left-top'
                });
                this.panelChart.intervalStack().position('percent').color('item').label('item');
                this.panelChart.render();
            }
        },
        computed: {
            ...mapState(['collapse'])
        },
        watch: {
            collapse() {
                setTimeout(() => {
                    //折叠动画渲染延迟
                    this.panelChart.forceFit();
                }, 500);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pie-panel-container {

    }
</style>
