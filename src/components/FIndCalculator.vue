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
      .value 5,550
      .label 總資產
    .statistic
      .value 2000
      .label 現在時間

  line-chart(v-if="initialized" :chartdata="chartData" :options="chartOptions")

  button.ui.button(v-if="initialized" @click='goal') Goal!

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

    let historicalProfits = [
      { 台股: 0.23, 美股: 0.16, 美債: 0.08 },
      { 台股: 0.23, 美股: 0.29, 美債: 0.05 },
      { 台股: -0.09, 美股: -0.06, 美債: -0.02 },
      { 台股: 0.15, 美股: 0.2, 美債: 0.0 },
      { 台股: 0.11, 美股: 0.1, 美債: -0.01 },
      { 台股: -0.1, 美股: -0.01, 美債: -0.01 },
      { 台股: 0.08, 美股: 0.11, 美債: 0.03 },
      { 台股: 0.12, 美股: 0.3, 美債: -0.07 },
      { 台股: 0.09, 美股: 0.13, 美債: 0.01 },
      { 台股: -0.21, 美股: 0.0, 美債: 0.09 },
      { 台股: 0.1, 美股: 0.13, 美債: 0.04 },
      { 台股: 0.78, 美股: 0.23, 美債: -0.08 },
      { 台股: -0.46, 美股: -0.39, 美債: 0.11 },
      { 台股: 0.09, 美股: 0.03, 美債: 0.06 },
      { 台股: 0.19, 美股: 0.14, 美債: -0.02 },
      { 台股: 0.07, 美股: 0.03, 美債: -0.02 },
      { 台股: 0.04, 美股: 0.09, 美債: 0.0 },
      { 台股: 0.04, 美股: 0.26, 美債: -0.02 },
      { 台股: 0.04, 美股: -0.24, 美債: 0.09 },
      { 台股: 0.04, 美股: -0.14, 美債: 0.0 },
      { 台股: 0.04, 美股: -0.09, 美債: 0.09 }
    ]
    let activeAssets = [this.initAsset]
    let assets = [this.initAsset]
    let choices = ['台股', '美股', '美債', '台股', '美股', '美債']
    choices.forEach((c, i) => {
      let profit = gaussian(historicalProfits[i][c], 0.01 ** 2).random(1)[0]
      let yearDeposit = this.monthlyDeposit * 12
      activeAssets.push(activeAssets[i] + yearDeposit)
      assets.push(Math.floor((assets[i] + yearDeposit) * (1 + profit)))
    })
    this.chartData.datasets[2].data = assets
  },

  methods: {
    ...mapMutations(['setTotalAssets']),

    goal() {
      this.totalAssets += 1000000
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
