import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    setPageShown: (state, v) => (state.pageShown = v),
    setTotalAssets: (state, v) => (state._totalAssets = v)
  },
  state: {
    _totalAssets: 0,
    pageShown: 'FIndCalculator'
  }
})
