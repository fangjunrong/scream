<template>
  <div class="waistHealth">
    <div class="waistHealth-title">
      <DetailTitle title="健康管理"/>
    </div>
    <div class="waistHealth-filter">
      <el-form :inline="true">
        <el-form-item label="弯腰次数">
          <el-input v-model="filter.num" class="sinput"></el-input>
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
        <input type="button" class="s-button-primary waistHealth-filter-search" value="查询" @click="search()"/>
      </el-form>
    </div>
    <div class="waistHealth-table">
      <table class="selftable selftable-head">
        <tr>
          <th width="10%">人员姓名</th>
          <th width="10%">设备名称</th>
          <!-- <th width="10%">搬运次数</th> -->
          <th width="10%">弯腰次数	</th>
          <th width="10%">疲劳度</th>
          <th width="10%">最新更新时间</th>
        </tr>
      </table>
      <table v-for="item in tableData" :key="item.id" class="selftable selftable-body">
        <tr>
          <td width="10%"><div class="link" @click="toDetail(item)">{{ item.deviceModel ? item.deviceModel.name : '' }}</div></td>
          <td width="10%">{{ item.deviceModel? item.deviceModel.model : '' }}</td>
          <!-- <td width="10%">{{ item.bendNum }}</td> -->
          <td width="10%">{{ item.bendNum }}</td>
          <td width="10%">{{ item.bendNum }}</td>
          <td width="10%">{{ item.createTime }}</td>
        </tr>
      </table>
    </div>
    <div class="waistHealth-pagination">
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
  name: 'ButtockHealth',
  data() {
    return {
      filter: {
        bendNum: '',
        searchDate: ''
      },
      tableData: [],
      info: {
        visible: false,
        typeText: '新增',
        data: {}
      },
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      formLabelWidth: '100px',
      pagination: {
        currentPage: 1,
        pageSize: 100,
        total: 100
      }
    }
  },
  mounted() {
    const date = this.$route.query.date
    this.filter.searchDate = date
    this.search()
  },
  methods: {
    ...mapActions('skeletonButtock', [
      'fetchSkeletonButtockBendNum'
    ]),
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchSkeletonButtockBendNum(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchSkeletonButtockBendNum(param)
    },
    toDetail(item) {
      this.$router.push({
        name: 'skeletonButtockHealthDetail',
        query: {
          date: this.filter.searchDate,
          sn: item.deviceModel.sn
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
.waistHealth{
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

</style>
<style>
.waistHealth .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
