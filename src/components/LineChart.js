import { Bar, mixins } from 'vue-chartjs'
import 'chartjs-plugin-colorschemes'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
