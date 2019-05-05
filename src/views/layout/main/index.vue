<template>
  <div class="main">
    <Header />
    <el-main>
      <div class="leftSide">
        <Aside/>
      </div>
      <div class="rightSide">
        <router-view></router-view>
      </div>
    </el-main>
  </div>
</template>
<script>
import Header from './uiComponents/header/index'
import Aside from './uiComponents/aside/index'
export default {
  name: 'Main',
  components: {
    Header,
    Aside
  }
}
</script>
<style lang='scss' scoped>
.main{
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: #000310;
}
.el-main{
  display: flex;
  padding: 5px;
}
.leftSide{
  width: 220px;
  background-color: #ddd;
  transition: all .3s ease-out;
}
.rightSide{
  flex: 1;
  overflow: hidden;
  transition: all .3s ease-out;
  padding: 16px;
  background-color: #000310;
  overflow-y: scroll;
}
</style>
