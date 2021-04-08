<template lang="pug">
.-report
  .ui.container.segment
    doughnut-chart(:chartdata='doughnutdata', :options='options')
    .-tables
      table.ui.celled.structured.table
        thead
          tr
            th(colspan='2')  資產
        tbody(v-for='(value, key) in asssets')
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
    .label 總資產 123453
</template>

<script>
import DoughnutChart from './DoughnutChart.js'

export default {
  name: 'FIndReport',
  components: {
    DoughnutChart
  },
  data() {
    return {
      asssets: {
        a1: 1234124,
        a2: 23423,
        a3: 23423,
        a4: 23423,
        a5: 23423,
        a6: 23423
      },

      debt: {
        d1: 1234124,
        d2: 23423,
        d3: 23423,
        d4: 23423
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
