import { Doughnut, mixins } from 'vue-chartjs'
import 'chartjs-plugin-colorschemes'

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],

  activated() {
    this.renderChart(this.chartData, this.options)
  },

  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
