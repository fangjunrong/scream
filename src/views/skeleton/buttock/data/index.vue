<template>
  <div class="skeletonButtockData">
    <div class="skeletonButtockData-title">
      <DetailTitle title="统计数据"/>
    </div>
    <div class="skeletonButtockData-filter">
      <el-form :inline="true">
        <el-form-item label="客户">
          <el-input v-model="filter.customer" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="filter.department" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary skeletonButtockData-filter-search" value="查询" @click="search()"/>
      </el-form>
      <ul class="skeletonButtockData-filter-textShow">
        <li>所有设备（共{{ activeRateData.length }}台）的使用信息：</li>
        <li>在线活跃率 {{ activeRateData[activeRateData.length - 1] }}% 支撑时长：{{ durationNumData[durationNumData.length - 1] }}  开机次数：{{ bootNumData[bootNumData.length - 1] }}</li>
      </ul>
    </div>
    <div class="skeletonButtockData-charts">
      <el-tabs v-model="activeName" tab-position="top" style="height: 200px;">
        <el-tab-pane label="一周" name="7"></el-tab-pane>
        <el-tab-pane label="半月" name="15"></el-tab-pane>
        <el-tab-pane label="一月" name="30"></el-tab-pane>
      </el-tabs>
      <div class="skeletonButtockData-charts-container">
        <div class="chart1">
          <LittleTitle title="在线活跃率"/>
          <v-chart
            ref="online"
            :options="activeRateOption"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"
            @click="activeRateClick"/>
        </div>
        <div class="chart2">
          <LittleTitle title="开机次数"/>
          <v-chart
            :options="bootNumOption"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"
            @click="bootNumClick"/>
        </div>
        <div class="chart3">
          <LittleTitle title="步数"/>
          <v-chart
            :options="stepsNumOption"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"
            @click="stepNumClick"/>
        </div>
        <div class="chart4">
          <LittleTitle title="支撑时长"/>
          <v-chart
            :options="durationNumOption"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"
            @click="durationClick"/>
        </div>
        <div class="chart5">
          <LittleTitle title="坐下次数"/>
          <v-chart
            :options="sitNumOption"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"
            @click="sitClick"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
import ECharts from 'vue-echarts'
import 'echarts'
import brokeline from '@/utils/echartsTheme/brokeline.json'
export default {
  name: 'SkeletonButtockData',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      filter: {
        name: '',
        sn: '',
        customer: '',
        department: ''
      },
      tableData: [],
      formLabelWidth: '100px',
      themebrokeline: '',
      activeName: '30',
      activeRateData: [],
      activeRateDataX: [],
      stepNumData: [],
      stepNumDataX: [],
      bootNumData: [],
      bootNumdataX: [],
      durationNumData: [],
      durationNumDataX: [],
      sitNumData: [],
      sitNumDataX: [],
      activeRateOption: {
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
      stepsNumOption: {
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
      durationNumOption: {
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
      }
    }
  },
  watch: {
    activeName(newValue, oldValue) {
      this.showDataByDays(newValue)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('skeletonButtock', [
      'fetchSkeletonButtockActiveRate',
      'fetchSkeletonButtockBootTotal',
      'fetchSkeletonButtockStepsTotal',
      'fetchSkeletonButtockDurationTotal'
    ]),
    async init() {
      this.themebrokeline = brokeline
      const activeRateResult = await this.fetchSkeletonButtockBootTotal()
      if (activeRateResult.code !== 200) {
        this.$message.warning(activeRateResult.message)
      }
      this.activeRateData = activeRateResult.data.map((v) => { return v.activeRate })
      this.activeRateDataX = activeRateResult.data.map((v) => { return v.showDate })
      const bootTotalResult = await this.fetchSkeletonButtockBootTotal()
      if (bootTotalResult.code !== 200) {
        this.$message.warning(bootTotalResult.message)
      }
      this.bootNumData = bootTotalResult.data.map((v) => { return v.total })
      this.bootNumDataX = bootTotalResult.data.map((v) => { return v.showDate })
      const stepsTotalResult = await this.fetchSkeletonButtockStepsTotal()
      if (stepsTotalResult.code !== 200) {
        this.$message.warning(stepsTotalResult.message)
      }
      this.stepsNumData = stepsTotalResult.data.map((v) => { return v.total })
      this.stepsNumDataX = stepsTotalResult.data.map((v) => { return v.showDate })
      const durationTotalResult = await this.fetchSkeletonButtockDurationTotal()
      if (durationTotalResult.code !== 200) {
        this.$message.warning(durationTotalResult.message)
      }
      this.durationNumData = durationTotalResult.data.map((v) => { return v.total })
      this.durationNumDataX = durationTotalResult.data.map((v) => { return v.showDate })
      const sitTotalResult = await this.fetchSkeletonButtockDurationTotal()
      if (durationTotalResult.code !== 200) {
        this.$message.warning(durationTotalResult.message)
      }
      this.sitNumData = sitTotalResult.data.map((v) => { return v.total })
      this.sitNumDataX = sitTotalResult.data.map((v) => { return v.showDate })
      this.activeRateOption.series[0].data = this.activeRateData
      this.stepsNumOption.series[0].data = this.stepsNumData
      this.stepsNumOption.xAxis.data = this.stepsNumDataX
      this.bootNumOption.series[0].data = this.bootNumData
      this.bootNumOption.xAxis.data = this.bootNumDataX
      this.durationNumOption.series[0].data = this.durationNumData
      this.durationNumOption.xAxis.data = this.durationNumDataX
      this.activeRateOption.series[0].data = this.activeRateData
      this.activeRateOption.xAxis.data = this.activeRateDataX
      this.sitNumOption.series[0].data = this.sitNumData
      this.sitNumOption.xAxis.data = this.sitNumDataX
    },
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchSkeletonButtockBootTotal(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
    },
    async getData(param) {
      return await this.fetchSkeletonButtockBootTotal(param)
    },
    activeRateClick(event) {
      this.$router.push({
        name: 'skeletonButtockBootNum',
        query: {
          date: event.name
        }
      })
    },
    bootNumClick(event) {
      this.$router.push({
        name: 'skeletonButtockBootNum',
        query: {
          date: event.name
        }
      })
    },
    stepNumClick(event) {
      this.$router.push({
        name: 'skeletonButtockStepNum',
        query: {
          date: event.name
        }
      })
    },
    durationClick(event) {
      this.$router.push({
        name: 'skeletonButtockDurationNum',
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
    },
    showDataByDays(val) {
      this.activeRateOption.series[0].data = this.spliceData(this.activeRateData, 0, val)
      this.stepsNumOption.series[0].data = this.spliceData(this.stepsNumData, 0, val)
      this.stepsNumOption.xAxis.data = this.spliceData(this.stepsNumDataX, 0, val)
      this.bootNumOption.series[0].data = this.spliceData(this.bootNumData, 0, val)
      this.bootNumOption.xAxis.data = this.spliceData(this.bootNumDataX, 0, val)
      this.durationNumOption.series[0].data = this.spliceData(this.durationNumData, 0, val)
      this.durationNumOption.xAxis.data = this.spliceData(this.durationNumDataX, 0, val)
      this.activeRateOption.series[0].data = this.spliceData(this.activeRateData, 0, val)
      this.activeRateOption.xAxis.data = this.spliceData(this.activeRateDataX, 0, val)
      this.sitNumOption.series[0].data = this.spliceData(this.sitNumData, 0, val)
      this.sitNumOption.xAxis.data = this.spliceData(this.sitNumDataX, 0, val)
    },
    spliceData(data, index, length) {
      const _data = _.cloneDeep(data)
      return _data.splice(index, length)
    }
  }
}
</script>
<style lang='scss' scoped>
.skeletonButtockData{
  &-filter{
    display: flex;
    justify-content: space-between;
    padding: 16px;
    background-color: #001432;
    border-radius: 8px;
    .sinput{
      width: 200px;
    }
    .el-form-item{
      margin-bottom: 0;
      margin-right: 30px;
    }
    &-search{
      width: 125px;
    }
    &-textShow{
      color: #0df0f9;
    }
  }
  &-charts{
    background-color: #001432;
    border-radius: 8px;
    margin-top: 16px;
    padding: 30px 40px;
    &-container{
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  &-pagination{
    margin-top: 42px;
    .el-pagination{
      float: right;
    }
  }
}

</style>
<style>
.skeletonButtockData .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
.skeletonButtockData .el-tabs__nav{
  float: none;
  text-align: center;
}
</style>
