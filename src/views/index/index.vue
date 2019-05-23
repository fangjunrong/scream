<template>
  <div class="index">
    <Header />
    <transition name="el-zoom-in-top">
      <div class="index__container">
        <div class="index__container-top boxs">
          <div class="index__container-horizon-box1 box">
            <div class="chart1">
              <LittleTitle title="台阶数"/>
              <v-chart
                :options="bootNumOption"
                :theme="themebrokeline"
                style="height: 194px;width: 268px"
                @click="climbStepNumClick"/>
            </div>
            <div class="chart2">
              <LittleTitle title="弯腰次数"/>
              <v-chart
                :options="bendNumOption"
                :theme="themebrokeline"
                style="height: 194px;width: 268px"
                @click="bendClick"/>
            </div>
          </div>
          <div class="index__container-horizon-box2 box">
            <el-carousel trigger="click" height="448px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="index__container-horizon-box3 box circle">
            <LittleTitle title="外骨骼数量 设备总数量"/>
            <div class="half">
              <v-chart :options="skeletonNumOption" :theme="themeCircle" style="height: 350px;width: 220px" @click="numClick"/>
            </div>
            <div class="half">
              <v-chart :options="allNumOption" :theme="themeCircle" style="height: 350px;width: 220px" @click="numClick"/>
            </div>
          </div>
        </div>
        <div class="index__container-bottom boxs">
          <div class="index__container-horizon-box1 box">
            <div class="chart3">
              <LittleTitle title="托举次数"/>
              <v-chart
                :options="liftNumOption"
                :theme="themebrokeline"
                style="height: 194px;width: 268px"
                @click="liftNumClick"/>
            </div>
            <div class="chart4">
              <LittleTitle title="坐下次数"/>
              <v-chart
                :options="sitNumOption"
                :theme="themebrokeline"
                style="height: 194px;width: 268px"
                @click="sitClick"/>
            </div>
          </div>
          <div class="index__container-horizon-box2 box">
            <div class="half">
              <LittleTitle title="工作效率"/>
              <v-chart :options="arealine" :theme="themearealine" style="height: 350px;width: 430px" @click="workEfficiency"/>
              <div class="summary">工作效率（按月）：同比增长 <span class="num">20%</span> ，环比增长 <span class="num">30%</span></div>
            </div>
            <div class="half">
              <LittleTitle title="成本费用"/>
              <v-chart :options="arealine" :theme="themearealine" style="height: 350px;width: 430px" @click="workEfficiency"/>
              <div class="summary">成本费用（按月）：同比减少 <span class="num">30%</span> ，环比减少 <span class="num">40%</span></div>
            </div>
          </div>
          <div class="index__container-horizon-box3 box">
            <LittleTitle title="开机次数 弯腰次数"/>
            <v-chart :options="columnar" :theme="themecolumnar" style="height: 400px; width: 448px;"/>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ECharts from 'vue-echarts'
import echarts from 'echarts'
import circle from '@/utils/echartsTheme/circle.json'
import brokeline from '@/utils/echartsTheme/brokeline.json'
import arealine from '@/utils/echartsTheme/brokeline.json'
import columnar from '@/utils/echartsTheme/columnar.json'

import Header from './../layout/main/uiComponents/header/index'
export default {
  name: '',
  components: {
    Header,
    'v-chart': ECharts
  },
  data() {
    return {
      textarea: '',
      bootNumData: [],
      bootNumdataX: [],
      weightNumData: [],
      weightNumDataX: '',
      liftNumOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: [],
          splitLine: { // 网格线
            'show': false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        series: [{
          data: this.onlineData,
          type: 'line',
          color: '#4ac9d6',
          itemStyle: {
            normal: {
              color: '#4ac9d6',
              borderColor: '#fff' // 拐点边框颜色
            }
          }
        }]
      },
      sitNumOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: [],
          splitLine: { // 网格线
            'show': false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        series: [{
          data: this.onlineData,
          type: 'line',
          color: '#4ac9d6',
          itemStyle: {
            normal: {
              color: '#4ac9d6',
              borderColor: '#fff' // 拐点边框颜色
            }
          }
        }]
      },
      bendNumOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: [],
          splitLine: { // 网格线
            'show': false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        series: [{
          data: this.onlineData,
          type: 'line',
          color: '#4ac9d6',
          itemStyle: {
            normal: {
              color: '#4ac9d6',
              borderColor: '#fff' // 拐点边框颜色
            }
          }
        }]
      },
      bootNumOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: [],
          splitLine: { // 网格线
            'show': false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        series: [{
          data: [],
          type: 'line',
          color: '#4ac9d6',
          itemStyle: {
            normal: {
              color: '#4ac9d6',
              borderColor: '#fff' // 拐点边框颜色
            }
          }
        }]
      },
      weightNumOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: [],
          splitLine: { // 网格线
            'show': false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        series: [{
          data: this.onlineData,
          type: 'line',
          color: '#4ac9d6',
          itemStyle: {
            normal: {
              color: '#4ac9d6',
              borderColor: '#fff' // 拐点边框颜色
            }
          }
        }]
      },
      skeletonNumOption: {
        title: {
          text: '外骨骼数量',
          left: 'center',
          textStyle: {
            fontSize: '16',
            color: '#e1e1e1'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          show: false,
          x: 'left',
          data: []
        },
        series: [
          {
            name: '外骨骼数量',
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            itemStyle: {
              borderWidth: 20, // 设置border的宽度有多大
              borderColor: '#001430'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 1,
                name: '手臂外骨骼',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#9fff17' // 0% 处的颜色
                    },
                    {
                      offset: 1, color: '#ffbd00' // 100% 处的颜色
                    }],
                    globalCoord: true // 缺省为 false
                  }
                }
              },
              { value: 1,
                name: '腰部外骨骼',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#45fbff' // 0% 处的颜色
                    },
                    {
                      offset: 1, color: '#05496d' // 100% 处的颜色
                    }],
                    globalCoord: true // 缺省为 false
                  }
                }
              },
              { value: 1,
                name: '臀部外骨骼',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#ffe742' // 0% 处的颜色
                    },
                    {
                      offset: 1, color: '#ff9f49' // 100% 处的颜色
                    }],
                    globalCoord: true // 缺省为 false
                  }
                }}
            ]
          }
        ]
      },
      allNumOption: {
        title: {
          text: '设备总数量',
          left: 'center',
          textStyle: {
            fontSize: '16',
            color: '#e1e1e1'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          show: false,
          x: 'left',
          data: []
        },
        series: [
          {
            name: '设备总数量',
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            itemStyle: {
              borderWidth: 20, // 设置border的宽度有多大
              borderColor: '#001430'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 1,
                name: '爬楼机数量',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#9fff17' // 0% 处的颜色
                    },
                    {
                      offset: 1, color: '#ffbd00' // 100% 处的颜色
                    }],
                    globalCoord: true // 缺省为 false
                  }
                }
              },
              { value: 1,
                name: '外骨骼数量',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#45fbff' // 0% 处的颜色
                    },
                    {
                      offset: 1, color: '#05496d' // 100% 处的颜色
                    }],
                    globalCoord: true // 缺省为 false
                  }
                }
              }
            ]
          }
        ]
      },
      skeletonArmNum: 1,
      skeletonWaistNum: 1,
      skeletonButtockNum: 1,
      skeletonNum: 1,
      climbNum: 1,
      arealine: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          splitLine: { // 网格线
            'show': false
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [320, 680, 280, 480, 1290, 500, 1320],
          type: 'line',
          color: '#4ac9d6',
          smooth: true,
          itemStyle: {
            opacity: 0
          },
          areaStyle: { // 覆盖区域
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#146EAF' // 0% 处的颜色
              }, {
                offset: 1, color: '#001E3C' // 100% 处的颜色
              }]
            }
          }
        }]
      },
      columnar: {
        title: {
          // text: '世界人口'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['开机次数', '弯腰次数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: { // 网格线
            'show': false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: ['爬楼机', '手臂外骨骼', '腰部外骨骼', '臀部外骨骼'],
          splitLine: { // 网格线
            'show': false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '开机次数',
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#0167e8' },
                    { offset: 1, color: '#00c6ff' }
                  ]
                )
              }
            },
            data: [120, 40, 50, 30]
          },
          {
            name: '弯腰次数',
            type: 'bar',
            data: [30, 50, 80, 59]
          }
        ]
      },
      climbBootNum: 1,
      skeletonArmBootNum: 1,
      skeletonWaistBootNum: 1,
      skeletonButtockBootNum: 1,
      themeCircle: '',
      themebrokeline: '',
      themearealine: '',
      themecolumnar: '',
      interval: ''
    }
  },
  mounted() {
    this.themeCircle = circle
    this.themearealine = arealine
    this.themecolumnar = columnar
    this.initBrokeLine()
    this.initCircle()
    this.interval = setInterval(() => {
      this.initBrokeLine()
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    ...mapActions('climb', [
      'fetchClimbActiveRate',
      'fetchClimbBootTotal',
      'fetchClimbStepsTotal',
      'fetchClimbWeightTotal'
    ]),
    ...mapActions('skeletonArm', [
      'fetchSkeletonArmActiveRate',
      'fetchSkeletonArmLiftTotal'
    ]),
    ...mapActions('skeletonWaist', [
      'fetchSkeletonWaistActiveRate',
      'fetchSkeletonWaistBendTotal'
    ]),
    ...mapActions('skeletonButtock', [
      'fetchSkeletonButtockActiveRate',
      'fetchSkeletonButtockSitTotal'
    ]),
    async initBrokeLine() {
      this.themebrokeline = brokeline
      const activeRateResult = await this.fetchClimbActiveRate()
      if (activeRateResult.code !== 200) {
        this.$message.warning(activeRateResult.message)
      }
      this.activeRateData = activeRateResult.data.map((v) => { return v.activeRate })
      this.activeRateDataX = activeRateResult.data.map((v) => { return v.showDate })
      this.climbNum = this.activeRateData.length
      const bootTotalResult = await this.fetchClimbBootTotal()
      if (bootTotalResult.code !== 200) {
        this.$message.warning(bootTotalResult.message)
      }
      this.bootNumData = bootTotalResult.data.map((v) => { return v.total })
      this.bootNumDataX = bootTotalResult.data.map((v) => { return v.showDate })
      const weightTotalResult = await this.fetchClimbWeightTotal()
      if (weightTotalResult.code !== 200) {
        this.$message.warning(weightTotalResult.message)
      }
      const bendTotalResult = await this.fetchSkeletonWaistBendTotal()
      if (bendTotalResult.code !== 200) {
        this.$message.warning(bendTotalResult.message)
      }
      this.bendNumData = bendTotalResult.data.map((v) => { return v.total })
      this.bendNumDataX = bendTotalResult.data.map((v) => { return v.showDate })
      const liftTotalResult = await this.fetchSkeletonArmLiftTotal()
      if (liftTotalResult.code !== 200) {
        this.$message.warning(liftTotalResult.message)
      }
      const sitTotalResult = await this.fetchSkeletonButtockSitTotal()
      if (sitTotalResult.code !== 200) {
        this.$message.warning(sitTotalResult.message)
      }
      this.sitNumData = sitTotalResult.data.map((v) => { return v.total })
      this.sitNumDataX = sitTotalResult.data.map((v) => { return v.showDate })
      this.liftNumData = liftTotalResult.data.map((v) => { return v.total })
      this.liftNumDataX = liftTotalResult.data.map((v) => { return v.showDate })
      this.bendNumOption.series[0].data = this.bendNumData
      this.bendNumOption.xAxis.data = this.bendNumDataX
      this.liftNumOption.series[0].data = this.liftNumData
      this.liftNumOption.xAxis.data = this.liftNumDataX
      this.sitNumOption.series[0].data = this.sitNumData
      this.sitNumOption.xAxis.data = this.sitNumDataX
      this.weightNumData = weightTotalResult.data.map((v) => { return v.total })
      this.weightNumDataX = weightTotalResult.data.map((v) => { return v.showDate })
      this.bootNumOption.series[0].data = this.bootNumData
      this.bootNumOption.xAxis.data = this.bootNumDataX
      this.weightNumOption.series[0].data = this.weightNumData
      this.weightNumOption.xAxis.data = this.weightNumDataX
    },
    async initCircle() {
      const armResult = await this.fetchSkeletonArmActiveRate()
      if (armResult.code !== 200) {
        this.$message.warning(armResult.message)
      }
      this.skeletonArmNum = armResult.data.length
      const waistResult = await this.fetchSkeletonWaistActiveRate()
      if (waistResult.code !== 200) {
        this.$message.warning(waistResult.message)
      }
      this.skeletonWaistNum = waistResult.data.length
      const buttockResult = await this.fetchSkeletonButtockActiveRate()
      if (buttockResult.code !== 200) {
        this.$message.warning(buttockResult.message)
      }
      this.skeletonButtockNum = buttockResult.data.length
      this.skeletonNumOption.series[0].data[0].value = this.skeletonArmNum
      this.skeletonNumOption.series[0].data[1].value = this.skeletonWaistNum
      this.skeletonNumOption.series[0].data[2].value = this.skeletonButtockNum
      this.skeletonNum = this.skeletonArmNum + this.skeletonWaistNum + this.skeletonButtockNum
      this.allNum = this.climbNum + this.skeletonNum
      this.allNumOption.series[0].data[0].value = this.climbNum
      this.allNumOption.series[0].data[1].value = this.skeletonNum
    },
    toClimbData() {
      this.$router.push({ name: 'climbData' })
    },
    numClick(event) {
      if (event.name === '臀部外骨骼') {
        this.$router.push({
          name: 'skeletonButtock'
        })
      } else if (event.name === '腰部外骨骼') {
        this.$router.push({
          name: 'skeletonWaist'
        })
      } else if (event.name === '手臂外骨骼') {
        this.$router.push({
          name: 'skeletonArm'
        })
      } else if (event.name === '外骨骼数量') {
        this.$router.push({
          name: 'skeletonArm'
        })
      } else if (event.name === '爬楼机数量') {
        this.$router.push({
          name: 'climb'
        })
      }
    },
    climbActiveRateClick(event) {
      this.$router.push({
        name: 'climbBootNum',
        query: {
          date: event.name
        }
      })
    },
    climbBootNumClick(event) {
      this.$router.push({
        name: 'climbBootNum',
        query: {
          date: event.name
        }
      })
    },
    climbStepNumClick(event) {
      this.$router.push({
        name: 'climbStepNum',
        query: {
          date: event.name
        }
      })
    },
    climbWeightClick(event) {
      this.$router.push({
        name: 'climbWeight',
        query: {
          date: event.name
        }
      })
    },
    workEfficiency(event) {
      this.$router.push({
        name: 'skeletonArmBusinessET'
      })
    },
    bendClick(event) {
      this.$router.push({
        name: 'skeletonWaistHealth',
        query: {
          date: event.name
        }
      })
    },
    liftNumClick(event) {
      this.$router.push({
        name: 'skeletonArmLiftNum',
        query: {
          date: event.name
        }
      })
    },
    sitClick(event) {
      this.$router.push({
        name: 'skeletonButtockSitNum',
        query: {
          date: event.name
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.index{
  background-color: #000310;
  &__container{
    padding: 15px 4.16%;
    .box{
      float: left;
      padding: 16px;
      border: solid 1px #64eefa;
      border-radius: 8px;
      background-color: #001432;
      overflow: hidden;
      cursor: pointer;
      .summary{
        color: #e1e1e1;
        border: 1px solid $borderColor;
        width: 300px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        margin: 0 auto;
        padding: 0 16px;
        font-size: 12px;
        box-sizing: content-box;
        .num{
          color: $textColor;
          font-size: 16px;
        }
      }
    }
    &-top{
      overflow: hidden;
    }
    &-bottom{
      overflow: hidden;
      margin-top: 16px;
    }
    &-horizon{
      &-box1{
        height: 480px;
        width: 300px;
      }
      &-box2{
        height: 480px;
        width: 890px;
        margin-left: 16px;
      }
      &-box3{
        height: 480px;
        width: 520px;
        margin-left: 16px;
      }
    }
  }
}
.circle .half{
  margin: 30px 0 40px 0;
}
.half{
  float: left;
  width: 50%;
}
.el-header{
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
.el-main{
  margin-top: 50px;
  padding: 26px 20px 0;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #020B50;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

</style>
