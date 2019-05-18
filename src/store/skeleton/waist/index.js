import { ajax } from '@/utils/ajax'
import { apiConstant } from '@/utils/common'

const skeletonWaist = {
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
      return result
    },
    async fetchSkeletonWaistPositionDetail({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonWaistPositionDetail}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
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
      return result
    },
    async fetchSkeletonWaistActiveRate({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataActiveRate, data)
      return result
    },
    async fetchSkeletonWaistBootNum({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataBootNum, data)
      return result
    },
    async fetchSkeletonWaistBootNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataBootNumDetail, data)
      return result
    },
    async fetchSkeletonWaistBootTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataBootTotal, data)
      return result
    },
    async fetchSkeletonWaistStepsNum({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataStepsNum, data)
      return result
    },
    async fetchSkeletonWaistStepsNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataStepsNumDetail, data)
      return result
    },
    async fetchSkeletonWaistStepsTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataStepsTotal, data)
      return result
    },
    async fetchSkeletonWaistBendNum({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataBendNum, data)
      return result
    },
    async fetchSkeletonWaistBendNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataBendNumDetail, data)
      return result
    },
    async fetchSkeletonWaistBendTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonWaistDataBendTotal, data)
      return result
    }
  }
}

export default skeletonWaist
