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
    },
    async changeClimbDevice({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDeviceEdit, data)
      return result
    },
    async deleteClimbDevice({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDeviceDelete, data)
      return result
    },
    async fetchClimbPositionList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.climbPositionList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      // commit('setLoginInfo', result.data)
      return result
    },
    async changeClimbPosition({ commit }, data) {
      const result = await ajax.post(apiConstant.climbPositionEdit, data)
      return result
    },
    async deleteClimbPosition({ commit }, data) {
      const result = await ajax.post(apiConstant.climbPositionDelete, data)
      return result
    },
    async fetchClimbDataList({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataList, data)
      // commit('setLoginInfo', result.data)
      return result
    }
  }
}

export default user
