/bendTotal<template>
  <div class="skeletonWaistData">
    <div class="skeletonWaistData-title">
      <DetailTitle title="统计数据"/>
    </div>
    <div class="skeletonWaistData-filter">
      <el-form :inline="true">
        <el-form-item label="客户">
          <el-input v-model="filter.customer" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="filter.department" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary skeletonWaistData-filter-search" value="查询" @click="search()"/>
      </el-form>
      <ul class="skeletonWaistData-filter-textShow">
        <li>所有设备（共{{ deviceNum }}台）的使用信息：</li>
        <li>活跃设备数：{{ activeRateData[activeRateData.length - 1] }} 搬动次数：{{ bendNumData[bendNumData.length - 1] }}  开机次数：{{ bootNumData[bootNumData.length - 1] }}</li>
      </ul>
    </div>
    <div class="skeletonWaistData-charts">
      <el-tabs v-model="activeName" tab-position="top" style="height: 200px;">
        <el-tab-pane label="一周" name="7"></el-tab-pane>
        <el-tab-pane label="半月" name="15"></el-tab-pane>
        <el-tab-pane label="一月" name="30"></el-tab-pane>
      </el-tabs>
      <div class="skeletonWaistData-charts-container">
        <div class="chart1 chart">
          <LittleTitle title="活跃设备数"/>
          <v-chart
            ref="online"
            :options="activeRateOption"
            :theme="themebrokeline"
            style="height: 320px;width:600px"
            @click="activeRateClick"/>
        </div>
        <div class="chart2">
          <LittleTitle title="开机次数"/>
          <v-chart
            :options="bootNumOption"
            :theme="themebrokeline"
            style="height: 320px;width:600px"
            @click="bootNumClick"/>
        </div>
        <div class="chart3">
          <LittleTitle title="步数"/>
          <v-chart
            :options="stepsNumOption"
            :theme="themebrokeline"
            style="height: 320px;width:600px"
            @click="stepNumClick"/>
        </div>
        <div class="chart4">
          <LittleTitle title="搬动次数"/>
          <v-chart
            :options="bendNumOption"
            :theme="themebrokeline"
            style="height: 320px;width:600px"
            @click="bendClick"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ECharts from 'vue-echarts'
import 'echarts'
import brokeline from '@/utils/echartsTheme/brokeline.json'
export default {
  name: 'SkeletonWaistData',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      filter: {
        days: '7',
        customer: '',
        department: ''
      },
      deviceNum: '',
      tableData: [],
      formLabelWidth: '100px',
      themebrokeline: '',
      activeName: '7',
      activeRateData: [],
      activeRateDataX: [],
      stepsNumData: [],
      stepsNumDataX: [],
      bootNumData: [],
      bootNumdataX: [],
      bendNumData: [],
      bendNumDataX: [],
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
      }
    }
  },
  watch: {
    activeName(newValue, oldValue) {
      this.showDataByDays(newValue)
    }
  },
  mounted() {
    this.themebrokeline = brokeline
    this.search()
  },
  methods: {
    ...mapActions('skeletonWaist', [
      'fetchSkeletonWaistDeviceList',
      'fetchSkeletonWaistActiveRate',
      'fetchSkeletonWaistBootTotal',
      'fetchSkeletonWaistStepsTotal',
      'fetchSkeletonWaistBendTotal'
    ]),
    async search() {
      const param = this.filter
      const deviceResult = await this.fetchSkeletonWaistDeviceList({
        pageNumber: 1,
        pageSize: 10
      })
      if (deviceResult.code !== 200) {
        this.$message.warning(deviceResult.message)
      }
      this.deviceNum = deviceResult.data.pagination.totalCount
      const activeRateResult = await this.fetchSkeletonWaistActiveRate(param)
      if (activeRateResult.code !== 200) {
        this.$message.warning(activeRateResult.message)
      }
      this.activeRateData = activeRateResult.data.map((v) => { return v.activeRate })
      this.activeRateDataX = activeRateResult.data.map((v) => { return v.showDate })
      const bootTotalResult = await this.fetchSkeletonWaistBootTotal(param)
      if (bootTotalResult.code !== 200) {
        this.$message.warning(bootTotalResult.message)
      }
      this.bootNumData = bootTotalResult.data.map((v) => { return v.total })
      this.bootNumDataX = bootTotalResult.data.map((v) => { return v.showDate })
      const stepsTotalResult = await this.fetchSkeletonWaistStepsTotal(param)
      if (stepsTotalResult.code !== 200) {
        this.$message.warning(stepsTotalResult.message)
      }
      this.stepsNumData = stepsTotalResult.data.map((v) => { return v.total })
      this.stepsNumDataX = stepsTotalResult.data.map((v) => { return v.showDate })
      const bendTotalResult = await this.fetchSkeletonWaistBendTotal(param)
      if (bendTotalResult.code !== 200) {
        this.$message.warning(bendTotalResult.message)
      }
      this.bendNumData = bendTotalResult.data.map((v) => { return v.total })
      this.bendNumDataX = bendTotalResult.data.map((v) => { return v.showDate })
      this.activeRateOption.series[0].data = this.activeRateData
      this.stepsNumOption.series[0].data = this.stepsNumData
      this.stepsNumOption.xAxis.data = this.stepsNumDataX
      this.bootNumOption.series[0].data = this.bootNumData
      this.bootNumOption.xAxis.data = this.bootNumDataX
      this.bendNumOption.series[0].data = this.bendNumData
      this.bendNumOption.xAxis.data = this.bendNumDataX
      this.activeRateOption.series[0].data = this.activeRateData
      this.activeRateOption.xAxis.data = this.activeRateDataX
    },
    async getData(param) {
      return await this.fetchSkeletonWaistBootTotal(param)
    },
    activeRateClick(event) {
      this.$router.push({
        name: 'skeletonWaistBootNum',
        query: {
          date: event.name
        }
      })
    },
    bootNumClick(event) {
      this.$router.push({
        name: 'skeletonWaistBootNum',
        query: {
          date: event.name
        }
      })
    },
    stepNumClick(event) {
      this.$router.push({
        name: 'skeletonWaistStepNum',
        query: {
          date: event.name
        }
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
    showDataByDays(val) {
      this.filter.days = val
      this.search()
    }
  }
}
</script>
<style lang='scss' scoped>
.skeletonWaistData{
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
.skeletonWaistData .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
.skeletonWaistData .el-tabs__nav{
  float: none;
  text-align: center;
}
</style>
