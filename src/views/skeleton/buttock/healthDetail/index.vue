<template>
  <div class="skeletonButtockHealthDetail">
    <div class="skeletonButtockHealthDetail-title">
      <DetailTitle :sub-title="'人员姓名：' + filter.personName" title="健康管理"/>
    </div>
    <div class="skeletonButtockHealthDetail-filter">
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
        <input type="button" class="s-button-primary skeletonButtockHealthDetail-filter-search" value="查询" @click="search()"/>
      </el-form>
    </div>
    <div class="skeletonButtockHealthDetail-table">
      <el-tabs tab-position="top" style="height: 200px;">
        <el-tab-pane label="图表">
          <div class="chart1">
            <LittleTitle title="每件搬运的搬动次数"/>
            <v-chart
              :options="bendNumOption"
              :theme="themebrokeline"
              style="height: 600px;width: 800px"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="列表">
          <table class="selftable selftable-head">
            <tr>
              <th width="15%">序列号</th>
              <th width="20%">坐下次数</th>
              <th width="20%">支撑时长</th>
              <th width="20%">疲劳度</th>
              <th width="20%">最新更新时间</th>
            </tr>
          </table>
          <table v-for="(item, index) in tableData" :key="item.id" class="selftable selftable-body">
            <tr>
              <td width="15%">{{ index + 1 }}</td>
              <td width="20%">{{ item.sitNum }}</td>
              <td width="20%">{{ item.durNum }}</td>
              <td width="20%">{{ item.fatigue }}</td>
              <td width="20%">{{ item.createTime }}</td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="skeletonButtockHealthDetail-pagination">
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
  name: 'SkeletonButtockHealthDetail',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      filter: {
        deviceId: '',
        personName: '',
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
      bendNumData: [],
      bendNumDataX: [],
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
  mounted() {
    const date = this.$route.query.date
    this.filter.searchDate = date
    const sn = this.$route.query.sn
    this.filter.deviceId = sn
    const personName = this.$route.query.personName
    this.filter.personName = personName
    this.themebrokeline = brokeline
    this.search()
  },
  methods: {
    ...mapActions('skeletonButtock', [
      'fetchSkeletonButtockFatigueDetail'
    ]),
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchSkeletonButtockFatigueDetail(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.bendNumData = this.tableData.map((v) => { return v.sitNum })
      this.bendNumDataX = this.tableData.map((v) => { return v.createTime })
      this.bendNumOption.series[0].data = this.bendNumData
      this.bendNumOption.xAxis.data = this.bendNumDataX
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchSkeletonButtockFatigueDetail(param)
    },
    async handleSizeChange(val) {
      const result = await this.getData({
        pageNumber: 1,
        pageSize: val
      })
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async handleCurrentChange(val) {
      const result = await this.getData({
        pageNumber: val,
        pageSize: 10
      })
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    }
  }
}
</script>
<style lang='scss' scoped>
.skeletonButtockHealthDetail{
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
  &-pagination{
    margin-top: 42px;
    .el-pagination{
      float: right;
    }
  }
}
.chart1{
    width: 800px;
    margin: 0 auto;
}

</style>
<style>
.skeletonButtockHealthDetail .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
