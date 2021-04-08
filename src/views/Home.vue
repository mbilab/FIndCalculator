<template lang="pug">
.-home
  .-container
    FIndCalculator
    FIndChart
    FIndReport
  .-rail
</template>

<script>
// @ is an alias to /src
import FIndCalculator from '@/components/FIndCalculator.vue'
import FIndChart from '@/components/FIndChart.vue'
import FIndReport from '@/components/FIndReport.vue'

export default {
  name: 'Home',
  components: {
    FIndCalculator,
    FIndChart,
    FIndReport
  }
}
</script>
