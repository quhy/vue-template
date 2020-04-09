<template>
    <div class="line-panel-container">
        <el-card shadow="hover">
            <div class="card-header">
                <div class="header-title">
                    <span>公众号开通曲线</span>
                </div>
            </div>


            <div class="card-main">
                <div id="linePanel"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "LinePanel",
        data() {
            return {
                panelChart: {},
                panelData: [
                    {year: '1991', value: 3},
                    {year: '1992', value: 4},
                    {year: '1993', value: 3.5},
                    {year: '1994', value: 5},
                    {year: '1995', value: 4.9},
                    {year: '1996', value: 6},
                    {year: '1997', value: 7},
                    {year: '1998', value: 9},
                    {year: '1999', value: 13}
                ]
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.axios({
                    method: 'get',
                    url: '/stores?eq=app_state=3',
                    params: {
                        sum: '1',
                        gb: `DATE_FORMAT(app_open_time,'%Y-%m')`
                    }
                }).then(res => {
                  if(res.data.data) {
                      this.panelData = [];
                      res.data.data.forEach(item => {
                          this.panelData.push({
                              year: item.Group,
                              value: item.Total
                          })
                      });
                      this.linePanel();
                  }
                });
            });
        },
        methods: {
            linePanel() {
                this.panelChart = new G2.Chart({
                    container: 'linePanel',
                    forceFit: true,
                    height: 350,
                    padding: 'auto'
                });
                this.panelChart.source(this.panelData);
                this.panelChart.scale('value', {
                    min: 0
                });
                this.panelChart.scale('year', {
                    range: [0, 1]
                });
                this.panelChart.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                this.panelChart.line().position('year*value');
                this.panelChart.point().position('year*value')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    });
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

<style scoped>

</style>