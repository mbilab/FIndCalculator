<template lang="pug">
.-home
  .-container
    FIndCalculator
    //FIndReport
  .-rail
</template>

<script>
// @ is an alias to /src
import FIndCalculator from '@/components/FIndCalculator.vue'
import FIndReport from '@/components/FIndReport.vue'

export default {
  name: 'Home',
  components: {
    FIndCalculator,
    FIndReport
  }
}
</script>

<style scoped lang="sass"></style>
