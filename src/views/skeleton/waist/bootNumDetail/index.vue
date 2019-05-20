<template>
  <div class="skeletonWaistDevice">
    <div class="skeletonWaistDevice-title">
      <DetailTitle :sub-title="'设备序列号:' + filter.sn" title="开机次数详情"/>
    </div>
    <div class="skeletonWaistDevice-filter">
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
        <input type="button" class="s-button-primary skeletonWaistDevice-filter-search" value="查询" @click="search()"/>
      </el-form>
    </div>
    <div class="skeletonWaistDevice-table">
      <table class="selftable selftable-head">
        <tr>
          <th width="30%">ID</th>
          <th width="30%">使用时间</th>
          <th width="30%">所属时段</th>
        </tr>
      </table>
      <table v-for="item in tableData" :key="item.id" class="selftable selftable-body">
        <tr>
          <td width="30%">{{ item.id }}</td>
          <td width="30%">{{ item.createTime }}</td>
          <td width="30%">{{ item.time }}</td>
        </tr>
      </table>
    </div>
    <div class="skeletonWaistDevice-pagination">
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
  name: 'SkeletonWaistDevice',
  data() {
    return {
      filter: {
        searchDate: '',
        sn: ''
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
      }
    }
  },
  mounted() {
    const sn = this.$route.query.sn
    this.filter.sn = sn
    const date = this.$route.query.date
    this.filter.searchDate = date
    this.search()
  },
  methods: {
    ...mapActions('skeletonWaist', [
      'fetchSkeletonWaistBootNumDetail'
    ]),
    async search() {
      const param = _.assign(this.filter, { pageSize: 10, pageNumber: 1 })
      const result = await this.fetchSkeletonWaistBootNumDetail(param)
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
      this.pagination.pageSize = result.data.pagination.pageSize
      this.pagination.total = result.data.pagination.totalCount
    },
    async getData(param) {
      return await this.fetchSkeletonWaistBootNumDetail(param)
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
.skeletonWaistDevice{
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
.skeletonWaistDevice .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
