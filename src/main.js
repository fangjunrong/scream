// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
// import '@/utils/permission' // permission control

// import Element from './utils/element' // 部分引用
import Element from 'element-ui' // 全部引用
import '@/styles/el-theme.scss'
import '@/styles/index.scss' // global css

import '@/styles/icon/svg.js'

import BaseComponents from '@/components/index'
Object.keys(BaseComponents).forEach((key) => { // 全局注册基本组件
  Vue.component(key, BaseComponents[key])
})
import ECharts from 'vue-echarts'
Vue.component('v-chart', ECharts)
// import VueAMap from 'vue-amap'
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
//   key: '8a1b4f4e6ad82c7f176f819d5a9331b9',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4'
// })
Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
