<template lang="pug">
#app
  .-header
    h2.ui.header MOORE
  .-body: keep-alive: component(:is='page')
</template>

<script>
import 'semantic-ui-offline/semantic.css'
import FIndCalculator from '@/components/FIndCalculator.vue'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['page'])
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

body
  overflow: hidden
  width: 100vw

#app
  // font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  //! text-align: center
  //! color: #2c3e50

.-header
  background-color: white
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
</style>
