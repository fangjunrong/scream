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
    async fetchSkeletonWaistDeviceList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonWaistDeviceList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      // commit('setLoginInfo', result.data)
      return result
    },
    async changeSkeletonWaistDevice({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDeviceEdit, data)
      return result
    },
    async deleteSkeletonWaistDevice({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDeviceDelete, data)
      return result
    },
    async fetchSkeletonWaistPositionList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonWaistPositionList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      // commit('setLoginInfo', result.data)
      return result
    },
    async changeSkeletonWaistPosition({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistPositionEdit, data)
      return result
    },
    async deleteSkeletonWaistPosition({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistPositionDelete, data)
      return result
    },
    async fetchSkeletonWaistPersonList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonWaistPersonList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      // commit('setLoginInfo', result.data)
      return result
    },
    async changeSkeletonWaistPerson({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistPersonEdit, data)
      return result
    },
    async deleteSkeletonWaistPerson({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistPersonDelete, data)
      return result
    },
    async fetchSkeletonWaistDataList({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataList, data)
      // commit('setLoginInfo', result.data)
      return result
    }
  }
}

export default user
