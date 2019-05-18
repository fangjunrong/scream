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
      return result
    },
    async fetchClimbPositionDetail({ commit }, data) {
      const result = await ajax.post(`${apiConstant.climbPositionDetail}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
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
    async fetchClimbActiveRate({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataActiveRate, data)
      return result
    },
    async fetchClimbBootNum({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataBootNum, data)
      return result
    },
    async fetchClimbBootNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataBootNumDetail, data)
      return result
    },
    async fetchClimbBootTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataBootTotal, data)
      return result
    },
    async fetchClimbStepsNum({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataStepsNum, data)
      return result
    },
    async fetchClimbStepsNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataStepsNumDetail, data)
      return result
    },
    async fetchClimbStepsTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataStepsTotal, data)
      return result
    },
    async fetchClimbWeightNum({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataWeightNum, data)
      return result
    },
    async fetchClimbWeightNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataWeightNumDetail, data)
      return result
    },
    async fetchClimbWeightTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.climbDataWeightTotal, data)
      return result
    }
  }
}

export default user
