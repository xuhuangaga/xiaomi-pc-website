import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('xm-pc-user'),
    carNum: localStorage.getItem('xm-pc-carNum')
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    },
    setCarNum(state, data) {
      state.carNum = data
    }
  },
  actions: {
  },
  modules: {
  }
})
