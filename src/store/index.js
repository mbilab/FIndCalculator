import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  mutation: {
    setTotalAssets: (state, v) => (state.totalAssets = v)
  },
  state: {
    _totalAssets: 9000000
  }
})
