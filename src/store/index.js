import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    setTotalAssets: (state, v) => (state._totalAssets = v),
    setPageShown: (state, v) => (state.pageShown = v)
  },
  state: {
    _totalAssets: 0,
    pageShown: 'FIndCalculator'
  }
})
