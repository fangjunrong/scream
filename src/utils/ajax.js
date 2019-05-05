import axios from 'axios' // 引入axios
// import qs from 'qs' // 引入qs
import Cookies from 'js-cookie'
import router from '@/router/index'
import { Loading } from 'element-ui'
import { Message } from 'element-ui'

// axios 默认配置 更多配置查看Axios中文文档
axios.defaults.timeout = 10000 // 超时默认值
axios.defaults.baseURL = process.env.BASE_URL // 默认baseURL
axios.defaults.responseType = 'json' // 默认数据响应类型
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = false // 表示跨域请求时是否需要使用凭证

// http request 拦截器
// 在ajax发送之前拦截
// 先获取是否有cookie或者stroge的author认证。读取的到的话，就添加到header，没有的话，就返回重新登录
axios.interceptors.request.use(config => {
  var userToken = Cookies.get('UserToken') ? Cookies.get('UserToken') : ''
  config.headers.common['Authorization'] = userToken
  return config
}, err => {
  return Promise.reject(err)
})
// 统一错误信息提示
function errorMsg(response) {
  var tipMes = ''
  switch (response.code) {
    case 'ECONNABORTED':
      tipMes = '登录超时，请重试'
      break
    case 'TokenExpired':
    case 'Unauthorized':
      tipMes = response.message + ',请重新登录'
      router.push('/static/nopermt?type=relogin')
      break
    case 'BadRequest':
    case 'InvalidParameter':
      tipMes = response.message + '，请检查相应数据是否正确'
      break
    case 'UserLocked':
      tipMes = response.message + '，请联系管理员'
      break
    case 'Forbidden':
    case 'ServerError':
      tipMes = response.message
      break
    default:
      tipMes = response.message
      break
  }
  return tipMes
}
function succMsg(response) {
  response = response.data
  var succMes = ''
  var noAlert = []
  if (response === null) return ''
  switch (response.type) {
    case 'SUCCESS':
      succMes = noAlert.indexOf(response.message) > -1 ? '' : response.message// 页面加载就没必要提示吧
      break
    default:
      break
  }
  return succMes
}
// http response 拦截器
// ajax请求回调之前拦截 对请求返回的信息做统一处理 比如error为401无权限则跳转到登陆界面
axios.interceptors.response.use(response => {
  if (errorMsg(response)) {
    response['errorFlag'] = true
    Message.error({ message: errorMsg(response), duration: 4000 })
  } else if (succMsg(response)) {
    Message.success({ message: succMsg(response), duration: 4000 })
  }
  return response
}, error => {
  var response = error.response ? error.response.data : error
  Message.error({ message: errorMsg(response), duration: 4000 })
  response['errorFlag'] = true
  return Promise.reject(response)
})
export default axios

const ajax = {
  /*
   * get 方法封装
   * @param url
   * @param data
   * @returns {Promise}
   */
  get(url, data = {}) {
    var loadInstance = Loading.service()
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: data
      }).then(response => {
        loadInstance.close()
        resolve(response.data)
      }, err => {
        loadInstance.close()
        reject(err)
      })
    })
  },
  /*
   * post 方法封装
   * @param url
   * @param data
   * @returns {Promise}
   */
  post(url, data = {}) {
    var loadInstance = Loading.service()
    return new Promise((resolve, reject) => {
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
      axios.post(url, data).then(response => {
        loadInstance.close()
        resolve(response.data)
      }, err => {
        loadInstance.close()
        reject(err)
      })
    })
  }
}
export {
  ajax
}
