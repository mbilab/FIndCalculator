<template lang="pug">
#app
  .-header
    h2.ui.header 智能帳房
    .-nav-links
      router-link(to="/") Home
      // router-link(to="/about") About
  router-view.-body
</template>

<script>
import 'semantic-ui-offline/semantic.css'
export default {}
</script>

<style lang="sass">
@import "./assets/variables.sass"
$headerheight: 3em

#app
  // font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

#nav
  padding: 30px

  a
    font-weight: bold
    color: #2c3e50

    &.router-link-exact-active
      color: #42b983
.-header
  position: fixed
  top: 0
  background-color: white
  height: $headerheight
  width: 100%
  display: flex
  justify-content: space-between
  z-index: 100
  border-bottom: 1px solid rgba(34, 36, 38, 0.15)

.ui.header
  line-height: 2em
  padding: 0 1em

.-nav-links
  display: flex
  align-items: center
  a
    padding: 0 1em

.-body
  margin-top: $headerheight
</style>
