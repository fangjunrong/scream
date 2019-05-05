<template>
  <div class="vueEcharts">
    <v-chart :options="circle" :theme="themeCircle"/>
    <v-chart :options="brokeline" :theme="themebrokeline"/>
    <v-chart :options="arealine" :theme="themearealine"/>
    <v-chart :options="columnar" :theme="themecolumnar"/>
    <el-button type="primary" class="border">测试</el-button>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
import 'echarts'
import circle from '@/utils/echartsTheme/circle.json'
import brokeline from '@/utils/echartsTheme/brokeline.json'
import arealine from '@/utils/echartsTheme/brokeline.json'
import columnar from '@/utils/echartsTheme/columnar.json'

export default {
  name: 'VueEcharts',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      circle: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['60%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderWidth: 10, // 设置border的宽度有多大
              borderColor: '#001430'
            },
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
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
                name: '邮件营销',
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
          }
        },
        yAxis: {
          type: 'value'
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
          text: '世界人口总量',
          subtext: '数据来自网络'
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
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
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
      themecolumnar: ''
    }
  },
  mounted() {
    this.themeCircle = circle
    this.themebrokeline = brokeline
    this.themearealine = arealine
    this.thcolumnar = columnar
  }
}
</script>
<style lang='scss' scoped>

</style>
