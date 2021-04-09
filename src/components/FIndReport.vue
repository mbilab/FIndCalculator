<template lang="pug">
.-report
  .ui.container.segment
    .ui.statistic(@click='setPageShown("FIndCalculator")')
      .value: a {{ totalAssets }}
      .label: a
        i.chart.line.icon
        | 總資產
    .ui.divider

    doughnut-chart(v-if='doughnutLoaded' :chartdata='chartData' :height='200' :options='chartOptions')

    .-tables
      table.ui.celled.compact.small.unstackable.table
        thead: tr: th(colspan='2') 資產
        tbody
          tr(v-for='(value, key) in assets')
            td {{ key }}
            td {{ value }}
        tfoot
          tr
            th 合計
            th {{ totalAssets + 802605 }}
      table.ui.celled.compact.small.unstackable.table
        thead: tr: th(colspan='2') 負債
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
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DoughnutChart from './DoughnutChart.js'

export default {
  name: 'FIndReport',
  activated() {
    this.randomAssets()
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

      debt: [
        { name: '貸款', value: 800000 },
        { name: '信用卡款', value: 2605 },
        { name: '融資借款', value: '-' },
        { name: '自設負債', value: '-' }
      ],

      data: null,
      chartOptions: {
        maintainAspectRatio: false,
        plugins: { colorschemes: { scheme: 'brewer.PastelOne6' } },
        responsive: true
      }
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

.right.floated
  position: absolute
  top:  1em
  right: 1em
</style>
