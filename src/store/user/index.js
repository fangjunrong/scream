import { ajax } from '@/utils/ajax'
import { removeToken, apiConstant } from '@/utils/common'

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
      removeToken(key)
    }
  },

  actions: {
    async fetchLogin({ commit }, data) {
      const result = await ajax.post(apiConstant.login, data)
      commit('setLoginInfo', result.data)
      return result
    }
  }
}

export default user
