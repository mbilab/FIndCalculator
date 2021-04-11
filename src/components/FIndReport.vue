<template lang="pug">
.-report
  .ui.container.segment
    .ui.statistic(@click='setPageShown("FIndCalculator")')
      .value: a {{ totalAssets }}
      .label: a
        i.chart.line.icon
        | 總資產
    .ui.divider

    .-chart(ref='chart')
      doughnut-chart(v-if='doughnutLoaded' :chartdata='chartData' :options='chartOptions' :style='{ height: chartHeight + "px" }')

    .-tables
      table.ui.celled.compact.small.unstackable.table
        thead(@click='reportAsset'): tr: th(colspan='2'): a 資產
          i.file.alternate.outline.icon
        tbody
          tr(v-for='(value, key) in assets')
            td {{ key }}
            td {{ value }}
        tfoot
          tr
            th 合計
            th {{ totalAssets + 802605 }}
      table.ui.celled.compact.small.unstackable.table
        thead(@click='reportDebt'): tr: th(colspan='2'): a 負債
          i.file.alternate.outline.icon
        tbody
          tr(v-for='d in debt')
            td {{ d.name }}
            td {{ d.value }}
          tr
            td -
            td -
        tfoot
          tr
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

import DoughnutChart from './DoughnutChart.js'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'FIndReport',
  activated() {
    this.randomAssets()
    this.$nextTick(() => {
      this.chartHeight = this.$refs.chart.clientHeight
    })
  },
  components: {
    DoughnutChart
  },
  computed: {
    ...mapState(['_totalAssets']),

    totalAssets: {
      get() {
        return this._totalAssets
      },
      set(v) {
        this.setTotalAssets(v)
      }
    },

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
      assets: {
        存款: 0,
        證券: 0,
        信託: 0,
        債券: 0,
        自設資產: 0
      },
      chartHeight: 200,
      chartOptions: {
        maintainAspectRatio: false,
        plugins: { colorschemes: { scheme: 'brewer.PastelOne6' } },
        responsive: true
      },
      data: null,
      debt: [
        { name: '貸款', value: 800000 },
        { name: '信用卡款', value: 2605 },
        { name: '融資借款', value: '-' },
        { name: '自設負債', value: '-' }
      ]
    }
  },

  methods: {
    ...mapMutations(['setTotalAssets', 'setPageShown']),

    randomAssets() {
      let assets = Object.keys(this.assets).map(v => Math.random())
      let sum = assets.reduce((a, c) => a + c, 0)
      assets = assets.map(v =>
        Math.round((v / sum) * (this.totalAssets + 802605))
      )
      for (let asset in this.assets) this.assets[asset] = assets.pop()

      let datasets = [
        {
          label: 'Assets',
          data: Object.values(this.assets)
        }
      ]

      this.chartData = {
        labels: Object.keys(this.assets),
        datasets: datasets
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
  display: flex
  flex-direction: column
  height: calc(100vh - 5rem)
  justify-content: center
  margin-top: 1em
  text-align: center

.-chart
  flex: 1 1 auto
  position: relative

.-tables
  display: flex
  align-items: flex-start
  > table:nth-child(1)
    border-bottom-right-radius: 0
    border-top-right-radius: 0
  > table:nth-child(2)
    border-bottom-left-radius: 0
    border-left: 0
    border-top-left-radius: 0
  td:nth-child(2), tfoot th:nth-child(2)
    text-align: right

.ui.statistic
  margin: 0
  > .value
    font-size: 2rem !important

.ui.table
  margin-bottom: 0
  margin-top: 1em
</style>

<style lang="sass">
.-report-template
  text-align: left
</style>
