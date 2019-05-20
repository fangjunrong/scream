import { ajax } from '@/utils/ajax'
import { apiConstant } from '@/utils/common'

const skeletonButtock = {
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
    async fetchSkeletonButtockDeviceList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonButtockDeviceList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      return result
    },
    async changeSkeletonButtockDevice({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDeviceEdit, data)
      return result
    },
    async deleteSkeletonButtockDevice({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDeviceDelete, data)
      return result
    },
    async fetchSkeletonButtockPositionList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonButtockPositionList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      return result
    },
    async fetchSkeletonButtockPositionDetail({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonButtockPositionDetail}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      return result
    },
    async changeSkeletonButtockPosition({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockPositionEdit, data)
      return result
    },
    async deleteSkeletonButtockPosition({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockPositionDelete, data)
      return result
    },
    async fetchSkeletonButtockPersonList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonButtockPersonList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      return result
    },
    async changeSkeletonButtockPerson({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockPersonEdit, data)
      return result
    },
    async deleteSkeletonButtockPerson({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockPersonDelete, data)
      return result
    },
    async fetchSkeletonButtockDataList({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataList, data)
      return result
    },
    async fetchSkeletonButtockActiveRate({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataActiveRate, data)
      return result
    },
    async fetchSkeletonButtockBootNum({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataBootNum, data)
      return result
    },
    async fetchSkeletonButtockBootNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataBootNumDetail, data)
      return result
    },
    async fetchSkeletonButtockBootTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataBootTotal, data)
      return result
    },
    async fetchSkeletonButtockStepsNum({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataStepsNum, data)
      return result
    },
    async fetchSkeletonButtockStepsNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataStepsNumDetail, data)
      return result
    },
    async fetchSkeletonButtockStepsTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataStepsTotal, data)
      return result
    },
    async fetchSkeletonButtockSitNum({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataSitNum, data)
      return result
    },
    async fetchSkeletonButtockSitNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataSitNumDetail, data)
      return result
    },
    async fetchSkeletonButtockSitTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataSitTotal, data)
      return result
    },
    async fetchSkeletonButtockDurationNum({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataDurationNum, data)
      return result
    },
    async fetchSkeletonButtockDurationNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataDurationNumDetail, data)
      return result
    },
    async fetchSkeletonButtockDurationTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonButtockDataDurationTotal, data)
      return result
    }
  }
}

export default skeletonButtock
