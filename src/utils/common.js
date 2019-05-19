import Cookies from 'js-cookie'

export function getToken(key) {
  return Cookies.get(key)
}

export function setToken(key, value) {
  return Cookies.set(key, value)
}

export function removeToken(key) {
  return Cookies.remove(key)
}

export const PathToChinese = {
  'index': '首页'
}

export const apiConstant = {
  login: '/login',
  /*
  爬楼机
  */
  climbDeviceList: '/sys/climb/deviceList',
  climbDeviceEdit: '/sys/climb/deviceEdit',
  climbDeviceDelete: '/sys/climb/deviceDelete',
  climbPositionList: '/sys/climb/position',
  climbPositionDetail: '/sys/climb/positionDetail',
  climbPositionEdit: '/sys/climb/positionEdit',
  climbPositionDelete: '/sys/climb/positionDelete',
  climbDataActiveRate: '/sys/climb/activeRate',
  climbDataBootNum: '/sys/climb/bootNum',
  climbDataBootNumDetail: '/sys/climb/bootNumDetail',
  climbDataBootTotal: '/sys/climb/bootTotal',
  climbDataStepsNum: '/sys/climb/stepsNum',
  climbDataStepsNumDetail: '/sys/climb/stepsNumDetail',
  climbDataStepsTotal: '/sys/climb/stepsTotal',
  climbDataWeightNum: '/sys/climb/weightNum',
  climbDataWeightNumDetail: '/sys/climb/weightNumDetail',
  climbDataWeightTotal: '/sys/climb/weightTotal',
  // climbPositionEdit: '/sys/climb/positionEdit',
  // climbPositionDelete: '/sys/climb/positionDelete',
  /*
     腰部外骨骼
   */
  skeletonWaistDeviceList: '/sys/carry/deviceList',
  skeletonWaistDeviceEdit: '/sys/carry/deviceEdit',
  skeletonWaistDeviceDelete: '/sys/carry/deviceDelete',
  skeletonWaistPositionList: '/sys/carry/position',
  skeletonWaistPositionDetail: '/sys/carry/positionDetail',
  skeletonWaistPositionEdit: '/sys/carry/positionEdit',
  skeletonWaistPositionDelete: '/sys/carry/positionDelete',
  skeletonWaistPersonList: '/sys/carry/personList',
  skeletonWaistPersonEdit: '/sys/carry/personEdit',
  skeletonWaistPersonDelete: '/sys/carry/personDelete',
  skeletonWaistBendNum: '/sys/carry/bendNum',
  skeletonWaistDataActiveRate: '/sys/carry/activeRate',
  skeletonWaistDataBootNum: '/sys/carry/bootNum',
  skeletonWaistDataBootNumDetail: '/sys/carry/bootNumDetail',
  skeletonWaistDataBootTotal: '/sys/carry/bootTotal',
  skeletonWaistDataStepsNum: '/sys/carry/stepsNum',
  skeletonWaistDataStepsNumDetail: '/sys/carry/stepsNumDetail',
  skeletonWaistDataStepsTotal: '/sys/carry/stepsTotal',
  skeletonWaistDataBendNum: '/sys/carry/bendNum',
  skeletonWaistDataBendNumDetail: '/sys/carry/bendNumDetail',
  skeletonWaistDataBendTotal: '/sys/carry/bendTotal',
  /*
     手臂外骨骼
   */
  skeletonArmDeviceList: '/sys/arm/deviceList',
  skeletonArmDeviceEdit: '/sys/arm/deviceEdit',
  skeletonArmDeviceDelete: '/sys/arm/deviceDelete',
  skeletonArmPositionList: '/sys/arm/position',
  skeletonArmPositionDetail: '/sys/arm/positionDetail',
  skeletonArmPositionEdit: '/sys/arm/positionEdit',
  skeletonArmPositionDelete: '/sys/arm/positionDelete',
  skeletonArmPersonList: '/sys/arm/personList',
  skeletonArmPersonEdit: '/sys/arm/personEdit',
  skeletonArmPersonDelete: '/sys/arm/personDelete',
  skeletonArmBendNum: '/sys/arm/bendNum',
  skeletonArmDataActiveRate: '/sys/arm/activeRate',
  skeletonArmDataBootNum: '/sys/arm/bootNum',
  skeletonArmDataBootNumDetail: '/sys/arm/bootNumDetail',
  skeletonArmDataBootTotal: '/sys/arm/bootTotal',
  skeletonArmDataStepsNum: '/sys/arm/stepsNum',
  skeletonArmDataStepsNumDetail: '/sys/arm/stepsNumDetail',
  skeletonArmDataStepsTotal: '/sys/arm/stepsTotal',
  skeletonArmDataBendNum: '/sys/arm/bendNum',
  skeletonArmDataBendNumDetail: '/sys/arm/bendNumDetail',
  skeletonArmDataBendTotal: '/sys/arm/bendTotal',
  /*
     臀部外骨骼
   */
  skeletonButtockDeviceList: '/sys/hip/deviceList',
  skeletonButtockDeviceEdit: '/sys/hip/deviceEdit',
  skeletonButtockDeviceDelete: '/sys/hip/deviceDelete',
  skeletonButtockPositionList: '/sys/hip/position',
  skeletonButtockPositionDetail: '/sys/hip/positionDetail',
  skeletonButtockPositionEdit: '/sys/hip/positionEdit',
  skeletonButtockPositionDelete: '/sys/hip/positionDelete',
  skeletonButtockPersonList: '/sys/hip/personList',
  skeletonButtockPersonEdit: '/sys/hip/personEdit',
  skeletonButtockPersonDelete: '/sys/hip/personDelete',
  skeletonButtockBendNum: '/sys/hip/bendNum',
  skeletonButtockDataActiveRate: '/sys/hip/activeRate',
  skeletonButtockDataBootNum: '/sys/hip/bootNum',
  skeletonButtockDataBootNumDetail: '/sys/hip/bootNumDetail',
  skeletonButtockDataBootTotal: '/sys/hip/bootTotal',
  skeletonButtockDataStepsNum: '/sys/hip/stepsNum',
  skeletonButtockDataStepsNumDetail: '/sys/hip/stepsNumDetail',
  skeletonButtockDataStepsTotal: '/sys/hip/stepsTotal',
  skeletonButtockDataBendNum: '/sys/hip/bendNum',
  skeletonButtockDataBendNumDetail: '/sys/hip/bendNumDetail',
  skeletonButtockDataBendTotal: '/sys/hip/bendTotal',

  userList: '/sys/user/users',
  userEdit: '/sys/user/useredit',
  userDelete: '/sys/user/userdelete'
}

const common = {
  PathToChinese,
  apiConstant
}

export default common
