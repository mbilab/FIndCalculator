<template lang="pug">
#app
  .-header
    h2.ui.header Moore
    //.-nav-links
      router-link(to="/") Home
      router-link(to="/report") Report
  router-view.-body
</template>

<script>
import 'semantic-ui-offline/semantic.css'
export default {}
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
  justify-content: space-between
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
  overflow: auto
</style>
