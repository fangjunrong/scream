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
  login: '/login'
}

const common = {
  PathToChinese,
  apiConstant
}

export default common
