<template lang="pug">
#app
  .-header
    h2.ui.header Moore
  .-body
    FIndCalculator(v-if='pageShown=="claculator"')
    FIndReport(v-if='pageShown=="report"')
</template>

<script>
import 'semantic-ui-offline/semantic.css'
import FIndCalculator from '@/components/FIndCalculator.vue'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['pageShown'])
  },
  components: {
    FIndCalculator,
    FIndReport: () => import('./components/FIndReport.vue')
  }
}
</script>

<style lang="sass">
@import "./assets/variables.sass"
$header-height: 3rem

#app
  // font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  //! text-align: center
  //! color: #2c3e50

.-header
  background-color: white
  border-bottom: 1px solid rgba(34, 36, 38, 0.15)
  display: flex
  height: $header-height
  //justify-content: space-between
  justify-content: center
  position: fixed
  top: 0
  width: 100%
  z-index: 100

.-header > .ui.header
  line-height: $header-height
  padding: 0 1rem

.-nav-links
  display: flex
  align-items: center
  a
    padding: 0 1em

.-body
  height: 100vh
  padding-top: $header-height
</style>
