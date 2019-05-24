import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/layout/main/index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: () =>
      import('@/views/login/index')
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    children: [
      {
        path: 'climb',
        name: 'climb',
        component: () =>
          import('@/views/climb/index'),
        children: [
          {
            path: 'position',
            name: 'climbPosition',
            component: () =>
              import('@/views/climb/position/index')
          }, {
            path: 'positionDetail',
            name: 'climbPositionDetail',
            component: () =>
              import('@/views/climb/position/detail/index')
          }, {
            path: 'device',
            name: 'climbDevice',
            component: () =>
              import('@/views/climb/device/index')
          }, {
            path: 'data',
            name: 'climbData',
            component: () =>
              import('@/views/climb/data/index')
          }, {
            path: 'bootNum',
            name: 'climbBootNum',
            component: () =>
              import('@/views/climb/bootNum/index')
          }, {
            path: 'bootNumDetail',
            name: 'climbBootNumDetail',
            component: () =>
              import('@/views/climb/bootNumDetail/index')
          }, {
            path: 'stepNum',
            name: 'climbStepNum',
            component: () =>
              import('@/views/climb/stepNum/index')
          }, {
            path: 'stepNumDetail',
            name: 'climbStepNumDetail',
            component: () =>
              import('@/views/climb/stepNumDetail/index')
          }, {
            path: 'stepByDay',
            name: 'climbStepByDay',
            component: () =>
              import('@/views/climb/stepByDay/index')
          }, {
            path: 'weight',
            name: 'climbWeight',
            component: () =>
              import('@/views/climb/weight/index')
          }, {
            path: 'weightByDay',
            name: 'climbWeightByDay',
            component: () =>
              import('@/views/climb/weightByDay/index')
          }, {
            path: 'weightDetail',
            name: 'climbWeightDetail',
            component: () =>
              import('@/views/climb/weightDetail/index')
          }
        ]
      },
      {
        path: 'skeleton',
        name: 'skeleton',
        component: () =>
          import('@/views/skeleton/index'),
        children: [{
          path: 'arm',
          name: 'skeletonArm',
          redirect: '/main/skeleton/arm/device',
          component: () =>
              import('@/views/skeleton/arm/index'),
          children: [{
            path: 'position',
            name: 'skeletonArmPosition',
            component: () =>
              import('@/views/skeleton/arm/position/index')
          }, {
            path: 'positionDetail',
            name: 'skeletonArmPositionDetail',
            component: () =>
              import('@/views/skeleton/arm/position/detail/index')
          }, {
            path: 'device',
            name: 'skeletonArmDevice',
            component: () =>
              import('@/views/skeleton/arm/device/index')
          }, {
            path: 'health',
            name: 'skeletonArmHealth',
            component: () =>
              import('@/views/skeleton/arm/health/index')
          }, {
            path: 'healthDetail',
            name: 'skeletonArmHealthDetail',
            component: () =>
              import('@/views/skeleton/arm/healthDetail/index')
          }, {
            path: 'person',
            name: 'skeletonArmPerson',
            component: () =>
              import('@/views/skeleton/arm/person/index')
          }, {
            path: 'data',
            name: 'skeletonArmData',
            component: () =>
              import('@/views/skeleton/arm/data/index')
          }, {
            path: 'businessET',
            name: 'skeletonArmBusinessET',
            component: () =>
              import('@/views/skeleton/arm/businessET/index')
          }, {
            path: 'bootNum',
            name: 'skeletonArmBootNum',
            component: () =>
              import('@/views/skeleton/arm/bootNum/index')
          }, {
            path: 'bootNumDetail',
            name: 'skeletonArmBootNumDetail',
            component: () =>
              import('@/views/skeleton/arm/bootNumDetail/index')
          }, {
            path: 'liftNum',
            name: 'skeletonArmLiftNum',
            component: () =>
              import('@/views/skeleton/arm/liftNum/index')
          }, {
            path: 'liftNumDetail',
            name: 'skeletonArmLiftNumDetail',
            component: () =>
              import('@/views/skeleton/arm/liftNumDetail/index')
          }, {
            path: 'liftByDay',
            name: 'skeletonArmLiftByDay',
            component: () =>
              import('@/views/skeleton/arm/liftByDay/index')
          }, {
            path: 'durationNum',
            name: 'skeletonArmDurationNum',
            component: () =>
              import('@/views/skeleton/arm/durationNum/index')
          }, {
            path: 'durationNumDetail',
            name: 'skeletonArmDurationNumDetail',
            component: () =>
              import('@/views/skeleton/arm/durationNumDetail/index')
          }, {
            path: 'durationByDay',
            name: 'skeletonArmDurationByDay',
            component: () =>
              import('@/views/skeleton/arm/durationByDay/index')
          }]
        }, {
          path: 'waist',
          name: 'skeletonWaist',
          redirect: '/main/skeleton/waist/device',
          component: () =>
              import('@/views/skeleton/waist/index'),
          children: [{
            path: 'position',
            name: 'skeletonWaistPosition',
            component: () =>
              import('@/views/skeleton/waist/position/index')
          }, {
            path: 'positionDetail',
            name: 'skeletonWaistPositionDetail',
            component: () =>
              import('@/views/skeleton/waist/position/detail/index')
          }, {
            path: 'device',
            name: 'skeletonWaistDevice',
            component: () =>
              import('@/views/skeleton/waist/device/index')
          }, {
            path: 'health',
            name: 'skeletonWaistHealth',
            component: () =>
              import('@/views/skeleton/waist/health/index')
          }, {
            path: 'healthDetail',
            name: 'skeletonWaistHealthDetail',
            component: () =>
              import('@/views/skeleton/waist/healthDetail/index')
          }, {
            path: 'person',
            name: 'skeletonWaistPerson',
            component: () =>
              import('@/views/skeleton/waist/person/index')
          }, {
            path: 'data',
            name: 'skeletonWaistData',
            component: () =>
              import('@/views/skeleton/waist/data/index')
          }, {
            path: 'businessET',
            name: 'skeletonWaistBusinessET',
            component: () =>
              import('@/views/skeleton/waist/businessET/index')
          }, {
            path: 'bootNum',
            name: 'skeletonWaistBootNum',
            component: () =>
              import('@/views/skeleton/waist/bootNum/index')
          }, {
            path: 'bootNumDetail',
            name: 'skeletonWaistBootNumDetail',
            component: () =>
              import('@/views/skeleton/waist/bootNumDetail/index')
          }, {
            path: 'stepNum',
            name: 'skeletonWaistStepNum',
            component: () =>
              import('@/views/skeleton/waist/stepNum/index')
          }, {
            path: 'stepNumDetail',
            name: 'skeletonWaistStepNumDetail',
            component: () =>
              import('@/views/skeleton/waist/stepNumDetail/index')
          }, {
            path: 'stepByDay',
            name: 'skeletonWaistStepByDay',
            component: () =>
              import('@/views/skeleton/waist/stepByDay/index')
          }]
        }, {
          path: 'buttock',
          name: 'skeletonButtock',
          redirect: '/main/skeleton/buttock/device',
          component: () =>
              import('@/views/skeleton/buttock/index'),
          children: [{
            path: 'position',
            name: 'skeletonButtockPosition',
            component: () =>
              import('@/views/skeleton/buttock/position/index')
          }, {
            path: 'positionDetail',
            name: 'skeletonButtockPositionDetail',
            component: () =>
              import('@/views/skeleton/buttock/position/detail/index')
          }, {
            path: 'device',
            name: 'skeletonButtockDevice',
            component: () =>
              import('@/views/skeleton/buttock/device/index')
          }, {
            path: 'health',
            name: 'skeletonButtockHealth',
            component: () =>
              import('@/views/skeleton/buttock/health/index')
          }, {
            path: 'healthDetail',
            name: 'skeletonButtockHealthDetail',
            component: () =>
              import('@/views/skeleton/buttock/healthDetail/index')
          }, {
            path: 'person',
            name: 'skeletonButtockPerson',
            component: () =>
              import('@/views/skeleton/buttock/person/index')
          }, {
            path: 'data',
            name: 'skeletonButtockData',
            component: () =>
              import('@/views/skeleton/buttock/data/index')
          }, {
            path: 'businessET',
            name: 'skeletonButtockBusinessET',
            component: () =>
              import('@/views/skeleton/buttock/businessET/index')
          }, {
            path: 'bootNum',
            name: 'skeletonButtockBootNum',
            component: () =>
              import('@/views/skeleton/buttock/bootNum/index')
          }, {
            path: 'bootNumDetail',
            name: 'skeletonButtockBootNumDetail',
            component: () =>
              import('@/views/skeleton/buttock/bootNumDetail/index')
          }, {
            path: 'stepNum',
            name: 'skeletonButtockStepNum',
            component: () =>
              import('@/views/skeleton/buttock/stepNum/index')
          }, {
            path: 'stepNumDetail',
            name: 'skeletonButtockStepNumDetail',
            component: () =>
              import('@/views/skeleton/buttock/stepNumDetail/index')
          }, {
            path: 'stepByDay',
            name: 'skeletonButtockStepByDay',
            component: () =>
              import('@/views/skeleton/buttock/stepByDay/index')
          }, {
            path: 'durationNum',
            name: 'skeletonButtockDurationNum',
            component: () =>
              import('@/views/skeleton/buttock/durationNum/index')
          }, {
            path: 'durationNumDetail',
            name: 'skeletonButtockDurationNumDetail',
            component: () =>
              import('@/views/skeleton/buttock/durationNumDetail/index')
          }, {
            path: 'durationByDay',
            name: 'skeletonButtockDurationByDay',
            component: () =>
              import('@/views/skeleton/buttock/durationByDay/index')
          }, {
            path: 'sitNum',
            name: 'skeletonButtockSitNum',
            component: () =>
              import('@/views/skeleton/buttock/sitNum/index')
          }, {
            path: 'sitNumDetail',
            name: 'skeletonButtockSitNumDetail',
            component: () =>
              import('@/views/skeleton/buttock/sitNumDetail/index')
          }, {
            path: 'sitByDay',
            name: 'skeletonButtockSitByDay',
            component: () =>
              import('@/views/skeleton/buttock/sitByDay/index')
          }]
        }]
      },
      {
        path: 'manage',
        name: 'manage',
        component: () =>
          import('@/views/manage/index'),
        children: [
          {
            path: 'user',
            name: 'userManage',
            component: () =>
              import('@/views/manage/user/index')
          }
        ]
      }
    ]
  },
  {
    path: '/index',
    name: 'index',
    component: () =>
      import('@/views/index/index')
  },
  {
    path: '/404',
    component: () =>
      import('@/views/404')
  },
  {
    path: '/static/nopermt',
    component: () =>
      import('@/views/static/nopermit/index')
  },
  {
    path: '/static/ieUpdate',
    component: () =>
        import('@/views/static/ieupdate/index')
  },
  {
    path: '/test',
    component: () =>
        import('@/views/static/test')
  },
  {
    path: '/vueecharts',
    component: () =>
        import('@/views/static/vueecharts')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default new Router({
  mode: 'history', // 后端支持可开
  // base: process.env.BASE_URL,
  routes: constantRouterMap
})
