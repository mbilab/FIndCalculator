<template lang="pug">
.-calculator.ui.container.segment
  .-form
    .ui.fluid.labeled.input
      .ui.label 初始資產
      input(type="number" :value="initAsset" placeholder="0")
    .ui.fluid.labeled.input
      .ui.label 每月存入
      input(tyue="number" :value="monthlyDeposit" placeholder="500000")
    .ui.fluid.labeled.input
      .ui.label 退休開支
      input(tyue="number" :value="monthlySpending" placeholder="500000")

  line-chart(:chartdata="chartData" :options="chartOptions")
  button.ui.button(@click='find') FInd!

</template>

<script>
import LineChart from './LineChart.js'
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
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
      initAsset: 0,
      initYear: 2000,
      monthlyDeposit: 50000,
      monthlySpending: 50000,
      chartOptions: { responsive: true, maintainAspectRatio: false }
    }
  },
  mounted() {
    let historicalProfits = [
      {
        台股: { mean: 0.1, stdev: 0.01 },
        美股: { mean: 0.1, stdev: 0.01 },
        美債: { mean: 0.1, stdev: 0.01 }
      },
      {
        台股: { mean: 0.1, stdev: 0.01 },
        美股: { mean: 0.2, stdev: 0.01 },
        美債: { mean: 0.1, stdev: 0.01 }
      },
      {
        台股: { mean: 0.1, stdev: 0.01 },
        美股: { mean: 0.1, stdev: 0.01 },
        美債: { mean: 0.1, stdev: 0.01 }
      },
      {
        台股: { mean: 0.1, stdev: 0.01 },
        美股: { mean: 0.1, stdev: 0.01 },
        美債: { mean: 0.1, stdev: 0.01 }
      },
      {
        台股: { mean: 0.1, stdev: 0.01 },
        美股: { mean: 0.1, stdev: 0.01 },
        美債: { mean: 0.1, stdev: 0.01 }
      }
    ]
    let activeAssets = [this.initAsset]
    let assets = [this.initAsset]
    let choices = ['台股', '美股', '美債']
    choices.forEach((c, i) => {
      let yearDeposit = this.monthlyDeposit * 12
      activeAssets.push(activeAssets[i] + yearDeposit)
      assets.push(
        (assets[i] + yearDeposit) * (1 + historicalProfits[i][c].mean)
      )
      console.log(activeAssets, assets)
    })
  },
  methods: {
    ...mapMutations(['setTotalAssets']),
    find() {
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
  height: calc(100vh - 5rem)
  margin-top: 1em
  margin-bottom: 1em

.input
  margin: .2em
</style>
