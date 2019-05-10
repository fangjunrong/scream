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
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'ClimbData',
  data() {
    return {
      filter: {
        name: '',
        sn: '',
        customer: '',
        department: ''
      },
      tableData: [],
      formLabelWidth: '100px'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('climb', [
      'fetchClimbDataList',
      'changeClimbData',
      'deleteClimbData'
    ]),
    async init() {
      const result = await this.fetchClimbDataList()
      if (result.code !== 200) {
        this.$message.warning(result.message)
      }
      this.tableData = result.data.result
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
    justify-content: space-between;
    padding: 16px;
    background-color: #001432;
    border-radius: 8px;
    .sinput{
      width: 150px;
    }
    .el-form-item{
      margin-bottom: 0;
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
