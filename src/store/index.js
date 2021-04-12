import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    setPageShown: (state, v) => (state.pageShown = v),
    setTotalAsset: (state, v) => (state.totalAsset = v)
  },
  state: {
    pageShown: 'FIndCalculator',
    totalAsset: 0
  }
})
