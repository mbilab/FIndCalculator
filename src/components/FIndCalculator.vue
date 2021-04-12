<template lang="pug">
.-calculator.ui.container.form.segment

  h2.ui.header(v-show='!initialized') 歡迎來到 MOORE，幫您實現財務自由的好夥伴，立刻開始體驗吧！

  //.ui.input(:class='inputClass')
    .ui.orange.label 初始資產
    input(v-model.number='initAsset' type='number')
  .ui.input(:class='inputClass')
    .ui.orange.label 每月存入
    input(v-model.number='monthlyDeposit' type='number')
  .ui.input(:class='inputClass')
    .ui.orange.label 退休開支
    input(v-model.number='monthlySpending' type='number')
  button.ui.fluid.primary.button(v-if='!initialized' @click='plotPlan') Go!

  .-initialized(v-if='initialized')
    .ui.divider
    .ui.statistic(v-if='choices.length' @click='setPageShown("FIndReport")')
      .value: a {{ totalAsset }}
      .label: a #[i.pie.chart.icon]總資產
    .ui.statistic(v-else)
      .value {{ totalAsset }}
      .label 總資產
    br
    p 現在是 {{ year }} 年，想要投資什麼嗎？
    .ui.basic.fluid.tiny.buttons
      button.ui.button(v-for='v in investTargets' @click='choose(v)') {{ v }}
    .ui.divider

  .-chart(v-if='initialized' ref='chart')
    line-chart(:chart-data="chartData" :options='chartOptions' :style='{ height: chartHeight + "px" }')

</template>

<script>
import gaussian from 'gaussian'
import Swal from 'sweetalert2'

import LineChart from './LineChart'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'FIndCalculator',
  components: {
    LineChart
  },
  computed: {
    ...mapState(['totalAsset']),

    inputClass() {
      return {
        disabled: this.initialized,
        fluid: true,
        labeled: true,
        mini: this.initialized
      }
    },

    year() {
      return this.initYear + this.choices.length
    }
  },

  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          { data: [0], fill: false, label: '永豐表現', type: 'line' },
          { data: [0], fill: false, label: '平均表現', type: 'line' },
          { data: [], label: '投入資金' },
          { data: [], label: '計畫資產' }
        ]
      },
      chartOptions: {
        legend: { labels: { boxWidth: 12 } },
        maintainAspectRatio: false,
        plugins: {
          colorschemes: { reverse: true, scheme: 'brewer.OrRd5' }
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function(value, index, values) {
                  return Math.floor(value / 10000) + 'W'
                }
              }
            }
          ]
        }
      },
      chartHeight: 250,
      choices: [],
      initAsset: 0,
      initialized: false,
      initYear: 2000,
      investTargets: ['台股', '美股', '債券'],
      monthlyDeposit: 30000,
      monthlySpending: 50000,
      targetAsset: 10000000
    }
  },

  methods: {
    ...mapMutations(['setPageShown', 'setTotalAsset']),

    choose(target) {
      let historicalProfits = [
        { 台股: 0.23, 美股: 0.16, 債券: 0.08 },
        { 台股: 0.23, 美股: 0.29, 債券: 0.05 },
        { 台股: -0.09, 美股: -0.06, 債券: -0.02 },
        { 台股: 0.15, 美股: 0.2, 債券: 0.0 },
        { 台股: 0.11, 美股: 0.1, 債券: -0.01 },
        { 台股: -0.1, 美股: -0.01, 債券: -0.01 },
        { 台股: 0.08, 美股: 0.11, 債券: 0.03 },
        { 台股: 0.12, 美股: 0.3, 債券: -0.07 },
        { 台股: 0.09, 美股: 0.13, 債券: 0.01 },
        { 台股: -0.21, 美股: 0.0, 債券: 0.09 },
        { 台股: 0.1, 美股: 0.13, 債券: 0.04 },
        { 台股: 0.78, 美股: 0.23, 債券: -0.08 },
        { 台股: -0.46, 美股: -0.39, 債券: 0.11 },
        { 台股: 0.09, 美股: 0.03, 債券: 0.06 },
        { 台股: 0.19, 美股: 0.14, 債券: -0.02 },
        { 台股: 0.07, 美股: 0.03, 債券: -0.02 },
        { 台股: 0.04, 美股: 0.09, 債券: 0.0 },
        { 台股: 0.04, 美股: 0.26, 債券: -0.02 },
        { 台股: 0.04, 美股: -0.24, 債券: 0.09 },
        { 台股: 0.04, 美股: -0.14, 債券: 0.0 },
        { 台股: 0.04, 美股: -0.09, 債券: 0.09 }
      ]
      let i = this.choices.length
      let yearDeposit = this.monthlyDeposit * 12

      // sinopac
      let assets = this.chartData.datasets[0].data
      let profitMean = 0.1
      let profit = gaussian(profitMean, 0.02 ** 2).random(1)[0]
      if (assets[i] > this.targetAsset)
        assets.push(Math.floor(assets[i] * 1.06 - this.monthlySpending * 12))
      else assets.push(Math.floor((assets[i] + yearDeposit) * (1 + profit)))

      // other
      assets = this.chartData.datasets[1].data
      profitMean =
        i < historicalProfits.length ? historicalProfits[i][target] : 0.1
      profit = gaussian(profitMean - 0.02, 0.05 ** 2).random(1)[0]
      assets.push(Math.floor((assets[i] + yearDeposit) * (1 + profit)))

      this.setTotalAsset(assets[i + 1])
      this.choices.push(target)
      this.chartData = { ...this.chartData } // trigger re-draw
      if (assets[i + 1] > this.targetAsset) this.goal()
    },

    goal() {
      Swal.fire({
        imageHeight: 183,
        imageUrl:
          'https://img.ltn.com.tw/Upload/news/600/2018/11/23/phpbTcO8E.jpg',
        imageWidth: 275,
        text: this.initYear + this.choices.length + ' 年，一起邁向財務自由。',
        title: '發大財！'
      })
    },

    plotPlan() {
      let activeAssets = [this.initAsset]
      let assets = [this.initAsset]
      let i
      let labels = [this.initYear]
      let profit = 0.1
      let yearDeposit = this.monthlyDeposit * 12
      let yearSpending = this.monthlySpending * 12

      this.chartData.datasets[0].data[0] = this.initAsset
      this.setTotalAsset(this.initAsset)
      this.initialized = true
      this.targetAsset = yearSpending / 0.06

      for (i = 0; assets[i] < this.targetAsset; ++i) {
        activeAssets.push(activeAssets[i] + yearDeposit)
        assets.push(Math.floor((assets[i] + yearDeposit) * (1 + profit)))
        labels.push(labels[i] + 1)
      }
      for (let j = 0; j < 5; ++i, ++j) {
        activeAssets.push(activeAssets[i])
        assets.push(Math.floor(assets[i] * (1 + 0.06)) - yearSpending)
        labels.push(labels[i] + 1)
      }
      this.chartData.datasets[2].data = activeAssets
      this.chartData.datasets[3].data = assets
      this.chartData.labels = labels
      this.$nextTick(() => {
        this.chartHeight = this.$refs.chart.clientHeight
      })
    }
  },

  mounted() {
    return
    this.choose('台股')
    this.setPageShown('FIndReport')
  }
}
</script>

<style scoped lang="sass">
.ui.container
  display: flex
  flex-direction: column
  height: calc(100vh - 5rem)
  justify-content: center
  margin-top: 1em
  margin-bottom: 1em

.input
  margin-bottom: .2em

.primary.button
  margin-top: 1em

.-initialized
  text-align: center

.ui.statistic
  margin-top: 0
  > .value
    font-size: 2rem !important

p
  text-align: center

.-chart
  flex: 1 1 auto
  position: relative
</style>
