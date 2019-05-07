<template>
  <div class="climbPosition">
    <div class="climbPosition-title">
      <DetailTitle title="定位信息"/>
    </div>
    <div class="climbPosition-filter">
      <el-form :inline="true">
        <el-form-item label="名称">
          <el-input class="sinput"></el-input>
        </el-form-item>
        <input type="button" class="s-button-primary" value="查询" />
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ClimbPosition'
}
</script>
<style lang='scss' scoped>
.climbPosition{
  &-filter{
    padding: 16px;
    &-add{
      float: right;
      margin-right: 20px;
      width: 100px;
    }
  }
}
</style>
<style>
.climbPosition .el-form-item__label{
  font-weight: bold;
  font-size: 14px;
  color: #00F0FA;
}
</style>
