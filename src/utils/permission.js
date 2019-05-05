import router from '../router'
import NProgress from 'nprogress'
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/common' // 验权

const whiteList = ['/login', '/fakelogin'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (!getToken('UserToken')) {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else { // 全部重定向到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
