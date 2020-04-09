<template>
    <div class="bar-panel-container">
        <el-card shadow="hover">
            <div class="card-header">
                <div class="header-title">
                    <span>{{panelName}}</span>
                </div>
            </div>


            <div class="card-main">
                <div :id="barId"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "BarPanel",
        props: ['panelName', 'barId', 'barList', 'title'],
        data() {
            return {
                panelChart: {},
                panelData: [
                ],
                chart: {}
            }
        },
        mounted() {
            this.barPanel();
        },
        methods: {
            barPanel() {
                const data = this.barList;
                this.chart = new G2.Chart({
                    container: this.barId,
                    forceFit: true,
                    height: 350,
                    padding: [ 20, 20, 50, 30 ]
                });
                this.chart.source(data);
                this.chart.scale('value', {
                    alias: this.title
                });
                this.chart.axis('name', {
                    label: {
                        textStyle: {
                            fill: '#aaaaaa'
                        }
                    },
                    tickLine: {
                        alignWithLabel: false,
                        length: 0
                    }
                });
                this.chart.legend(false);

                this.chart.interval().position('name*value').opacity(1)
                    .label('value', {
                        offset: 10,
                        textStyle: {
                            fill: '#595959',
                            fontSize: 12
                        }
                    });
                this.chart.render();
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
            },
            barList() {
                this.chart.changeData(this.barList);
            }
        }
    }
</script>

<style scoped>

</style>