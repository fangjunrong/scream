<template>
  <div class="climbStepNum">
    <div class="climbStepNum-title">
      <DetailTitle :sub-title="filter.searchDate" title="台阶数"/>
    </div>
    <div class="climbStepNum-filter">
      <el-form :inline="true">
        <el-form-item label="客户">
          <el-input v-model="filter.customer" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="filter.department" class="sinput"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="filter.searchDate"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            class="sinput"></el-date-picker>
        </el-form-item>
        <input type="button" class="s-button-primary climbStepNum-filter-search" value="查询" @click="search()"/>
      </el-form>
    </div>
    <div class="climbStepNum-table">
      <table class="selftable selftable-head">
        <tr>
          <th width="15%">设备ID</th>
          <th width="20%">设备型号</th>
          <th width="20%">设备序列号</th>
          <th width="30%">台阶数</th>
          <th width="20%">最新更新时间</th>
        </tr>
      </table>
      <table v-for="item in tableData" :key="item.id" class="selftable selftable-body">
        <tr>
          <td width="15%">{{ item.deviceId }}</td>
          <td width="20%">{{ item.climbDeviceModel ? item.climbDeviceModel.model : '' }}</td>
          <td width="20%"><div class="link" @click="toDetail(item)">{{ item.climbDeviceModel ? item.climbDeviceModel.sn : '' }}</div></td>
          <td width="30%">{{ item.stepsNum }}</td>
          <td width="20%">{{ item.createTime }}</td>
        </tr>
      </table>
    </div>
    <div class="climbStepNum-pagination">
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
export default {
  name: 'ClimbStepNum',
  data() {
    return {
      filter: {
        customer: '',
        department: '',
        searchDate: '',
        sn: ''
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
      bootNum: {},
      stepsNum: {}
    }
  },
  mounted() {
    const date = this.$route.query.date
    this.filter.searchDate = date
    const sn = this.$route.query.sn
    this.filter.sn = sn
    this.search()
  },
  methods: {
    ...mapActions('climb', [
      'fetchClimbStepsNum'
    ]),
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchClimbStepsNum(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchClimbStepsNum(param)
    },
    toDetail(item) {
      this.$router.push({
        name: 'climbStepByDay',
        query: {
          date: item.showDate,
          sn: item.climbDeviceModel.sn,
          model: item.climbDeviceModel.model,
          customer: this.filter.customer,
          department: this.filter.department
        }
      })
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
.climbStepNum{
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
</style>
<style>
.climbStepNum .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
