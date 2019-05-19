import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate' // localStorage存储持久化
import user from './user/index'
import climb from './climb/index'
import skeletonWaist from './skeleton/waist/index'
import skeletonArm from './skeleton/arm/index'
import skeletonButtock from './skeleton/buttock/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {

  },
  getters: {

  },
  modules: {
    user,
    climb,
    skeletonWaist,
    skeletonArm,
    skeletonButtock
  }
})

export default store
