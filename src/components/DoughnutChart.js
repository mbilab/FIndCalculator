import { Doughnut } from 'vue-chartjs'
import 'chartjs-plugin-colorschemes'

export default {
  extends: Doughnut,
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
