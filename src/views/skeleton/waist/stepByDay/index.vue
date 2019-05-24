<template>
  <div class="skeletonWaistStepByDay">
    <div class="skeletonWaistStepByDay-title">
      <DetailTitle title="步数"/>
    </div>
    <div class="skeletonWaistStepByDay-filter">
      设备型号：{{ filter.model }} 设备序列号：{{ filter.deviceId }}
    </div>
    <div class="skeletonWaistStepByDay-charts">
      <el-tabs v-model="activeName" tab-position="top" style="height: 200px;">
        <el-tab-pane label="一周" name="7"></el-tab-pane>
        <el-tab-pane label="半月" name="15"></el-tab-pane>
        <el-tab-pane label="一月" name="30"></el-tab-pane>
      </el-tabs>
      <div class="skeletonWaistStepByDay-charts-container">
        <div class="chart3">
          <LittleTitle title="步数"/>
          <v-chart
            :options="stepNumOption"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"
            @click="stepClick"
          />
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
  name: 'ClimbStepByDay',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      filter: {
        searchDate: '',
        deviceId: '',
        customer: '',
        department: '',
        moedel: '',
        days: '7'
      },
      tableData: [],
      info: {
        visible: false,
        typeText: '新增',
        data: {}
      },
      formLabelWidth: '100px',
      pagination: {
        currentPage: 1,
        pageSize: 100,
        total: 100
      },
      activeName: '7',
      stepNumData: [],
      stepNumDataX: [],
      themebrokeline: '',
      stepNumOption: {
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
    this.filter.deviceId = this.$route.query.sn
    this.filter.model = this.$route.query.model
    this.filter.searchDate = this.$route.query.date
    this.filter.customer = this.$route.query.customer
    this.filter.department = this.$route.query.department
    this.search()
  },
  methods: {
    ...mapActions('skeletonWaist', [
      'fetchSkeletonWaistStepsTotal'
    ]),
    async search() {
      const param = _.pick(this.filter, ['days', 'deviceId', 'customer', 'department'])
      const result = await this.fetchSkeletonWaistStepsTotal(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.stepNumData = result.data.map((v) => { return v.total })
      this.stepNumDataX = result.data.map((v) => { return v.showDate })
      this.stepNumOption.series[0].data = this.stepNumData
      this.stepNumOption.xAxis.data = this.stepNumDataX
    },
    stepClick(event) {
      this.$router.push({
        name: 'skeletonWaistStepNumDetail',
        query: {
          date: event.name,
          sn: this.filter.deviceId,
          model: this.filter.model,
          customer: this.filter.customer,
          department: this.filter.department
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
.skeletonWaistStepByDay{
  &-filter{
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
    &-add{
      float: right;
      margin-right: 30px;
      width: 125px;
    }
  }
  &-charts{
    background-color: #001432;
    border-radius: 8px;
    margin-top: 16px;
    padding: 30px 40px;
    &-container{
      display: flex;
      justify-content: center;
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
.skeletonWaistStepByDay .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
.skeletonWaistStepByDay .el-tabs__nav{
  float: none;
  text-align: center;
}
</style>
