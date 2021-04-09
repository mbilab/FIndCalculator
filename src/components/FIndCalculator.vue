<template lang="pug">
.-calculator.ui.container.segment(:class="{ '-initialized': initialized }")

  h2.ui.header(v-if="!initialized") 歡迎來到 Moore，幫助您實現財富自由的好夥伴，輸入後開始體驗吧！

  .-form
    br(v-if="!initialized")
    .ui.fluid.labeled.input(:class="{ disabled: initialized }")
      .ui.label 初始資產
      input(type="number" :value="initAsset" placeholder="0")
    .ui.fluid.labeled.input(:class="{ disabled: initialized }")
      .ui.label 每月存入
      input(tyue="number" :value="monthlyDeposit" placeholder="500000")
    .ui.fluid.labeled.input(:class="{ disabled: initialized }")
      .ui.label 退休開支
      input(tyue="number" :value="monthlySpending" placeholder="500000")
    br(v-if="!initialized")
    button.ui.fluid.primary.button(v-if="!initialized" @click='initialized = true') Go!

  .ui.statistics(v-if="initialized")
    .statistic
      .value {{ assets[assets.length - 1] }}
      .label 總資產
    .statistic
      .value {{ initYear + choices.length }}
      .label 現在時間

  br
  .ui.basic.fluid.buttons(v-if="initialized")
    button.ui.button(@click='choose("台股")') 台股
    button.ui.button(@click='choose("美股")') 美股
    button.ui.button(@click='choose("債券")') 債券

  line-chart(v-if="initialized" :chartdata="chartData" :options="chartOptions" ref="chart")

</template>

<script>
import gaussian from 'gaussian'
import LineChart from './LineChart'
import Swal from 'sweetalert2'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'FIndCalculator',
  components: {
    LineChart
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
    }
  },

  data() {
    return {
      assets: [0],
      chartData: {
        labels: [],
        datasets: [
          { data: [], label: '存入金額' },
          { data: [], label: '總資產' },
          { data: [], fill: false, label: '實際狀況', type: 'line' }
        ]
      },
      chartOptions: {
        maintainAspectRatio: false,
        plugins: { colorschemes: { scheme: 'brewer.YlOrRd3' } },
        responsive: true
      },
      choices: [],
      initAsset: 0,
      initialized: true,
      initYear: 2000,
      monthlyDeposit: 30000,
      monthlySpending: 50000,
      targetAsset: 10000000
    }
  },

  mounted() {
    this.plotPlan()
    this.choose('台股')
    this.choose('美股')
    this.choose('債券')
  },

  methods: {
    ...mapMutations(['setTotalAssets']),

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
      let profit = gaussian(historicalProfits[i][target], 0.1 ** 2).random(1)[0]
      let yearDeposit = this.monthlyDeposit * 12
      this.assets.push(
        Math.floor((this.assets[i] + yearDeposit) * (1 + profit))
      )
      this.choices.push(target)
      this.chartData.datasets[2].data = this.assets
      this.$refs.chart.redraw()
      if (this.assets[i + 1] > 10000000) this.goal()
    },

    goal() {
      Swal.fire({
        title: '發大財！',
        text: '一起走向財富自由',
        imageUrl:
          'https://img.ltn.com.tw/Upload/news/600/2018/11/23/phpbTcO8E.jpg',
        imageWidth: 275,
        imageHeight: 183,
        imageAlt: 'Custom image'
      })
    },

    plotPlan() {
      let asset = this.initAsset
      let activeAssets = [asset]
      let assets = [asset]
      let labels = [this.initYear]
      let profit = 0.1
      for (let i = 0; asset < this.targetAsset; ++i) {
        let yearDeposit = this.monthlyDeposit * 12
        activeAssets.push(activeAssets[i] + yearDeposit)
        asset = Math.floor((assets[i] + yearDeposit) * (1 + profit))
        assets.push(asset)
        labels.push(labels[i] + 1)
      }
      this.chartData.datasets[0].data = activeAssets
      this.chartData.datasets[1].data = assets
      this.chartData.labels = labels
    }
  }
}
</script>

<style scoped lang="sass">
.container
  display: flex
  flex-direction: column

.-form
  max-width: 25em !important
  flex-direction: column

.ui.segment
  display: flex
  height: calc(100vh - 5rem)
  justify-content: center
  margin-top: 1em
  margin-bottom: 1em
  &.-initialized
    display: inherit

.input
  margin-bottom: .2em

.ui.statistics
  justify-content: center

.ui .statistic > .value
  font-size: 2rem !important
</style>
