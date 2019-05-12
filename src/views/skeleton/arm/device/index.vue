<template>
  <div class="armDevice">
    <div class="armDevice-title">
      <DetailTitle />
    </div>
    <div class="armDevice-filter">
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary" value="查询" />
        <el-button type="info" class="armDevice-filter-add">添加</el-button>
      </el-form>
    </div>
    <div class="armDevice-table">
      <el-table :data="tableData">
        <el-table-column label="name">

        </el-table-column>
        <el-table-column label="number">

        </el-table-column>
        <el-table-column label="status">

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArmDevice',
  data() {
    return {
      tableData: [{
        name: '1',
        number: '2',
        status: '正常'
      }, {
        name: '1',
        number: '2',
        status: '正常'
      }]
    }
  }
}
</script>
<style lang='scss' scoped>
.armDevice{
  &-filter{
    padding: 16px;
    &-add{
      float: right;
      margin-right: 30px;
      width: 100px;
    }
  }
}
</style>
<style>
.armDevice .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
