import { ajax } from '@/utils/ajax'
import { apiConstant } from '@/utils/common'

const user = {
  namespaced: true,
  state: {
    userInfo: {},
    loginInfo: {}
  },

  mutations: {
    // setLoginInfo: (state, loginInfo) => {
    //   state.loginInfo = loginInfo
    // }
  },

  actions: {
    async fetchClimbDeviceList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.climbDeviceList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      // commit('setLoginInfo', result.data)
      return result
    }
  }
}

export default user
