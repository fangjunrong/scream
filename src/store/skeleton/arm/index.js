import { ajax } from '@/utils/ajax'
import { apiConstant } from '@/utils/common'

const skeletonArm = {
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
    async fetchSkeletonArmDeviceList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonArmDeviceList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      return result
    },
    async changeSkeletonArmDevice({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDeviceEdit, data)
      return result
    },
    async deleteSkeletonArmDevice({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDeviceDelete, data)
      return result
    },
    async fetchSkeletonArmPositionList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonArmPositionList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      return result
    },
    async fetchSkeletonArmPositionDetail({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonArmPositionDetail}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      return result
    },
    async changeSkeletonArmPosition({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmPositionEdit, data)
      return result
    },
    async deleteSkeletonArmPosition({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmPositionDelete, data)
      return result
    },
    async fetchSkeletonArmPersonList({ commit }, data) {
      const result = await ajax.post(`${apiConstant.skeletonArmPersonList}?pageNumber=${data.pageNumber}&pageSize=${data.pageSize}`, data)
      return result
    },
    async changeSkeletonArmPerson({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmPersonEdit, data)
      return result
    },
    async deleteSkeletonArmPerson({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmPersonDelete, data)
      return result
    },
    async fetchSkeletonArmDataList({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataList, data)
      return result
    },
    async fetchSkeletonArmActiveRate({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataActiveRate, data)
      return result
    },
    async fetchSkeletonArmBootNum({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataBootNum, data)
      return result
    },
    async fetchSkeletonArmBootNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataBootNumDetail, data)
      return result
    },
    async fetchSkeletonArmBootTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataBootTotal, data)
      return result
    },
    async fetchSkeletonArmLiftNum({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataLiftNum, data)
      return result
    },
    async fetchSkeletonArmLiftNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataLiftNumDetail, data)
      return result
    },
    async fetchSkeletonArmLiftTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataLiftTotal, data)
      return result
    },
    async fetchSkeletonArmDurationNum({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataDurationNum, data)
      return result
    },
    async fetchSkeletonArmDurationNumDetail({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataDurationNumDetail, data)
      return result
    },
    async fetchSkeletonArmDurationTotal({ commit }, data) {
      const result = await ajax.post(apiConstant.skeletonArmDataDurationTotal, data)
      return result
    }
  }
}

export default skeletonArm
