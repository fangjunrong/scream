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
  skeletonArmDataActiveRate: '/sys/arm/activeRate',
  skeletonArmDataBootNum: '/sys/arm/bootNum',
  skeletonArmDataBootNumDetail: '/sys/arm/bootNumDetail',
  skeletonArmDataBootTotal: '/sys/arm/bootTotal',
  skeletonArmDataLiftNum: '/sys/arm/liftNum',
  skeletonArmDataLiftNumDetail: '/sys/arm/liftNumDetail',
  skeletonArmDataLiftTotal: '/sys/arm/liftTotal',
  skeletonArmDataDurationNum: '/sys/arm/durationNum',
  skeletonArmDataDurationNumDetail: '/sys/arm/durationNumDetail',
  skeletonArmDataDurationTotal: '/sys/arm/durationTotal',
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
  skeletonButtockDataActiveRate: '/sys/hip/activeRate',
  skeletonButtockDataBootNum: '/sys/hip/bootNum',
  skeletonButtockDataBootNumDetail: '/sys/hip/bootNumDetail',
  skeletonButtockDataBootTotal: '/sys/hip/bootTotal',
  skeletonButtockDataStepsNum: '/sys/hip/stepsNum',
  skeletonButtockDataStepsNumDetail: '/sys/hip/stepsNumDetail',
  skeletonButtockDataStepsTotal: '/sys/hip/stepsTotal',
  skeletonButtockDataDurationNum: '/sys/hip/durationNum',
  skeletonButtockDataDurationNumDetail: '/sys/hip/durationNumDetail',
  skeletonButtockDataDurationTotal: '/sys/hip/durationTotal',
  skeletonButtockDataSitNum: '/sys/hip/sitNum',
  skeletonButtockDataSitNumDetail: '/sys/hip/sitNumDetail',
  skeletonButtockDataSitTotal: '/sys/hip/sitTotal',

  userList: '/sys/user/users',
  userEdit: '/sys/user/useredit',
  userDelete: '/sys/user/userdelete'
}

export function getNowFormatDate() {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

const common = {
  PathToChinese,
  apiConstant
}

export default common
