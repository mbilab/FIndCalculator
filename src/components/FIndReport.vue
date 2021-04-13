<template lang="pug">
.-report.ui.container.segment
  .ui.statistic(@click='setPage("FIndCalculator")')
    .value: a {{ totalAsset }}
    .label: a
      i.chart.line.icon
      | 總資產
  .ui.divider

  .-chart(ref='chart')
    doughnut-chart(v-if='doughnutLoaded' :chart-data='chartData' :options='chartOptions' :style='{ height: chartHeight + "px" }')

  table.ui.celled.compact.small.unstackable.table
    thead: tr
      th(@click='reportAsset' colspan='2'): a 資產
        i.file.alternate.outline.icon
      th(@click='reportDebt' colspan='2'): a 負債
        i.file.alternate.outline.icon
    tbody
      tr(v-for='row in assets')
        td(v-for='cell in row') {{ cell }}
    tfoot
      tr
        th 合計
        th {{ totalAsset + 802605 }}
        th 合計
        th 802605

  #asset-report-template
    swal-title 資產面
    swal-html: .-report-template
      h3.ui.header 近半年
      p 平均收入 56,000，波動度 3%，繼續保持 #[i.heart.outline.icon]
      h3.ui.header 未來半年
      p 企業獲利正在逐步回到正常，應趁避險基金被迫賣股，股市不理性下跌時，買進基本面持續轉好的股市。

  #debt-report-template
    swal-title 負債面
    swal-html: .-report-template
      h3.ui.header 近半年
      p 平均支出 26,000，波動度 20%，記得穩定支出喔 #[i.meh.outline.icon]
      h3.ui.header 未來半年
      p 學期快開始了，小孩的學費也是一筆開銷，依據往年的記錄，建議預留 200,000 左右的資金。
</template>

<script>
import Swal from 'sweetalert2'
import { mapMutations, mapState } from 'vuex'

import DoughnutChart from './DoughnutChart.js'

export default {
  name: 'FIndReport',
  components: { DoughnutChart },

  activated() {
    this.randomAssets()
    this.$nextTick(() => {
      this.chartHeight = this.$refs.chart.clientHeight
    })
  },

  computed: {
    ...mapState(['totalAsset']),

    chartData: {
      get() {
        return this.data
      },
      set(v) {
        this.doughnutLoaded = false
        this.data = Object.assign({}, this.data, v)
        // Render doughnut at nextTick
        this.$nextTick(() => (this.doughnutLoaded = true))
      }
    }
  },

  data() {
    return {
      doughnutLoaded: true,
      assets: [
        ['存款', 0, '貸款', 8000000],
        ['證券', 0, '信用卡款', 2605],
        ['信託', 0, '融資借款', '-'],
        ['債券', 0, '自設負債', '-'],
        ['自設資產', 0, '-', '-']
      ],
      chartHeight: 200,
      chartOptions: {
        maintainAspectRatio: false,
        plugins: { colorschemes: { scheme: 'brewer.PastelOne6' } },
        responsive: true
      },
      data: null
    }
  },

  methods: {
    ...mapMutations(['setTotalAsset', 'setPage']),

    randomAssets() {
      let assets = this.assets.map(v => Math.random())
      let sum = assets.reduce((a, c) => a + c, 0)
      assets = assets.map(v =>
        Math.round((v / sum) * (this.totalAsset + 802605))
      )
      for (let asset of this.assets) asset[1] = assets.pop()

      this.chartData = {
        datasets: [{ data: this.assets.map(v => v[1]) }],
        labels: this.assets.map(v => v[0])
      }
    },

    reportAsset() {
      Swal.fire({ template: '#asset-report-template' })
    },

    reportDebt() {
      Swal.fire({ template: '#debt-report-template' })
    }
  }
}
</script>

<style scoped lang="sass">
.ui.segment
  text-align: center

.-chart
  flex: 1 1 auto
  position: relative

td:nth-child(even), tfoot th:nth-child(even)
  text-align: right

.ui.statistic
  margin: 0
  > .value
    font-size: 2rem !important

.ui.table
  margin-bottom: 0
  margin-top: 1em

#asset-report-template, #debt-report-template
  display: none
</style>

<style lang="sass">
.-report-template
  text-align: left
</style>
