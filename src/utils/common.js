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
  climbDeviceList: '/sys/climb/deviceList',
  climbDeviceEdit: '/sys/climb/deviceEdit',
  climbDeviceDelete: '/sys/climb/deviceDelete',
  climbPositionList: '/sys/climb/positionList',
  climbPositionEdit: '/sys/climb/positionEdit',
  climbPositionDelete: '/sys/climb/positionDelete',
  climbDataList: '/sys/climb/stepList',
  // climbPositionEdit: '/sys/climb/positionEdit',
  // climbPositionDelete: '/sys/climb/positionDelete',
  skeletonWaistDeviceList: '/sys/carry/deviceList',
  skeletonWaistDeviceEdit: '/sys/carry/deviceEdit',
  skeletonWaistDeviceDelete: '/sys/carry/deviceDelete',
  skeletonWaistPositionList: '/sys/carry/positionList',
  skeletonWaistPositionEdit: '/sys/carry/positionEdit',
  skeletonWaistPositionDelete: '/sys/carry/positionDelete',
  skeletonWaistPersonList: '/sys/carry/personList',
  skeletonWaistPersonEdit: '/sys/carry/personEdit',
  skeletonWaistPersonDelete: '/sys/carry/personDelete',
  userList: '/sys/user/users',
  userEdit: '/sys/user/useredit',
  userDelete: '/sys/user/userdelete'
}

const common = {
  PathToChinese,
  apiConstant
}

export default common
