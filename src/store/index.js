import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // localStorage存储持久化
import user from './user/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {

  },
  getters: {

  },
  modules: {
    user
  }
})

export default store
