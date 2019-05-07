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
  climbDeviceDelete: '/sys/climb/deviceDelete'
}

const common = {
  PathToChinese,
  apiConstant
}

export default common
