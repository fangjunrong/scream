<template>
  <div class="armData">
    <div class="armData-title">
      <DetailTitle title="商业ET"/>
    </div>
    <div class="armData-filter">
      <!-- <el-form :inline="true">
        <el-form-item label="客户">
          <el-input v-model="filter.customer" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="filter.department" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary armData-filter-search" value="查询" @click="search()"/>
      </el-form> -->
      <ul class="armData-filter-textShow">
        <li>工作效率（按月）： 同比增长 20% ， 环比增长 30%</li>
        <li>成本费用（按月）： 同比减少 30% ， 环比减少 40%</li>
      </ul>
    </div>
    <div class="armData-charts">
      <!-- <el-tabs tab-position="top" style="height: 200px;">
        <el-tab-pane label="一周" @click="showWeekly()"></el-tab-pane>
        <el-tab-pane label="半月" @click="showHalfMonthly()"></el-tab-pane>
        <el-tab-pane label="一月" @click="showMonthly()"></el-tab-pane>
      </el-tabs> -->
      <div class="armData-charts-container">
        <div class="chart1">
          <LittleTitle title="工作效率"/>
          <v-chart
            ref="online"
            :options="workEfficiencyOption"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"/>
        </div>
        <div class="chart2">
          <LittleTitle title="成本费用"/>
          <v-chart
            :options="costOption"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"/>
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
  name: 'ArmData',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      filter: {
        name: '',
        deviceId: '',
        customer: '',
        department: ''
      },
      tableData: [],
      formLabelWidth: '100px',
      themebrokeline: '',
      workEfficiencyOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: ['2018-12', '2019-1', '2019-2', '2019-3', '2019-4', '2019-5'],
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
          data: [60, 72, 76, 82, 88, 96],
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
      costOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: ['2018-12', '2019-1', '2019-2', '2019-3', '2019-4', '2019-5'],
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
          data: [100, 96, 90, 85, 79, 70],
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
  mounted() {
    this.init()
    this.themebrokeline = brokeline
  },
  methods: {
    ...mapActions('climb', [
      'fetchArmDataList',
      'changeArmData',
      'deleteArmData'
    ]),
    async init() {
      // const result = await this.fetcharmDataList()
      // if (result.code !== 200) {
      //   this.$message.warning(result.message)
      // }
      // this.tableData = result.data.result
    },
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetcharmDataList(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
    },
    async getData(param) {
      return await this.fetcharmDataList(param)
    },
    brokeClick(event) {
      this.$router.push({
        name: 'climbBootNum',
        query: {
          date: event.name
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.armData{
  &-filter{
    display: flex;
    justify-content: center;
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
.armData .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
.armData .el-tabs__nav{
  float: none;
  text-align: center;
}
</style>
