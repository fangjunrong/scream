/durationTotal<template>
  <div class="skeletonArmData">
    <div class="skeletonArmData-title">
      <DetailTitle title="统计数据"/>
    </div>
    <div class="skeletonArmData-filter">
      <el-form :inline="true">
        <el-form-item label="客户">
          <el-input v-model="filter.customer" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="filter.department" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary skeletonArmData-filter-search" value="查询" @click="search()"/>
      </el-form>
      <ul class="skeletonArmData-filter-textShow">
        <li>所有设备（共{{ deviceNum }}台）的使用信息：</li>
        <li>在线活跃率 {{ activeRateData[activeRateData.length - 1] }}% 托举时长：{{ liftNumData[liftNumData.length - 1] }}  开机次数：{{ bootNumData[bootNumData.length - 1] }}</li>
      </ul>
    </div>
    <div class="skeletonArmData-charts">
      <el-tabs v-model="activeName" tab-position="top" style="height: 200px;">
        <el-tab-pane label="一周" name="7"></el-tab-pane>
        <el-tab-pane label="半月" name="15"></el-tab-pane>
        <el-tab-pane label="一月" name="30"></el-tab-pane>
      </el-tabs>
      <div class="skeletonArmData-charts-container">
        <div class="chart1">
          <LittleTitle title="在线活跃率"/>
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
          <LittleTitle title="托举次数"/>
          <v-chart
            :options="liftNumOption"
            :theme="themebrokeline"
            style="height: 320px;width:600px"
            @click="liftNumClick"/>
        </div>
        <div class="chart4">
          <LittleTitle title="托举时长"/>
          <v-chart
            :options="durationNumOption"
            :theme="themebrokeline"
            style="height: 320px;width:600px"
            @click="durationClick"/>
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
  name: 'SkeletonArmData',
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
      liftNumData: [],
      liftNumDataX: [],
      bootNumData: [],
      bootNumdataX: [],
      durationNumData: [],
      durationNumDataX: [],
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
    ...mapActions('skeletonArm', [
      'fetchSkeletonArmDeviceList',
      'fetchSkeletonArmActiveRate',
      'fetchSkeletonArmBootTotal',
      'fetchSkeletonArmLiftTotal',
      'fetchSkeletonArmDurationTotal'
    ]),
    async search() {
      const param = this.filter
      const deviceResult = await this.fetchSkeletonArmDeviceList({
        pageNumber: 1,
        pageSize: 10
      })
      if (deviceResult.code !== 200) {
        this.$message.warning(deviceResult.message)
      }
      this.deviceNum = deviceResult.data.pagination.totalCount
      const activeRateResult = await this.fetchSkeletonArmActiveRate(param)
      if (activeRateResult.code !== 200) {
        this.$message.warning(activeRateResult.message)
      }
      this.activeRateData = activeRateResult.data.map((v) => { return v.activeRate })
      this.activeRateDataX = activeRateResult.data.map((v) => { return v.showDate })
      const bootTotalResult = await this.fetchSkeletonArmBootTotal(param)
      if (bootTotalResult.code !== 200) {
        this.$message.warning(bootTotalResult.message)
      }
      this.bootNumData = bootTotalResult.data.map((v) => { return v.total })
      this.bootNumDataX = bootTotalResult.data.map((v) => { return v.showDate })
      const liftTotalResult = await this.fetchSkeletonArmLiftTotal(param)
      if (liftTotalResult.code !== 200) {
        this.$message.warning(liftTotalResult.message)
      }
      this.liftNumData = liftTotalResult.data.map((v) => { return v.total })
      this.liftNumDataX = liftTotalResult.data.map((v) => { return v.showDate })
      const durationTotalResult = await this.fetchSkeletonArmDurationTotal(param)
      if (durationTotalResult.code !== 200) {
        this.$message.warning(durationTotalResult.message)
      }
      this.durationNumData = durationTotalResult.data.map((v) => { return v.total })
      this.durationNumDataX = durationTotalResult.data.map((v) => { return v.showDate })
      this.activeRateOption.series[0].data = this.activeRateData
      this.liftNumOption.series[0].data = this.liftNumData
      this.liftNumOption.xAxis.data = this.liftNumDataX
      this.bootNumOption.series[0].data = this.bootNumData
      this.bootNumOption.xAxis.data = this.bootNumDataX
      this.durationNumOption.series[0].data = this.durationNumData
      this.durationNumOption.xAxis.data = this.durationNumDataX
      this.activeRateOption.series[0].data = this.activeRateData
      this.activeRateOption.xAxis.data = this.activeRateDataX
    },
    async getData(param) {
      return await this.fetchSkeletonArmBootTotal(param)
    },
    activeRateClick(event) {
      this.$router.push({
        name: 'skeletonArmBootNum',
        query: {
          date: event.name
        }
      })
    },
    bootNumClick(event) {
      this.$router.push({
        name: 'skeletonArmBootNum',
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
    durationClick(event) {
      this.$router.push({
        name: 'skeletonArmDurationNum',
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
.skeletonArmData{
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
.skeletonArmData .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
.skeletonArmData .el-tabs__nav{
  float: none;
  text-align: center;
}
</style>
