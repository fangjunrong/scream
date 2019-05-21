<template>
  <div class="climbWeightByDay">
    <div class="climbWeightByDay-title">
      <DetailTitle title="重量等级"/>
    </div>
    <div class="climbWeightByDay-filter">
      设备型号：{{ filter.model }} 设备序列号：{{ filter.sn }}
    </div>
    <div class="climbWeightByDay-charts">
      <el-tabs v-model="activeName" tab-position="top" style="height: 200px;">
        <el-tab-pane label="一周" name="7"></el-tab-pane>
        <el-tab-pane label="半月" name="15"></el-tab-pane>
        <el-tab-pane label="一月" name="30"></el-tab-pane>
      </el-tabs>
      <div class="climbWeightByDay-charts-container">
        <div class="chart3">
          <LittleTitle title="重量等级"/>
          <v-chart
            :options="weightNumOption"
            :theme="themebrokeline"
            style="height: 450px;width: 600px"
            @click="weightClick"
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
  name: 'ClimbWeightByDay',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      filter: {
        createTime: ''
      },
      tableData: [{
        id: '0',
        steps: '197',
        date: '2019-04-26 23:56:20',
        time: '晚上'
      }, {
        id: '1',
        steps: '208',
        date: '2019-04-26 21:30:39',
        time: '晚上'
      }],
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
      weightNumData: [],
      weightNumDataX: [],
      themebrokeline: '',
      weightNumOption: {
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
    const sn = this.$route.query.sn
    this.filter.sn = sn
    const model = this.$route.query.model
    this.filter.model = model
    this.init()
  },
  methods: {
    ...mapActions('climb', [
      'fetchClimbWeightTotal'
    ]),
    async init() {
      this.themebrokeline = brokeline
      const date = this.$route.query.date
      this.filter.searchDate = date
      const result = await this.fetchClimbWeightTotal({
        pageNumber: 1,
        pageSize: 10
      })
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.weightNumData = result.data.map((v) => { return v.weightNum })
      this.weightNumDataX = result.data.map((v) => { return v.showDate })
      this.weightNumOption.series[0].data = this.weightNumData
      this.weightNumOption.xAxis.data = this.weightNumDataX
    },
    weightClick(event) {
      this.$router.push({
        name: 'climbWeightDetail',
        query: {
          date: event.name,
          sn: this.filter.sn,
          model: this.filter.model
        }
      })
    },
    showDataByDays(val) {
      this.weightNumOption.series[0].data = this.spliceData(this.weightNumData, 0, val)
      this.weightNumOption.xAxis.data = this.spliceData(this.weightNumDataX, 0, val)
    },
    spliceData(data, index, length) {
      const _data = _.cloneDeep(data)
      return _data.splice(index, length)
    }
  }
}
</script>
<style lang='scss' scoped>
.climbWeightByDay{
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
.climbWeightByDay .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
.climbWeightByDay .el-tabs__nav{
  float: none;
  text-align: center;
}
</style>
