<template>
  <div class="echarts">
    <el-container>
      <el-header>
      </el-header>
      <el-main>
        <BreadCrumb/>
        <div id="echart" style="width: 600px;height:400px;"></div>
        <div id="circle" style="width: 600px;height:400px;"></div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import echarts from 'echarts'
import circle from '@/utils/echartsTheme/circle.json'

export default {
  name: 'TestD3',
  data() {
    return {
      themeCircle: ''
    }
  },
  mounted() {
    this.themeCircle = circle
    this.init()
  },
  methods: {
    init() {
      echarts.registerTheme('circle', this.themeCircle)
      var myChart = echarts.init(document.getElementById('echart'), 'circle')
      var circleChart = echarts.init(document.getElementById('circle'), 'circle')
      const option = {
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
              borderColor: '#01050F'
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
                ame: '直接访问',
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
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {// 柱样式
            normal: {
              barBorderRadius: [5, 5, 0, 0],
              color: function(params) { // 渐变色，也可以直接用数组给不同的柱子设置不同的颜色
                var colorList = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00e6ff'
                }, {
                  offset: 1,
                  color: '#018dff'
                }]), new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00fcae'
                }, {
                  offset: 1,
                  color: '#006388'
                }])]
                return colorList[params.dataIndex]
              },
              opacity: 1
            }
          }
        }]
      })
      circleChart.setOption(option)
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
