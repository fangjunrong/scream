<template>
  <div class="index">
    <Header />
    <transition name="el-zoom-in-top">
      <div class="index__container">
        <div class="index__container-top boxs">
          <div class="index__container-horizon-box1 box" @click="toClimbData">
            <div class="chart1">
              <LittleTitle title="在线活跃率"/>
              <v-chart :options="brokeline" :theme="themebrokeline" style="height: 194px;width: 268px"/>
            </div>
            <div class="chart2">
              <LittleTitle title="台阶数"/>
              <v-chart :options="brokeline" :theme="themebrokeline" style="height: 194px;width: 268px"/>
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
            <LittleTitle title="外骨骼数量 总数量"/>
            <div class="half">
              <v-chart :options="circle" :theme="themeCircle" style="height: 350px;width: 220px"/>
            </div>
            <div class="half">
              <v-chart :options="circle" :theme="themeCircle" style="height: 350px;width: 220px"/>
            </div>
          </div>
        </div>
        <div class="index__container-bottom boxs">
          <div class="index__container-horizon-box1 box">
            <div class="chart3" @click="toClimbData">
              <LittleTitle title="开机次数"/>
              <v-chart :options="brokeline" :theme="themebrokeline" style="height: 194px;width: 268px"/>
            </div>
            <div class="chart4">
              <LittleTitle title="重量等级"/>
              <v-chart :options="brokeline" :theme="themebrokeline" style="height: 194px;width: 268px"/>
            </div>
          </div>
          <div class="index__container-horizon-box2 box">
            <div class="half">
              <LittleTitle title="工作效率"/>
              <v-chart :options="arealine" :theme="themearealine" style="height: 350px;width: 430px"/>
              <div class="summary">工作效率（按月）：同比增长 <span class="num">20%</span> ，环比增长 <span class="num">30%</span></div>
            </div>
            <div class="half">
              <LittleTitle title="成本费用"/>
              <v-chart :options="arealine" :theme="themearealine" style="height: 350px;width: 430px"/>
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
      circle: {
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
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
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
                value: 335,
                name: '直接访问',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [// {
                    //     offset: 0, color: 'red' // 0% 处的颜色
                    // },
                      { offset: 0.2, color: '#000' // 0% 处的颜色
                      },
                      //  {offset: 0.5, color: 'green' // 50% 处的颜色
                      //  },
                      {
                        offset: 1, color: 'blue' // 100% 处的颜色
                      }],
                    globalCoord: true // 缺省为 false
                  }
                }
              },
              { value: 310,
                name: '邮件营销'
              },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      },
      brokeline: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          data: [320, 680, 280, 480, 1290, 500, 1320],
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
          data: ['2011年', '2012年']
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
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
          splitLine: { // 网格线
            'show': false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '2011年',
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
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      },
      themeCircle: '',
      themebrokeline: '',
      themearealine: '',
      themecolumnar: ''
    }
  },
  mounted() {
    this.themeCircle = circle
    this.themebrokeline = brokeline
    this.themearealine = arealine
    this.themecolumnar = columnar
  },
  methods: {
    toClimbData() {
      this.$router.push({ name: 'climbData' })
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
