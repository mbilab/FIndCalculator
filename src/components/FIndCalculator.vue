<template lang="pug">
.-calculator
  .ui.container.segment
    .ui.labeled.input
      .ui.label 現在年齡
      input(type="number" placeholder="40")
    .ui.labeled.input
      .ui.label 退休年齡
      input(type="number" placeholder="65")

    .ui.divider

    .ui.labeled.input
      .ui.label 現在薪資
      input(type="number" placeholder="300000")
    .ui.labeled.input
      .ui.label 退休開支
      input(tyue="number" placeholder="600000")

    .ui.divider

    .ui.labeled.input
      .ui.label 每年投資金額
      input(type="number" placeholder="3600000")
    .ui.labeled.input
      .ui.label 累積退休資產
      input(type="number" placeholder="10000000")

    .ui.divider

    .ui.labeled.input
      .ui.label 高風險資產
      input(type="number" placeholder="10")
    .ui.labeled.input
      .ui.label 低風險資產
      input(type="number" placeholder="6")



</template>

<script>
export default {
  name: 'FIndCalculator'
}
</script>

<style scoped lang="sass">
.container
  max-width: 25em !important
  display: flex
  flex-direction: column

.input
  margin: .2em
</style>
