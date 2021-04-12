import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    setPage: (state, v) => (state.page = v),
    setTotalAsset: (state, v) => (state.totalAsset = v)
  },
  state: {
    page: 'FIndCalculator',
    totalAsset: 0
  }
})
