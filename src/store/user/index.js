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
    },
    async fetchUserList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.userList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      // commit('setLoginInfo', result.data)
      return result
    },
    async changeUser({ commit }, data) {
      const result = await ajax.post(apiConstant.userEdit, data)
      return result
    },
    async deleteUser({ commit }, data) {
      const result = await ajax.post(apiConstant.userDelete, data)
      return result
    }
  }
}

export default user
