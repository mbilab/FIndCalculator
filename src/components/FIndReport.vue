<template lang="pug">
.-report
  .ui.container.segment
    i.close.icon.right.floated(@click='setPageShown("FIndCalculator")')
    doughnut-chart(v-if='doughnutLoaded', :chartdata='doughnutdata', :options='options')
    .-tables
      table.ui.celled.structured.table
        thead
          tr
            th(colspan='2')  資產
        tbody(v-for='(value, key) in assets')
          tr
            td(@clck='this.assets[key]+=1000000') {{ key }}
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
    doughnutdata: {
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
        美股: 23423,
        台股: 23423,
        美債: 12344
      },

      debt: {
        貸款: 80000,
        信用卡: 3000,
        融資: 0
      },

      data: null,
      options: { responsive: true, maintainAspectRatio: false }
    }
  },
  methods: {
    ...mapMutations(['setTotalAssets', 'setPageShown']),
    randomAssets() {
      let ratios = Array.from({ length: Object.keys(this.assets).length }, v =>
        Math.random()
      )
      let sum = ratios.reduce((l, r) => l + r, 0)
      for (let asset in this.assets) {
        this.assets[asset] = Math.round(
          this.totalAssets * Number((ratios.pop() / sum).toFixed(1))
        )
      }

      let datasets = [
        {
          label: 'Assets',
          data: Object.values(this.assets),
          backgroundColor: ['Orange', 'Yellow', 'Green']
        }
      ]

      this.doughnutdata = {
        labels: Object.keys(this.assets),
        datasets: datasets
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
.right.floated
  position: absolute
  top:  1em
  right: 1em
</style>
