<template>
  <div class="waistData">
    <div class="waistData-title">
      <DetailTitle title="商业ET"/>
    </div>
    <div class="waistData-filter">
      <!-- <el-form :inline="true">
        <el-form-item label="客户">
          <el-input v-model="filter.customer" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="filter.department" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary waistData-filter-search" value="查询" @click="search()"/>
      </el-form> -->
      <ul class="waistData-filter-textShow">
        <li>工作效率（按月）： 同比增长 20% ， 环比增长 30%</li>
        <li>成本费用（按月）： 同比减少 30% ， 环比减少 40%</li>
      </ul>
    </div>
    <div class="waistData-charts">
      <!-- <el-tabs tab-position="top" style="height: 200px;">
        <el-tab-pane label="一周" @click="showWeekly()"></el-tab-pane>
        <el-tab-pane label="半月" @click="showHalfMonthly()"></el-tab-pane>
        <el-tab-pane label="一月" @click="showMonthly()"></el-tab-pane>
      </el-tabs> -->
      <div class="waistData-charts-container">
        <div class="chart1">
          <LittleTitle title="工作效率"/>
          <v-chart
            ref="online"
            :options="brokeline"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"/>
        </div>
        <div class="chart2">
          <LittleTitle title="成本费用"/>
          <v-chart
            :options="brokeline"
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
  name: 'WaistData',
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
      onlineData: [320, 680, 280, 480, 1290, 500, 1320],
      brokeline: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        xAxis: {
          type: 'category',
          data: ['2019-04-23', '2019-04-24', '2019-04-25', '2019-04-26', '2019-04-27', '2019-04-28', '2019-04-29'],
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
  mounted() {
    this.init()
    this.themebrokeline = brokeline
    this.brokeline.series[0].data = this.onlineData
    // setTimeout(() => {
    //   this.brokeline.series[0].data = [1, 2, 3, 4]
    // }, 2000)
  },
  methods: {
    ...mapActions('climb', [
      'fetchWaistDataList',
      'changeWaistData',
      'deleteWaistData'
    ]),
    async init() {
      // const result = await this.fetchwaistDataList()
      // if (result.code !== 200) {
      //   this.$message.warning(result.message)
      // }
      // this.tableData = result.data.result
    },
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchwaistDataList(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
    },
    async getData(param) {
      return await this.fetchwaistDataList(param)
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
.waistData{
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
.waistData .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
.waistData .el-tabs__nav{
  float: none;
  text-align: center;
}
</style>
