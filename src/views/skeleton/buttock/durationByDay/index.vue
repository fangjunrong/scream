<template>
  <div class="skeletonButtockDurationByDay">
    <div class="skeletonButtockDurationByDay-title">
      <DetailTitle title="支撑时长"/>
    </div>
    <div class="skeletonButtockDurationByDay-filter">
      设备型号：{{ filter.model }} 设备序列号：{{ filter.sn }}
    </div>
    <div class="skeletonButtockDurationByDay-charts">
      <el-tabs v-model="activeName" tab-position="top" style="height: 200px;">
        <el-tab-pane label="一周" name="7"></el-tab-pane>
        <el-tab-pane label="半月" name="15"></el-tab-pane>
        <el-tab-pane label="一月" name="30"></el-tab-pane>
      </el-tabs>
      <div class="skeletonButtockDurationByDay-charts-container">
        <div class="chart3">
          <LittleTitle title="支撑时长"/>
          <v-chart
            :options="durationNumOption"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"
            @click="durationClick"
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
  name: 'ClimbDurationByDay',
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
      durationNumData: [],
      durationNumDataX: [],
      themebrokeline: '',
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
    this.filter.deviceId = this.$route.query.sn
    this.filter.model = this.$route.query.model
    this.filter.searchDate = this.$route.query.date
    this.filter.customer = this.$route.query.customer
    this.filter.department = this.$route.query.department
    this.search()
  },
  methods: {
    ...mapActions('skeletonButtock', [
      'fetchSkeletonButtockDurationTotal'
    ]),
    async search() {
      const param = _.pick(this.filter, ['days', 'deviceId', 'customer', 'department'])
      const result = await this.fetchSkeletonButtockDurationTotal(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.durationNumData = result.data.map((v) => { return v.total })
      this.durationNumDataX = result.data.map((v) => { return v.showDate })
      this.durationNumOption.series[0].data = this.durationNumData
      this.durationNumOption.xAxis.data = this.durationNumDataX
    },
    durationClick(event) {
      this.$router.push({
        name: 'skeletonButtockDurationNumDetail',
        query: {
          date: event.name,
          sn: this.filter.sn,
          model: this.filter.model
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
.skeletonButtockDurationByDay{
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
.skeletonButtockDurationByDay .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
.skeletonButtockDurationByDay .el-tabs__nav{
  float: none;
  text-align: center;
}
</style>
