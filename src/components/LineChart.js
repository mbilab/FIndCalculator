import { Bar, mixins } from 'vue-chartjs'
import 'chartjs-plugin-colorschemes'

const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],

  props: {
    chartData: {
      default: null,
      type: Object
    },
    options: {
      default: null,
      type: Object
    }
  },

  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
