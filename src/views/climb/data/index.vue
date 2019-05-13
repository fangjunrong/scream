<template>
  <div class="climbData">
    <div class="climbData-title">
      <DetailTitle title="统计数据"/>
    </div>
    <div class="climbData-filter">
      <el-form :inline="true">
        <el-form-item label="客户">
          <el-input v-model="filter.customer" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="filter.department" class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary climbData-filter-search" value="查询" @click="search()"/>
      </el-form>
      <ul class="climbData-filter-textShow">
        <li>所有设备（共17台）的使用信息：</li>
        <li>在线活跃率： 5.88235294117647 %  台阶数：204 开机次数： 1重量等级：2</li>
      </ul>
    </div>
    <div class="climbData-charts">
      <el-tabs tab-position="top" style="height: 200px;">
        <el-tab-pane label="一周" @click="showWeekly()"></el-tab-pane>
        <el-tab-pane label="半月" @click="showHalfMonthly()"></el-tab-pane>
        <el-tab-pane label="一月" @click="showMonthly()"></el-tab-pane>
      </el-tabs>
      <div class="climbData-charts-container">
        <div class="chart1">
          <LittleTitle title="在线活跃率"/>
          <v-chart
            ref="online"
            :options="brokeline"
            :theme="themebrokeline"
            style="height: 300px;width: 400px"
            @click="brokeClick"/>
        </div>
        <div class="chart2">
          <LittleTitle title="台阶数"/>
          <v-chart :options="brokeline" :theme="themebrokeline" style="height: 300px;width: 400px"/>
        </div>
        <div class="chart3">
          <LittleTitle title="开机次数"/>
          <v-chart :options="brokeline" :theme="themebrokeline" style="height: 300px;width: 400px"/>
        </div>
        <div class="chart4">
          <LittleTitle title="重量等级"/>
          <v-chart :options="brokeline" :theme="themebrokeline" style="height: 300px;width: 400px"/>
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
  name: 'ClimbData',
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
      'fetchClimbDataList',
      'changeClimbData',
      'deleteClimbData'
    ]),
    async init() {
      // const result = await this.fetchClimbDataList()
      // if (result.code !== 200) {
      //   this.$message.warning(result.message)
      // }
      // this.tableData = result.data.result
    },
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchClimbDataList(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
    },
    async getData(param) {
      return await this.fetchClimbDataList(param)
    },
    brokeClick(event) {
      console.log(`value${event.value}--index${event.dataIndex}`)
    },
    onClick(event, instance, ECharts) {
      console.log(arguments)
    },
    onReady(instance, ECharts) {
      console.log(instance, ECharts)
    },
    showWeekly() {

    },
    showHalfMonthly() {

    },
    showHMonthly() {

    }
  }
}
</script>
<style lang='scss' scoped>
.climbData{
  &-filter{
    display: flex;
    justify-content: space-around;
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
      justify-content: space-between;
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
.climbData .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
.climbData .el-tabs__nav{
  float: none;
  text-align: center;
}
</style>
