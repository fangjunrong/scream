<template>
  <div class="skeletonArmDurationDetail">
    <div class="skeletonArmDurationDetail-title">
      <DetailTitle :sub-title="'设备序列号:' + filter.deviceId" title="托举时长详情"/>
    </div>
    <div class="skeletonArmDurationDetail-filter">
      <el-form :inline="true">
        <el-form-item label="日期">
          <el-date-picker
            v-model="filter.searchDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            class="sinput"></el-date-picker>
        </el-form-item>
        <input type="button" class="s-button-primary skeletonArmDurationDetail-filter-search" value="查询" @click="search()"/>
      </el-form>
    </div>
    <div class="skeletonArmDurationDetail-table">
      <el-tabs tab-position="top" style="height: 200px;">
        <el-tab-pane label="图表">
          <div class="skeletonArmDurationDetail-charts-container">
            <div class="chart1">
              <LittleTitle title="托举时长"/>
              <v-chart
                ref="online"
                :options="brokeline"
                :theme="themebrokeline"
                style="height: 450px;width: 600px"/>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="列表">
          <table class="selftable selftable-head">
            <tr>
              <th width="80">ID</th>
              <th width="20%">托举时长</th>
              <th width="20%">使用时间</th>
              <th width="20%">所属时段</th>
            </tr>
          </table>
          <table v-for="(item, index) in tableData" :key="item.id" class="selftable selftable-body">
            <tr>
              <td width="80">{{ index + 1 }}</td>
              <td width="20%">{{ item.durNum }}</td>
              <td width="20%">{{ item.createTime }}</td>
              <td width="20%">{{ timestampToPeriod(item.createTime) }}</td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="skeletonArmDurationDetail-pagination">
      <el-pagination
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
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
  name: 'SkeletonArmDurationDetail',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      filter: {
        searchDate: ''
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
      themebrokeline: '',
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
          data: [320, 680, 280, 480, 1290, 500, 1320],
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
    const searchDate = this.$route.query.date
    this.filter.searchDate = searchDate
    const sn = this.$route.query.sn
    this.filter.deviceId = sn
    this.search()
  },
  methods: {
    ...mapActions('skeletonArm', [
      'fetchSkeletonArmDurationNumDetail'
    ]),
    initCharts() {
      this.themebrokeline = brokeline
      this.brokeline.xAxis.data = _.map(this.tableData, 'createTime')
      this.brokeline.series[0].data = _.map(this.tableData, 'durNum')
    },
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchSkeletonArmDurationNumDetail(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
      this.initCharts()
    },
    async getData(param) {
      return await this.fetchSkeletonArmDurationNumDetail(param)
    },
    async handleSizeChange(val) {
      const param = _.assign(this.filter, { pageSize: val, pageNumber: 1 })
      const result = await this.getData(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
      this.initCharts()
    },
    async handleCurrentChange(val) {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: val })
      const result = await this.getData(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
      this.initCharts()
    },
    timestampToPeriod(timestamp) {
      var date = new Date(timestamp)
      var h = date.getHours()
      if (h < 11) {
        return '早上'
      } else if (h < 13) {
        return '中午'
      } else if (h < 18) {
        return '下午'
      } else {
        return '晚上'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.skeletonArmDurationDetail{
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
  &-table{
    background-color: #001432;
    border-radius: 8px;
    margin-top: 16px;
    padding: 30px 40px;
    &-content{
      background-color: #001432;
      .el-table__body{
        border-collapse:separate;
        border-spacing:0px 10px;
      }
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
.skeletonArmDurationDetail .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
