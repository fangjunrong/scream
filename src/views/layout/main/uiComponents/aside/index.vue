<template>
  <div class="aside">
    <el-menu
      :unique-opened="true"
      :router="true"
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/index">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouye"></use>
          </svg>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-arm"></use>
          </svg>
          <span slot="title">手臂助力外骨骼</span>
        </template>
        <el-menu-item index="/main/skeleton/arm/device">设备信息</el-menu-item>
        <el-menu-item index="/main/skeleton/arm/person">人员信息</el-menu-item>
        <el-menu-item index="/main/skeleton/arm/position">定位信息</el-menu-item>
        <el-menu-item index="/main/skeleton/arm/data">统计数据</el-menu-item>
        <el-menu-item index="/main/skeleton/arm/businessET">商业ET</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-waist"></use>
          </svg>
          <span slot="title">腰部助力外骨骼</span>
        </template>
        <el-menu-item index="/main/skeleton/waist/device">设备信息</el-menu-item>
        <el-menu-item index="/main/skeleton/waist/person">人员信息</el-menu-item>
        <el-menu-item index="/main/skeleton/waist/health">健康管理</el-menu-item>
        <el-menu-item index="/main/skeleton/waist/position">定位信息</el-menu-item>
        <el-menu-item index="/main/skeleton/waist/data">统计数据</el-menu-item>
        <el-menu-item index="/main/skeleton/waist/businessET">商业ET</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-buttock"></use>
          </svg>
          <span slot="title">臀部助力外骨骼</span>
        </template>
        <el-menu-item index="/main/skeleton/buttock/device">设备信息</el-menu-item>
        <el-menu-item index="/main/skeleton/buttock/person">人员信息</el-menu-item>
        <el-menu-item index="/main/skeleton/buttock/position">定位信息</el-menu-item>
        <el-menu-item index="/main/skeleton/buttock/data">统计数据</el-menu-item>
        <el-menu-item index="/main/skeleton/buttock/businessET">商业ET</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-climb"></use>
          </svg>
          <span slot="title">爬楼机</span>
        </template>
        <el-menu-item index="/main/climb/device">设备信息</el-menu-item>
        <el-menu-item index="/main/climb/position">定位信息</el-menu-item>
        <el-menu-item index="/main/climb/data">统计数据</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-climb"></use>
          </svg>
          <span slot="title">系统管理</span>
        </template>
        <el-menu-item index="/main/manage/user">用户管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Aside',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
