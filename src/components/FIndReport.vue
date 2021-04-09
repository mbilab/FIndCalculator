<template lang="pug">
.-report
  .ui.container.segment
    doughnut-chart(:chartdata='doughnutdata', :options='options')
    .-tables
      table.ui.celled.structured.table
        thead
          tr
            th(colspan='2')  資產
        tbody(v-for='(value, key) in assets')
          tr
            td {{ key }}
            td {{ value }}
      table.ui.celled.structured.table
        thead
          tr
            th(colspan='2')  負債
        tbody(v-for='(value, key) in debt')
          tr
            td {{ key }}
            td {{ value }}
    .label 總資產 {{ totalAssets }}
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DoughnutChart from './DoughnutChart.js'

export default {
  name: 'FIndReport',
  mounted() {
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
    }
  },
  data() {
    return {
      assets: {
        美股: 23423,
        台股: 23423,
        美債: 12344
      },

      debt: {
        貸款: 80000,
        信用卡: 3000,
        融資: 0
      },

      doughnutdata: {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [40, 10, 40, 39, 40],
            backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue']
          }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false }
    }
  },
  methods: {
    ...mapMutations(['setTotalAssets']),
    randomAssets() {
      let ratios = Array.from({ length: Object.keys(this.assets).length }, v =>
        Math.random()
      )
      console.log('ratios')
      console.log(ratios)
      let sum = ratios.reduce((l, r) => l + r, 0)
      for (let asset in this.assets) {
        this.assets[asset] =
          this.totalAssets * Number((ratios.pop() / sum).toFixed(1))
      }
    }
  }
}
</script>

<style scoped lang="sass">
.-tables
  display: flex
  align-items: flex-start
.ui.table
  margin-top: 1em
</style>
