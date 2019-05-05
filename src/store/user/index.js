import { ajax } from '@/utils/ajax'
import { removeToken } from '@/utils/common'

const user = {
  namespaced: true,
  state: {
    userInfo: {},
    loginInfo: {}
  },

  mutations: {
    setLoginInfo: (state, loginInfo) => {
      state.loginInfo = loginInfo
    },
    clearToken: (state, key) => {
      removeToken()
    }
  },

  actions: {
    async fetchLogin({ commit }, data) {
      const result = await ajax.get('auth/login', data)
      commit('setLoginInfo', result.data)
      return result
    }
  }
}

export default user
